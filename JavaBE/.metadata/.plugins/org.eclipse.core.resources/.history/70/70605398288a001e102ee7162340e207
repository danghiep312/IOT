package com.example.demo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.List;
import java.util.ArrayList;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import com.example.demo.model.Action;

public class ActionDao {
	
	private static final String SELECT_ALL_ACTION = "select * from actionhistory";
	private static final String SELECT_LAST_50_ACTION = "SELECT * FROM actionhistory order by id desc limit 50";
	private static final String ADD_ACTION = "INSERT INTO actionhistory (device, status, excuteTime) VALUES (?, ?, ?)";
	private static final String COUNT_ACTION = "select count(*) as cnt from iotdb.actionhistory where device = ? and status = ?";
	
	public ActionDao() {
		
	}
	
	public String getCountOfAction(String device) {
		String res = "";
		try (Connection conn = MySql.GetConnection()) {
			PreparedStatement ps = conn.prepareStatement(COUNT_ACTION);
			
			ps.setString(1, device);
			ps.setString(2, "on");
			System.out.println(ps.toString());
			ResultSet rs = ps.executeQuery();
			rs.next();
			int onCount = rs.getInt("cnt");
			
			ps.setString(2, "off");
			System.out.println(ps.toString());
			rs = ps.executeQuery();
			rs.next();
			int offCount = rs.getInt("cnt");
			
			JSONObject json = new JSONObject();
			json.put("device", device);
			json.put("oncnt", onCount);
			json.put("offcnt", offCount);
			System.out.println(json.toString());
			res = json.toString();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	
	public List<Action> getListAction() {
		List<Action> list = new ArrayList<Action>();
		
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(SELECT_LAST_50_ACTION)) {
			
			ResultSet result = ps.executeQuery();
			
			while (result.next()) {
				int id = result.getInt("id");
				String device = result.getString("device");
				String status = result.getString("status");
				Timestamp time = result.getTimestamp("excuteTime");
				list.add(new Action(id, device, status, time));
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();	
		}
		return list;
	}
	
	public ResponseEntity<?> addActionToDb(Action action) {
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(ADD_ACTION)) {
			ps.setString(1, action.getDevice());
			ps.setString(2, action.getStatus());
			ps.setTimestamp(3, action.getTime());
			
			ps.execute();
			
			return ResponseEntity.ok(("Add Action:" + action.toString()));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	public ResponseEntity<?> getAllAction() {
		List<Action> list = new ArrayList<Action>();
	
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(SELECT_ALL_ACTION)) {
			
			ResultSet result = ps.executeQuery();
			
			while (result.next()) {
				int id = result.getInt("id");
				String device = result.getString("device");
				String status = result.getString("status");
				Timestamp time = result.getTimestamp("excuteTime");
				//System.out.println(time);
				list.add(new Action(id, device, status, time));
			}
			
			return ResponseEntity.ok().body(list);
			
		} catch (Exception e) {
			e.printStackTrace();	
			return ResponseEntity.internalServerError().build();
		}
	}
	
	public void AddActionToDb(Action act) {
		try (Connection conn = MySql.GetConnection();
				PreparedStatement ps = conn.prepareStatement(ADD_ACTION)) {
			
			ps.setString(1, act.getDevice());
			ps.setString(2, act.getStatus());
			ps.setTimestamp(3, act.getTime());
			
			ps.execute();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
