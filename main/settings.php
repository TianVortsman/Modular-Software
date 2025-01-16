<?php
session_start();

// Check if account number is in the query parameters
if (isset($_GET['account_number'])) {
    $account_number = $_GET['account_number'];

    // Store the account number in the session
    $_SESSION['account_number'] = $account_number;

    // Optionally, redirect to remove the query parameter from the URL
    header("Location: dashboard.php");
    exit;
}

// If the account number is already in the session, use it
if (isset($_SESSION['account_number'])) {
    $account_number = $_SESSION['account_number'];
} else {
    // Redirect to login or show an error if no account number is found
    header("Location: techlogin.php");
    exit;
}

$userName = $_SESSION['userName'] ?? (isset($_SESSION['tech_logged_in']) && $_SESSION['tech_logged_in'] ? $_SESSION['userName'] : 'Guest');

// Include the database connection
include('../php/db.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/root.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="../css/settings.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../js/toggle-theme.js" type="module"></script>
</head>
<body id="settings">
<?php include 'sidebar.php'; ?>
<div class="settings-container" id="settings-container">
    <div class="settings-content">
        <div id="company-settings" class="setting-section">
            <h3>Company Settings</h3>
            <label for="company-name">Company Name:</label>
            <input type="text" id="company-name" placeholder="Enter your company name">
            
            <label for="company-address">Company Address:</label>
            <input type="text" id="company-address" placeholder="Enter your company address">

            <label for="contact-number">Contact Number:</label>
            <input type="text" id="contact-number" placeholder="Enter your contact number">

            <label for="company-email">Company Email:</label>
            <input type="email" id="company-email" placeholder="Enter your company email">

            <button type="button">Save Company Settings</button>
        </div>

        <div id="invoice-preferences" class="setting-section">
            <h3>Invoice Preferences</h3>
            <label for="invoice-template">Default Invoice Template:</label>
            <select id="invoice-template">
                <option value="template1">Template 1</option>
                <option value="template2">Template 2</option>
                <option value="template3">Template 3</option>
            </select>
            
            <label for="invoice-numbering">Invoice Numbering Format:</label>
            <select id="invoice-numbering">
                <option value="sequential">Sequential</option>
                <option value="custom">Custom</option>
            </select>
            
            <button type="button">Save Invoice Preferences</button>
        </div>

        <div id="payment-settings" class="setting-section">
            <h3>Payment Settings</h3>
            <label for="payment-gateway">Payment Gateway:</label>
            <select id="payment-gateway">
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="razorpay">Razorpay</option>
            </select>
            
            <label for="currency">Default Currency:</label>
            <select id="currency">
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
                <option value="EUR">EUR</option>
            </select>

            <button type="button">Save Payment Settings</button>
        </div>

        <div id="tax-settings" class="setting-section" style=">
            <h3>Tax Settings</h3>
            <label for="default-tax-rate" >Default Tax Rate (%):</label>
            <input type="number" id="default-tax-rate" placeholder="Enter default tax rate" min="0" max="100">
            
            <label for="tax-inclusion">Tax Inclusion:</label>
            <select id="tax-inclusion">
                <option value="inclusive">Inclusive</option>
                <option value="exclusive">Exclusive</option>
            </select>

            <button type="button">Save Tax Settings</button>
        </div>

        <div id="notification-settings" class="setting-section">
            <h3>Notification Settings</h3>
            <label for="email-notifications">Email Notifications:</label>
            <select id="email-notifications">
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
            </select>
            
            <label for="sms-notifications">SMS Notifications:</label>
            <select id="sms-notifications">
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
            </select>

            <button type="button">Save Notification Settings</button>
        </div>

        <div id="user-preferences" class="setting-section">
            <h3>User Preferences</h3>
            <label for="theme">Theme:</label>
            <select id="theme">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
            
            <label for="default-language">Default Language:</label>
            <select id="default-language">
                <option value="english">English</option>
                <option value="afrikaans">Afrikaans</option>
                <option value="spanish">Spanish</option>
            </select>

            <button type="button">Save User Preferences</button>
        </div>

        <div id="data-management" class="setting-section">
            <h3>Data Management</h3>
            <label for="backup-frequency">Backup Frequency:</label>
            <select id="backup-frequency">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            
            <button type="button">Save Data Management Settings</button>
        </div>
    </div>


    <div id="invoice-preview" class="preview-area">
        <h3>Invoice Preview</h3>
        <div class="preview-content">
            <!-- Placeholder for dynamic content -->
            <p>Select an invoice template to see the preview here.</p>
        </div>
    </div>
</div>
<script src="../js/settings.js"></script>
<script src="../js/sidebar.js"></script>
</body>
</html>
