package com.organikvibes.model;

public class User {

    private int id;
    private String fullname;
    private String mobile;
    private String email;
    private String dob;
    private String gender;
    private String hno;
    private String area;
    private String city;
    private String state;
    private int pincode;
    private String password;


    // Default Constructor
    public User() {

    }


    // Parameterized Constructor
    public User(String fullname, String mobile, String email, 
                String dob, String gender, String hno,
                String area, String city, String state,
                int pincode, String password) {

        this.fullname = fullname;
        this.mobile = mobile;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.hno = hno;
        this.area = area;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.password = password;
    }


    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getHno() {
        return hno;
    }

    public void setHno(String hno) {
        this.hno = hno;
    }


    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public int getPincode() {
        return pincode;
    }

    public void setPincode(int pincode) {
        this.pincode = pincode;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}