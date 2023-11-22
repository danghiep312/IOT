package com.example.demo.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.ActionDao;
import com.example.demo.dao.SensorDao;
import com.example.demo.model.Action;
import com.example.demo.model.SensorData;
import com.example.demo.model.Temperature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;



@RestController
@CrossOrigin
public class SensorController {
	private SensorDao sensorDao = new SensorDao();
	private int lastTime = -1;
	
	@PostMapping("/addsensordata")
	public void addAction(@RequestBody String payload) {
		System.out.println(payload + " add sensor");
		payloadHandle(payload);
	}
	
	private void payloadHandle(String payload) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			
			JsonNode jsonNode = objectMapper.readTree(payload);
			
			JsonNode light = jsonNode.get("lux");
			JsonNode humidity = jsonNode.get("humid");
			JsonNode temp = jsonNode.get("temp");
			JsonNode dust = jsonNode.get("dust");
			JsonNode sec = jsonNode.get("seconds");
			if (sec != null && sec.asInt() == lastTime) return;
			
			lastTime = sec.asInt();
			
			if (light == null || humidity == null || temp == null || dust == null) return;
		
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			
			sensorDao.addSensorData(new SensorData(humidity.asInt(), light.asInt(), (int)temp.asDouble(), dust.asInt(), timestamp));
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
		
	
	public ResponseEntity<?> get50LastSensorData() {
		return sensorDao.get50LastDataSensor();
	}
	
	@GetMapping("/sensordata")
	public ResponseEntity<?> getAllSensorData() {
		return sensorDao.getAllDataSensor();
	}
}
