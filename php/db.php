<?php

// Check if the account number is set in the session
if (!isset($_SESSION['account_number'])) {
    die("Account number not set. Unable to connect to the database.");
}

// Get the account number from the session
$account_number = $_SESSION['account_number'];

// Define database connection parameters
$db_host = 'localhost'; // Localhost for XAMPP
$db_user = 'root';      // Default user in XAMPP
$db_pass = '';          // Default password in XAMPP
$db_name = $account_number; // Use the account number directly as the DB name

// Create a new database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check if the connection succeeded
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
