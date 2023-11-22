package com.example.demo.model;

import java.sql.*;

public class Action {
	private int id;
	private String device;
	private String status;
	private Timestamp time;
	
	public Action(int id, String device, String status, Timestamp time) {
		this.id = id;
		this.device = device;
		this.status = status;
		this.time = time;
	}
	
	public Action(String device, String status, Timestamp time) {
		this.device = device;
		this.status = status;
		this.time = time;
	}
	
	public Action() {
	
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDevice() {
		return device;
	}
	
	public void setDevice(String device) {
		this.device = device;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Action [id=" + id + ", device=" + device + ", status=" + status + ", time=" + time + "]";
	}

	
	
	
}
