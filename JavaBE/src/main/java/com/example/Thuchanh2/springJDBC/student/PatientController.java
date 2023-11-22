package com.example.Thuchanh2.springJDBC.student;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Thuchanh2.springJDBC.student.Patient;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class PatientController {
	private PatientDao patientDao = new PatientDao();
	@GetMapping("/patient")
	public ResponseEntity<?> getPatients () throws IOException{
		return patientDao.selectAllPatients();
	}
	@GetMapping("/patient/{id}")
	public ResponseEntity<?> getPatient (@PathVariable String id) {
		return patientDao.selectPatientById(id);
	}
	@PostMapping("/add")
	public ResponseEntity<?> addPatient(@RequestBody Patient patient) throws IOException{
		return patientDao.insertPatient(patient);
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updatePatient(@RequestBody Patient patient, @PathVariable String id) throws SQLException{
		return patientDao.updatePatient(patient, id);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deletePatient(@PathVariable String id) throws IOException {
		return patientDao.deletePatient(id);
	}
	@GetMapping("/search/{s}")
	public ResponseEntity<?> searchPatient(@PathVariable String s)throws SQLException{
		return patientDao.searchPatient(s);
	}
}
