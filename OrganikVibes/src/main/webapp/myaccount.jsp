<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    String fullname = (String) session.getAttribute("fullname");
    String mobile = (String) session.getAttribute("mobile");
    String email = (String) session.getAttribute("email");
    String dob = (String) session.getAttribute("dob");
    String gender = (String) session.getAttribute("gender");
    String hno = (String) session.getAttribute("hno");
    String area = (String) session.getAttribute("area");
    String city = (String) session.getAttribute("city");
    String state = (String) session.getAttribute("state");
    Integer pincode = (Integer) session.getAttribute("pincode");

    // If user is not logged in
    if(fullname == null) {
        response.sendRedirect("login.html");
        return;
    }
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Organic Food Store</title>

    <link rel="stylesheet" href="style.css">

</head>
<body>

<header>

    <div class="logo">
        ORGANIK VIBES
    </div>

    <nav>

        <a href="index.html">Home</a>

        <a href="categories.html">Categories</a>

		<a href="about.html"><p>About Us</p></a>

        <a href="myaccont.jsp">MY Account</a>

        <a href="cart.html" class="cart-icon">
    <i class="fa-solid fa-cart-shopping"></i>
    <span id="cartCount">0</span>
</a> </nav>
</header>

<body>
<div class="card">
    <h2>My Account</h2>

    <div class="row">
        <span class="label">Full Name:</span>
        <%= fullname %>
    </div>

    <div class="row">
        <span class="label">Email:</span>
        <%= email %>
    </div>

    <div class="row">
        <span class="label">Mobile:</span>
        <%= mobile %>
    </div>

    <div class="row">
        <span class="label">Date of Birth:</span>
        <%= dob %>
    </div>

    <div class="row">
        <span class="label">Gender:</span>
        <%= gender %>
    </div>

    <div class="row">
        <span class="label">Address:</span>
        <%= hno %>, <%= area %>, <%= city %>, <%= state %> - <%= pincode %>
    </div>

    <hr>

    <h3>Previous Orders</h3>
    <p>No previous orders found.</p>

   </div>


    <div class="buttons">
        <a href="categories.html" class="btn shop">Continue Shopping</a>
        <a href="LogoutServlet" class="btn logout">Logout</a>

</div>


<footer>
<div class="footer">
<div>
<h3>Organik Vibes</h3>
<p>
Healthy Living Starts Here.
</p>
</div>

<div>
<h3>Contact</h3>
<p> organikvibes@gmail.com </p>

<p> +91 9876543210 </p>

</div>

</div>
<hr>

<p align="center">
© 2026 Organik vibes
</p>
</footer>

<script src="script.js"></script>

</body>
</html>
