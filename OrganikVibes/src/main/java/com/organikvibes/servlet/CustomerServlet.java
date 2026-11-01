package com.organikvibes.servlet;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/CustomerServlet")
public class CustomerServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        // ==========================================
        // GET EXISTING SESSION
        // ==========================================

        HttpSession session =
                request.getSession(false);


        // ==========================================
        // NOT LOGGED IN
        // ==========================================

        if (session == null ||
            session.getAttribute("loggedIn") == null ||
            !(Boolean) session.getAttribute("loggedIn")) {

            response.getWriter().write(
                    "{\"loggedIn\":false}"
            );

            return;
        }


        // ==========================================
        // GET CUSTOMER DETAILS
        // ==========================================

        String fullname =
                (String) session.getAttribute(
                        "fullname"
                );

        String mobile =
                (String) session.getAttribute(
                        "mobile"
                );

        String email =
                (String) session.getAttribute(
                        "email"
                );

        String dob =
                (String) session.getAttribute(
                        "dob"
                );

        String gender =
                (String) session.getAttribute(
                        "gender"
                );

        String hno =
                (String) session.getAttribute(
                        "hno"
                );

        String area =
                (String) session.getAttribute(
                        "area"
                );

        String city =
                (String) session.getAttribute(
                        "city"
                );

        String state =
                (String) session.getAttribute(
                        "state"
                );

        Object pincode =
                session.getAttribute(
                        "pincode"
                );


        // ==========================================
        // SEND CUSTOMER DATA AS JSON
        // ==========================================

        String json =
                "{"
                + "\"loggedIn\":true,"
                + "\"fullname\":\""
                + safe(fullname)
                + "\","

                + "\"mobile\":\""
                + safe(mobile)
                + "\","

                + "\"email\":\""
                + safe(email)
                + "\","

                + "\"dob\":\""
                + safe(dob)
                + "\","

                + "\"gender\":\""
                + safe(gender)
                + "\","

                + "\"hno\":\""
                + safe(hno)
                + "\","

                + "\"area\":\""
                + safe(area)
                + "\","

                + "\"city\":\""
                + safe(city)
                + "\","

                + "\"state\":\""
                + safe(state)
                + "\","

                + "\"pincode\":\""
                + (pincode == null
                    ? ""
                    : pincode)
                + "\""

                + "}";


        response.getWriter().write(
                json
        );
    }


    // ==========================================
    // MAKE TEXT SAFE FOR JSON
    // ==========================================

    private String safe(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "")
                .replace("\r", "");
    }
}