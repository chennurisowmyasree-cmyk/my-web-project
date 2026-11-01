package com.organikvibes.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import com.organikvibes.db.DBConnection;
import com.organikvibes.model.User;


public class UserDAO {


    public boolean registerUser(User user) {

        boolean result = false;


        String sql = "INSERT INTO users "
                + "(fullname, mobile, email, dob, gender, hno, area, city, state, pincode, password) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);


            ps.setString(1, user.getFullname());
            ps.setString(2, user.getMobile());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getDob());
            ps.setString(5, user.getGender());
            ps.setString(6, user.getHno());
            ps.setString(7, user.getArea());
            ps.setString(8, user.getCity());
            ps.setString(9, user.getState());
            ps.setInt(10, user.getPincode());
            ps.setString(11, user.getPassword());


            int rows = ps.executeUpdate();


            if(rows > 0) {
                result = true;
            }


            con.close();


        } catch(Exception e) {

            e.printStackTrace();

        }


        return result;
    }
}