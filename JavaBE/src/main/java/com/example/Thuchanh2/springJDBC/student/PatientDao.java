package com.example.Thuchanh2.springJDBC.student;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

import jakarta.security.auth.message.callback.PrivateKeyCallback.Request;

public class PatientDao {
	private String url = "jdbc:mysql://localhost:3306/jdbc_demo";
	private String Usename = "root";
	private String pass = "123456";
	private static final String SELECT_ALL_PATIENT = "select * from employee";
	private static final String SELECT_PATIENT_BY_ID = "select * from employee where id=?";
	private static final String INSERT_PATIENT_SQL = "INSERT INTO employee (`name`, `dob`, `department`, `hired`) VALUES (?, ?, ?, ?)";
	private static final String UPDATE_PATIENT_SQL = "UPDATE employee SET name=?, dob=?, department=? , hired = ? where id=? ";
	private static final String DELETE_PATIENT = "DELETE FROM employee WHERE id = ?";
	private static final String SEARCH_PATIENT = "SELECT * FROM jdbc_demo.employee WHERE department LIKE ? OR name LIKE ?";
	 
	public PatientDao() {
		
	}
	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(url, Usename, pass);
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return connection;
	}
	public ResponseEntity<?> selectAllPatients() {
		List<Patient> patients = new ArrayList<>();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_ALL_PATIENT);
			ResultSet result = ps.executeQuery();
			while (result.next()) {
				int id = result.getInt("id");
				String name = result.getString("name");
				Date dob = result.getDate("dob");
				String department = result.getString("department");
				int hired = result.getInt("hired");
				patients.add(new Patient(id, name, dob, department, hired != 0 ? true : false));
			}
			connection.close();
			ps.close();
			return ResponseEntity.ok().body(patients);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	public ResponseEntity<?> selectPatientById(String id) {
		Patient patient = new Patient();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_PATIENT_BY_ID);
			ps.setString(1, id);
			ResultSet result = ps.executeQuery();
			while (result.next()) {
				patient.setId(result.getInt("id"));
				patient.setName(result.getString("name"));
				patient.setDob(result.getDate("dob"));
				patient.setDepartment(result.getString("department"));
				patient.setHired(result.getInt("hired") != 0 ? true : false);
			}
			connection.close();
			ps.close();
			return ResponseEntity.ok().body(patient);
		} catch (Exception e) {
			System.out.print(e);
			return ResponseEntity.internalServerError().build();
		}
	}
	
	public ResponseEntity<?> insertPatient(Patient patient) {
		try(Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(INSERT_PATIENT_SQL);
			ps.setString(1, patient.getName());
			ps.setDate(2, patient.getDob());
			ps.setString(3, patient.getDepartment());
			ps.setInt(4, patient.isHired() ? 1 : 0);
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok("Add Employee:" + patient);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	public ResponseEntity<?> updatePatient(Patient patient, String id) {
		try(Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(UPDATE_PATIENT_SQL);
			ps.setString(1, patient.getName());
			ps.setDate(2, patient.getDob());
			ps.setString(3, patient.getDepartment());
			ps.setInt(4, patient.isHired() ? 1 : 0);
			ps.setInt(5, Integer.valueOf(id));
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok("Updated Employee:" + patient);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> deletePatient(String id) {
		try(Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(DELETE_PATIENT);
			ps.setInt(1, Integer.valueOf(id));
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok("Deleted patient:" );
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> searchPatient(String request){
		List<Patient> results = new ArrayList<>();
		try(Connection connection = getConnection()) {
			
			PreparedStatement ps = connection.prepareStatement(SEARCH_PATIENT);
			ps.setString(1, "%" + request + "%");
			ps.setString(2, "%" + request + "%");
			ResultSet resultSet = ps.executeQuery();

			while (resultSet.next()) {
				int id = resultSet.getInt("id");
			    String name = resultSet.getString("name");
			    Date dob = resultSet.getDate("dob");
			    String department = resultSet.getString("department");
			    int hired = resultSet.getInt("hired");
			    results.add(new Patient(id, name, dob, department, hired != 0 ? true : false));
			}
			ps.execute();
			ps.close();
			connection.close();
			resultSet.close();
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.ok(results);
	}
}
