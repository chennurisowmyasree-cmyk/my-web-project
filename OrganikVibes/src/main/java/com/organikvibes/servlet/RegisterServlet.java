package com.organikvibes.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import com.organikvibes.db.DBConnection;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String fullname =
                request.getParameter("fullname");

        String mobile =
                request.getParameter("mobile");

        String email =
                request.getParameter("email");

        String dob =
                request.getParameter("dob");

        String gender =
                request.getParameter("gender");

        String hno =
                request.getParameter("hno");

        String area =
                request.getParameter("area");

        String city =
                request.getParameter("city");

        String state =
                request.getParameter("state");

        String pincodeText =
                request.getParameter("pincode");

        String password =
                request.getParameter("password");


        // ==========================================
        // PIN CODE
        // ==========================================

        int pincode = 0;

        if (pincodeText != null &&
            !pincodeText.trim().isEmpty()) {

            try {

                pincode = Integer.parseInt(
                        pincodeText.trim()
                );

            } catch (NumberFormatException e) {

                response.setContentType("text/html");

                response.getWriter().println(
                        "<h2>Invalid PIN Code</h2>"
                );

                response.getWriter().println(
                        "<a href='account.html'>Go Back</a>"
                );

                return;
            }
        }


        try {

            Connection con =
                    DBConnection.getConnection();


            // ==========================================
            // INSERT USER
            // ==========================================

            String sql =
                    "INSERT INTO users " +
                    "(fullname, mobile, email, dob, gender, " +
                    "hno, area, city, state, pincode, password) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


            PreparedStatement ps =
                    con.prepareStatement(sql);


            ps.setString(1, fullname);

            ps.setString(2, mobile);

            ps.setString(3, email);

            ps.setString(4, dob);

            ps.setString(5, gender);

            ps.setString(6, hno);

            ps.setString(7, area);

            ps.setString(8, city);

            ps.setString(9, state);

            ps.setInt(10, pincode);

            ps.setString(11, password);


            int result =
                    ps.executeUpdate();


            // ==========================================
            // REGISTRATION SUCCESS
            // ==========================================

            if (result > 0) {

                HttpSession session =
                        request.getSession();

                session.setAttribute(
                        "loggedIn",
                        true
                );

                session.setAttribute(
                        "fullname",
                        fullname
                );

                session.setAttribute(
                        "mobile",
                        mobile
                );

                session.setAttribute(
                        "email",
                        email
                );

                session.setAttribute(
                        "dob",
                        dob
                );

                session.setAttribute(
                        "gender",
                        gender
                );

                session.setAttribute(
                        "hno",
                        hno
                );

                session.setAttribute(
                        "area",
                        area
                );

                session.setAttribute(
                        "city",
                        city
                );

                session.setAttribute(
                        "state",
                        state
                );

                session.setAttribute(
                        "pincode",
                        pincode
                );


                // ==========================================
                // GO TO HOME
                // ==========================================

                response.sendRedirect(
                        "index.html"
                );

            } else {

                response.setContentType(
                        "text/html"
                );

                response.getWriter().println(
                        "<h2>Registration failed. Please try again.</h2>"
                );

                response.getWriter().println(
                        "<a href='account.html'>Go Back</a>"
                );
            }


            ps.close();
            con.close();

        } catch (Exception e) {

            e.printStackTrace();

            response.setContentType(
                    "text/html"
            );

            response.getWriter().println(
                    "<h2>Registration Error: "
                    + e.getMessage()
                    + "</h2>"
            );

            response.getWriter().println(
                    "<a href='account.html'>Go Back</a>"
            );
        }
    }
}