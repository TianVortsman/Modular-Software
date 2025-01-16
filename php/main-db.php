<?php
$servername = "localhost"; // Change if using a different server
$username = "root";        // XAMPP default username
$password = "";            // XAMPP default password (leave blank)
$dbname = "modular_system";     // Replace with your global admin database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>