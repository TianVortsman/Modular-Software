<?php
session_start();
include('main-db.php'); // Database connection

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'], $_POST['password'])) {
    // Get form inputs
    $email = trim($_POST['email']); // Use trim to remove extra spaces
    $password = trim($_POST['password']);

    // Debugging: Print the email to check its value
    echo "Email entered: " . htmlspecialchars($email) . "<br>";

    // Step 1: Check if the user is a technician
    $sql = "SELECT * FROM technicians WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $techResult = $stmt->get_result();

    if ($techResult->num_rows == 1) {
        $techUser = $techResult->fetch_assoc();
        unset($_SESSION['account_number']);
        // Verify the password
        if (password_verify($password, $techUser['password'])) {
            // Technician login success
            $_SESSION['tech_logged_in'] = true;
            $_SESSION['tech_email'] = $techUser['email'];
            $_SESSION['userName'] = $techUser['name']; // Store technician's name

            // Redirect to the admin panel
            header("Location: ../main/techlogin.php");
            exit();
        } else {
            echo "Invalid password for technician.";
            exit();
        }
    }

// Step 2: Check if the user is a customer user
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$userResult = $stmt->get_result();

// Check if the user exists
if ($userResult->num_rows == 1) {
    unset($_SESSION['tech_logged_in']);
    unset($_SESSION['tech_email']);
    // Fetch the user data
    $user = $userResult->fetch_assoc(); // Now $user will be defined

    // Verify the password for the user
    if (password_verify($password, $user['password'])) {
        // User login success
        $accountNumber = $user['account_number']; // Get the account number

        // Store user information in session
        $_SESSION['user_logged_in'] = true;
        $_SESSION['user_email'] = $email; // Store user's email
        $_SESSION['userName'] = $user['name']; // Store user's name
        $_SESSION['account_number'] = $accountNumber; // Store user's account number

        // Include db.php to set the database connection based on account number
        include('db.php'); // Now the db connection will use the account number from session

        // Check if the connection is successful or handle any errors
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            // Debugging: output database name
            echo "Connected to the database for Account Number: " . $accountNumber;
        }

        // Redirect to `main.php` after ensuring the correct database is connected
        header("Location: ../main/dashboard.php");
        $accountNumber = null;
        exit();
    } else {
        echo "Invalid password.";
        exit();
    }
} else {
    echo "Invalid email.";
    exit();
}


}
session_abort();
?>
