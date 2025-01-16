<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients</title>
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/invoice-clients.css">
    <link rel="stylesheet" href="../../css/invoice-client-details.css"> <!-- New CSS file for Clients -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="icon" href="../../path/to/favicon.ico" type="image/x-icon">
</head>
<body>
<div class="screen-container">
    <div class="clients-screen">
        <h2>Clients</h2>

        <!-- Quick Actions -->
        <div class="actions-container">
            <div class="clients-actions">
                <button class="open-client-modal">+ New Client</button>
                <button class="action-button">Send Reminder</button>
                <button class="action-button">Export Data</button>
            </div>

            <!-- Filter Options -->
            <div class="filter-container">
                <div class="client-filter">
                    <label for="client">Client:</label>
                    <input type="text" id="client-filter" placeholder="Filter by client...">
                </div>

                <!-- Search Container -->
                <div class="search-container">
                    <span class="material-icons search-icon">search</span>
                    <input type="text" id="client-search" placeholder="Search by Client Name or ID...">
                </div>
            </div>
            
            <!-- Table for Client Data -->
            <div class="table-container">
                <div class="client-table-container">
                    <table class="client-table">
                        <thead>
                            <tr>
                                <th>Client ID</th>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Last Invoice Date</th>
                                <th>Outstanding Balance</th>
                                <th>Total Invoices</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="client-body">
                            <!-- Table rows will be populated dynamically here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include ('screens/create-clients.php') ?> <!-- Include the PHP file here -->
<script src="../invoicing/invoiceJS/invoice-clients.js"></script>
</body>
</html>
