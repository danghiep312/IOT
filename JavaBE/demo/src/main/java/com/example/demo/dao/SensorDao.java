package com.example.demo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.model.SensorData;

public class SensorDao {
	private static final String ADD_SENSOR_DATA = "INSERT INTO sensordata (temperature, humidity, light, dust, time) VALUES (?, ?, ?, ?, ?);";
	private static final String GET_50_LAST_SENSOR_DATA = "SELECT * FROM sensordata order by id desc limit 50";
	private static final String GET_ALL_SENSOR_DATA = "SELECT * FROM sensordata";
	
	public ResponseEntity<?> addSensorData(SensorData data) {
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(ADD_SENSOR_DATA)) {
			ps.setInt(1, data.getTemperature());
			ps.setInt(2, data.getHumidity());
			ps.setInt(3, data.getLight());
			ps.setInt(4, data.getDust());
			ps.setTimestamp(5, data.getTime());
			
			ps.execute();
			
			return ResponseEntity.ok(("add sensor data:" + data.toString()));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	public ResponseEntity<?> get50LastDataSensor() {
		List<SensorData> list = new ArrayList<SensorData>();
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(GET_50_LAST_SENSOR_DATA)) {
			ResultSet result= ps.executeQuery();
			
			while (result.next()) {
				int id = result.getInt("id");
				int hum = result.getInt("humidity");
				int temp = result.getInt("temperature");
				int light = result.getInt("light");
				int dust = result.getInt("dust");
				Timestamp time = result.getTimestamp("time");
				list.add(new SensorData(id, hum, light, temp, dust, time));
			}
			
			return ResponseEntity.ok().body(list);
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	

	public ResponseEntity<?> getAllDataSensor() {
		List<SensorData> list = new ArrayList<SensorData>();
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(GET_ALL_SENSOR_DATA)) {
			ResultSet result= ps.executeQuery();
			
			while (result.next()) {
				int id = result.getInt("id");
				int hum = result.getInt("humidity");
				int temp = result.getInt("temperature");
				int light = result.getInt("light");
				int dust = result.getInt("dust");
				Timestamp time = result.getTimestamp("time");
				list.add(new SensorData(id, hum, light, temp, dust, time));
			}
			
			return ResponseEntity.ok().body(list);
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
}
