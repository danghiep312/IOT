package com.example.Thuchanh2.springJDBC.student;

import java.sql.Date;

import jakarta.validation.constraints.NotEmpty;

public class Patient {
	private int id ;
	private String name ;
	private Date dob;
	private String department;
	private boolean hired;
	
	public Patient() {
	}
	
	public Patient(int id, String name, Date dob, String department, boolean hired) {
		super();
		this.id = id;
		this.name = name;
		this.dob = dob;
		this.department = department;
		this.hired = hired;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public boolean isHired() {
		return hired;
	}
	public void setHired(boolean hired) {
		this.hired = hired;
	}
	
}
