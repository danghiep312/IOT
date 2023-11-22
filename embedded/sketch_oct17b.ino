#define Log(X) Serial.println(">> " + String(X))

#define dhtPort 2
#define ledPin 23
#define fanPin 27
#define LIGHT_SENSOR_PIN 32

#define dhtType DHT11
#define wifi_username "P 1909"
#define wifi_password "abc123450"

/************************* MQTT Setup *********************************/
#define MQTT_SERVER "broker.hivemq.com"
#define MQTT_SERVERPORT 1883
#define MQTT_SENSOR_TOPIC "messages/sensordata"
#define MQTT_LED_TOPIC "messages/led"
#define MQTT_FAN_TOPIC "messages/fan"
#define MQTT_DEVICE_TOPIC "messages/device"
#define MQTT_DUST_TOPIC "messages/dust"

#include "DHT.h"
#include <Arduino_DebugUtils.h>
#include <NTPClient.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <ArduinoMqttClient.h>
#include <ArduinoJson.h>

WiFiClient wifi;
MqttClient mqttClient(wifi);
DHT dht(dhtPort, dhtType);

/**
* System.currentTimeMillis() need this
*/
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
unsigned long previousMillis = 0;
const long interval = 2000;
int lastMs = millis();

bool isDustWarningEnable = false;
bool previousLedStatus = false;
bool previousFanStatus = false;

int dust = 0;

void setup() {
  Serial.begin(115200);
  Log("Hello, ESP32!");
  Debug.timestampOn();
  pinMode(ledPin, OUTPUT);
  pinMode(fanPin, OUTPUT);

  digitalWrite(ledPin, HIGH);
  digitalWrite(fanPin, HIGH);

  connectWifi();
  connectMqtt();

  timeClient.begin();
  dht.begin();
  // randomSeed(analogRead(0));
  subscribeTopic();
  mqttClient.onMessage(onMqttMessage);
}

void subscribeTopic() {
  mqttClient.subscribe(MQTT_LED_TOPIC);
  mqttClient.subscribe(MQTT_FAN_TOPIC);
  mqttClient.subscribe(MQTT_DUST_TOPIC);
}

void onMqttMessage(int messageSize) {
  String topic = mqttClient.messageTopic();
  DEBUG_INFO("New message: topic=%s", topic);
  String message = "";
  while (mqttClient.available()) {
    char c = mqttClient.read();
    message += String(c);
  }
  DEBUG_INFO("%s", message);

  if (topic == MQTT_LED_TOPIC) {
    previousLedStatus = (message == "true");
    if (!isDustWarningEnable)
      setStatusDevice("led", message == "true" ? true : false);
  } else if (topic == MQTT_FAN_TOPIC) {
    previousFanStatus = (message == "true");
    if (!isDustWarningEnable)
      setStatusDevice("fan", message == "true" ? true : false);
  } else if (topic == MQTT_DUST_TOPIC) {
    dust = message.toInt();
    // setDust(message == "true");
  }
}

void setStatusDevice(String device, bool status) {
  mqttClient.beginMessage(MQTT_DEVICE_TOPIC);
  if (device == "led") {
    setLed(status);
  } else {
    setFan(status);
  }
  mqttClient.print(jsonifyDeviceStatus(device, status ? "on" : "off", timeClient.getEpochTime()));
  mqttClient.endMessage();
}

// void setLed(int which, bool enable) {
//   mqttClient.beginMessage(MQTT_DEVICE_TOPIC);

//   if (!enable) {
//     //DEBUG_INFO("Set led %d to High", which);
//     digitalWrite(which == 1 ? ledPin : fanPin, HIGH);
//     mqttClient.print(jsonifyLedStatus(which == 1 ? "led" : "fan", "off", timeClient.getEpochTime()));
//   } else {
//     //DEBUG_INFO("Set led %d to Low", which);
//     digitalWrite(which == 1 ? ledPin : fanPin, LOW);
//     mqttClient.print(jsonifyLedStatus(which == 1 ? "led" : "fan", "on", timeClient.getEpochTime()));
//   }
//   mqttClient.endMessage();
// }

void setLed(bool enable) {
  digitalWrite(ledPin, enable ? LOW : HIGH);
  Serial.print("led ");
  Serial.println(enable ? "on" : "off");
}

void setFan(bool enable) {
  digitalWrite(fanPin, enable ? LOW : HIGH);
  Serial.print("fan ");
  Serial.println(enable ? "on" : "off");
}

void setDust(bool status) {
  if (status == true) {
    isDustWarningEnable = true;
    Serial.println("Turn on warning dust");
  } else if (status == false) {
    isDustWarningEnable = false;
    setLed(previousLedStatus);
    setFan(previousFanStatus);
    Serial.println("Turn off warning dust");
  }
}

void connectWifi() {
  WiFi.begin(wifi_username, wifi_password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  DEBUG_INFO("Wifi Connected! as %s", WiFi.localIP());
}

void connectMqtt() {
  if (!mqttClient.connect(MQTT_SERVER, MQTT_SERVERPORT)) {
    DEBUG_ERROR("MQTT connection failed! Error code = %d", mqttClient.connectError());
    return;
  }
  DEBUG_INFO("MQTT Connected!");
}

void loop() {
  mqttClient.poll();
  timeClient.update();
  readDht();
  delay(1000);
  setDust(dust >=60);
  if (isDustWarningEnable == true) {
    if (dust > 65) {
//      digitalWrite(DUS, LOW);  // Turn off the FAN
      setLed(false);
      setFan(false);
    }
  }
}

void readDht() {
  if (millis() - lastMs >= 2000) {
    lastMs = millis();
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    float lux = analogRead(LIGHT_SENSOR_PIN);

    Serial.println("");
    Serial.println("=================");
    Serial.print(F("Humidity: "));
    Serial.print(humidity);
    Serial.println("%");
    Serial.println("");
    Serial.print(F("Temperature: "));
    Serial.print(temperature);
    Serial.println("oC");
    Serial.println("");
    Serial.print(F("Light: "));
    Serial.print(lux);
    Serial.println("Lux");

    // dust = random(101);

    Serial.print(F("Dust: "));
    Serial.print(dust);
    Serial.println(" Bui");

    mqttClient.beginMessage(MQTT_SENSOR_TOPIC);
    mqttClient.print(jsonifyDataSensor(humidity, temperature, lux, dust, timeClient.getEpochTime()));
    mqttClient.endMessage();
  }
}

char* jsonifyDeviceStatus(String device, String status, int time) {
  DynamicJsonDocument doc(1024);
  doc[device] = status;
  doc["seconds"] = time;

  char* json = new char[256];
  serializeJson(doc, json, 256);

  return json;
}

char* jsonifyDataSensor(float humid, float temp, float lux, float dust, int time) {
  DynamicJsonDocument doc(1024);
  doc["humid"] = humid;
  doc["temp"] = temp;
  doc["lux"] = lux;
  doc["dust"] = dust;
  doc["seconds"] = time;

  if (isDustWarningEnable == true) {
    if (dust > 65) {
      //digitalWrite(DUS, HIGH);  // Turn off the FAN
      setLed(true);
      setFan(true);
    } else {
      setLed(previousLedStatus);
      setFan(previousFanStatus);
      //digitalWrite(DUS, LOW);  // Turn off the FAN
    }
  } 
  char* json = new char[256];
  serializeJson(doc, json, 256);

  return json;
}