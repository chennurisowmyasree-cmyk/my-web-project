package com.organikvibes.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.organikvibes.db.DBConnection;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {

            Connection con = DBConnection.getConnection();

            String sql =
                    "SELECT * FROM users WHERE email=? AND password=?";

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, email);
            ps.setString(2, password);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                // ==============================
                // LOGIN SUCCESS
                // ==============================

                HttpSession session = request.getSession();

                // Login status
                session.setAttribute("loggedIn", true);

                // Customer details
                session.setAttribute(
                        "fullname",
                        rs.getString("fullname")
                );

                session.setAttribute(
                        "mobile",
                        rs.getString("mobile")
                );

                session.setAttribute(
                        "email",
                        rs.getString("email")
                );

                session.setAttribute(
                        "dob",
                        rs.getString("dob")
                );

                session.setAttribute(
                        "gender",
                        rs.getString("gender")
                );

                session.setAttribute(
                        "hno",
                        rs.getString("hno")
                );

                session.setAttribute(
                        "area",
                        rs.getString("area")
                );

                session.setAttribute(
                        "city",
                        rs.getString("city")
                );

                session.setAttribute(
                        "state",
                        rs.getString("state")
                );

                session.setAttribute(
                        "pincode",
                        rs.getInt("pincode")
                );

                // ==============================
                // GO TO HOME
                // ==============================

                response.sendRedirect("index.html");

            } else {

                response.setContentType("text/html");

                response.getWriter().println(
                        "<h2>Invalid Email or Password</h2>"
                );

                response.getWriter().println(
                        "<a href='account.html'>Go Back to Login</a>"
                );
            }

            rs.close();
            ps.close();
            con.close();

        } catch (Exception e) {

            e.printStackTrace();

            response.setContentType("text/html");

            response.getWriter().println(
                    "<h2>Login Error: "
                    + e.getMessage()
                    + "</h2>"
            );
        }
    }
}