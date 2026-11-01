package com.organikvibes.test;

import com.organikvibes.db.DBConnection;
import java.sql.Connection;

public class TestConnection {

    public static void main(String[] args) {

        Connection con = DBConnection.getConnection();

        if(con != null) {
            System.out.println("Connection Test Passed");
        }
        else {
            System.out.println("Connection Failed");
        }
    }
}