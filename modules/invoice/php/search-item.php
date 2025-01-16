<?php
session_start();

// Check if the account number is set in the session
if (!isset($_SESSION['account_number'])) {
    die(json_encode(['error' => 'Account number not set. Unable to connect to the database.']));
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
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Handle the search request
if (isset($_GET['field']) && isset($_GET['query'])) {
    $field = $_GET['field']; // Either 'item-code' or 'description'
    $query = $_GET['query'];

    // Validate and sanitize the field parameter
    if (!in_array($field, ['item-code', 'description'], true)) {
        die(json_encode(['error' => 'Invalid search field']));
    }

    // Build the SQL query based on the field
    $sql = $field === 'item-code'
        ? "SELECT item_code, description, unit_price, product_id, tax_percentage FROM products WHERE item_code LIKE ? LIMIT 5"
        : "SELECT item_code, description, unit_price, product_id, tax_percentage FROM products WHERE description LIKE ? LIMIT 5";

    // Prepare and execute the query
    if ($stmt = $conn->prepare($sql)) {
        $searchTerm = "%" . $conn->real_escape_string($query) . "%"; // Sanitize query
        $stmt->bind_param('s', $searchTerm);
        $stmt->execute();
        $result = $stmt->get_result();

        // Fetch and format results as JSON
        $results = [];
        while ($row = $result->fetch_assoc()) {
            $results[] = [
                'item_code' => $row['item_code'],
                'description' => $row['description'],
                'unit_price' => number_format((float)$row['unit_price'], 2),
                'product_id' => $row['product_id'],
                'tax_percentage' => $row['tax_percentage'] // Add tax_percentage to the result
            ];
        }

        echo json_encode($results);
        $stmt->close();
    } else {
        // Return an error message if the query fails
        echo json_encode(['error' => 'Query preparation failed']);
    }
} else {
    // Return an error if the required parameters are missing
    echo json_encode(['error' => 'Invalid request. Missing parameters.']);
}
?>
