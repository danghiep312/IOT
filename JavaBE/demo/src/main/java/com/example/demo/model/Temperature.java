package com.example.demo.model;

import java.sql.*;


public class Temperature {
	private int id;
	private float temp;
	private Timestamp time; 
	
	public Temperature(int id, float temp, Timestamp time) {
		this.id = id;
		this.temp = temp;
		this.time = time;
	}
	
	public Temperature() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getTemp() {
		return temp;
	}

	public void setTemp(float temp) {
		this.temp = temp;
	}

	public Timestamp getTime() {
		return time;
	}	

	public void setTime(Timestamp time) {
		this.time = time;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return id + " " + temp + " " + time;
	}
	
	
}
