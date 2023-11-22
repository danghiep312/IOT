package com.example.demo.model;

import java.sql.Timestamp;

public class SensorData {
	private int id;
	private int humidity;
	private int light;
	private int temperature;
	private int dust;
	private Timestamp time;
	
	public SensorData(int humidity, int light, int temperature, int dust, Timestamp time) {
		this.humidity = humidity;
		this.light = light;
		this.temperature = temperature;
		this.dust = dust;
		this.time = time;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getHumidity() {
		return humidity;
	}

	public void setHumidity(int humidity) {
		this.humidity = humidity;
	}

	public int getLight() {
		return light;
	}

	public void setLight(int light) {
		this.light = light;
	}

	public int getTemperature() {
		return temperature;
	}

	public void setTemperature(int temperature) {
		this.temperature = temperature;
	}
	
	public int getDust() {
		return dust;
	}
	
	public void setDust(int dust) {
		this.dust = dust;
	}
	

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	public SensorData() {
		super();
	}

	public SensorData(int id, int humidity, int light, int temperature, int dust) {
		super();
		this.id = id;
		this.humidity = humidity;
		this.light = light;
		this.temperature = temperature;
		this.dust = dust;
	}
	
	public SensorData(int id, int humidity, int light, int temperature, int dust, Timestamp time) {
		super();
		this.id = id;
		this.humidity = humidity;
		this.light = light;
		this.temperature = temperature;
		this.dust = dust;
		this.time = time;
	}

	@Override
	public String toString() {
		return "SensorData [id=" + id + ", humidity=" + humidity + ", light=" + light + ", temperature=" + temperature
				+ ", dust=" + dust + ", time=" + time + "]";
	}

	
	
}
