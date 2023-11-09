import React, {createContext, useEffect, useState} from 'react'
import Subscriber from './Subscriber'
import Receiver from './Receiver'
import mqtt from 'precompiled-mqtt'
import Page from "../Components/Page/Page";
import Publisher from "./Publisher";
import Connection from "./Connection";

//const topics = ['messages/dht11', 'messages/statusled', 'messages/statusfan', 'messages/light'];
// const topics = ['messages/device']
const topics = ['messages/sensordata', 'messages/device']

export const MqttContext = createContext(()=>{});

// https://github.com/mqttjs/MQTT.js#qos
const qosOption = [
    {
        label: '0',
        value: 0,
    },
    {
        label: '1',
        value: 1,
    },
    {
        label: '2',
        value: 2,
    },
]

export const QosOption = createContext([])

const Mqtt = () => {
    const [client, setClient] = useState(null)
    const [isSubed, setIsSub] = useState(false)
    const [payload, setPayload] = useState({})
    const [connectStatus, setConnectStatus] = useState('Connect')
    const [subed, setSubed] = useState(false);

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting')
        /**
         * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
         * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
         *
         * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
         * which should be specified when connecting, and the path used on EMQX is /mqtt.
         *
         * for more details about "mqtt.connect" method & options,
         * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
         */
        console.log(host)
        setClient(mqtt.connect(host, mqttOption))
    }

    const mqttConnectFixedHost = () => {
        // console.log("ws://mqtt.eclipseprojects.io:80/mqtt");
        const options = {
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        }
        setClient(mqtt.connect("wss://broker.hivemq.com:8884/mqtt", options))
    }

    useEffect(() => {
        console.log("first");
        mqttConnectFixedHost();

    }, [])

    useEffect(() => {
        //mqttConnectFixedHost();
        if (client) {
            // https://github.com/mqttjs/MQTT.js#event-connect
            client.on('connect', () => {
                setConnectStatus('Connected')
                console.log('connection successful')
                mqttSubTopic(topics);
                setSubed(true)
            })

            // https://github.com/mqttjs/MQTT.js#event-error
            client.on('error', (err) => {
                console.error('Connection error: ', err)
                client.end()
            })

            // https://github.com/mqttjs/MQTT.js#event-reconnect
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting')
            })

            // https://github.com/mqttjs/MQTT.js#event-message
            client.on('message', (topic, message) => {
                const payload = {topic, message: message.toString()}
                setPayload(payload)
                console.log(payload)
                //console.log(`received message: ${message} from topic: ${topic}`)
            })
        }

        //return (mqttUnsubTopic(topics))
    }, [client])

    // disconnect
    // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
    const mqttDisconnect = () => {
        if (client) {
            try {
                client.end(false, () => {
                    setConnectStatus('Connect')
                    console.log('disconnected successfully')
                })
            } catch (error) {
                console.log('disconnect error:', error)
            }
        }
    }

    // publish message
    // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
    const mqttPublish = (context) => {
        if (client) {
            // topic, QoS & payload for publishing message
            const {topic, qos, payload} = context

            client.publish(topic, payload, {qos}, (error) => {
                if (error) {
                    console.log('Publish error: ', error)
                }
            })
        }
    }

    const mqttPublishFixedHost = (topic, payload) => {
        if (client) {
           // console.log(payload);
            client.publish(topic, payload, (error) => {
               if (error) {
                   console.log('Publish error: ', error);
               }
            });
        }
    }

    const mqttSub = (subscription) => {
        if (client) {
            // topic & QoS for MQTT subscribing
            const {topic, qos} = subscription
            // subscribe topic
            // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
            client.subscribe(topic, {qos}, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                console.log(`Subscribe to topics: ${topic}`)
                setIsSub(true)
            })
        }
    }

    const mqttSubTopic = (subscription) => {
        console.log(' try connect')
        if (client && !isSubed) {
            for (let i = 0; i < subscription.length; i++) {
                client.subscribe(subscription[i], (error) => {

                    if (error) {
                        console.log('Subscribe to topics error', error)
                        return
                    }
                    console.log(`Subscribe to topics: ${subscription[i]}`)
                })
            }
        }
    }

    const mqttUnsubTopic = (subscription) => {
        if (client) {
            for (let i = 0; i < subscription.length; i++) {
                client.unsubscribe(subscription[i], (error) => {
                    setSubed(false)
                    if (error) {
                        console.log('UnSubscribe to topics error', error)
                        return
                    }
                    console.log(`UnSubscribe to topics: ${subscription[i]}`)
                })
            }
        }
    }

    // unsubscribe topic
    // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
    const mqttUnSub = (subscription) => {
        if (client) {
            const {topic, qos} = subscription
            client.unsubscribe(topic, {qos}, (error) => {
                if (error) {
                    console.log('Unsubscribe error', error)
                    return
                }
                console.log(`unsubscribed topic: ${topic}`)
                setIsSub(false)
            })
        }
    }

    return (
        <>
            {/*<Connection*/}
            {/*    connect={mqttConnect}*/}
            {/*    disconnect={mqttDisconnect}*/}
            {/*    connectBtn={connectStatus}*/}
            {/*/>*/}
            <QosOption.Provider value={qosOption}>
                <Page publish={mqttPublishFixedHost}  payload={payload}/>
                {/*<Publisher publish={mqttPublish}/>*/}
                <div vertical layout>
                    {/*<Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed}/>*/}
                    <Receiver payload={payload}/>
                </div>
            </QosOption.Provider>

        </>
    )
}

export default Mqtt