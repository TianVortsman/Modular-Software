document.addEventListener('DOMContentLoaded', function () {
    const bodyId = document.body.id;

    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');

            // Handle toggling for the correct content based on the body ID
            if (bodyId === 'dashboard') {
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.classList.toggle('collapsed');
                }
            } else if (bodyId === 'invoice-dashboard') {
                const mainInvoiceContent = document.getElementById('main-content');
                if (mainInvoiceContent) {
                    mainInvoiceContent.classList.toggle('collapsed');
                }
            } else if (bodyId === 'settings') {
                const settingsContent = document.getElementById('settings-container');
                if (settingsContent) {
                    settingsContent.classList.toggle('collapsed');
                }
            }
        });
    }

    // Dashboard-specific logic
    if (bodyId === 'dashboard') {
        const homeButton = document.querySelector('li a[href="/modular1/main/dashboard.php"]');
        if (homeButton) {
            homeButton.parentElement.classList.add('hidden');
        }
    }

    // Invoice-dashboard-specific logic
    if (bodyId === 'invoice-dashboard') {
        const buttons = [
            'settings-button',
            'import-button',
            'export-button',
            'setup-button',
            'exit-button'
        ];

        buttons.forEach(buttonId => {
            const buttonElement = document.getElementById(buttonId);
            if (buttonElement?.parentElement) {
                buttonElement.parentElement.classList.add('hidden');
            }
        });

        // Add modular navigation items for invoice-dashboard
        const modularNavItems = [
            { href: "invoicing/invoices.php", icon: "description", text: "Invoices" },
            { href: "invoicing/invoice-products.php", icon: "inventory_2", text: "Products" },
            { href: "invoicing/clients.php", icon: "people", text: "Clients" },
            { href: "invoicing/suppliers.php", icon: "local_shipping", text: "Suppliers" },
            { href: "invoicing/payments.php", icon: "payment", text: "Payments" },
            { href: "#", icon: "bar_chart", text: "Reports" },
            { href: "/modular1/main/settings.php", icon: "settings", text: "Settings" }
        ];

        const ul = document.querySelector('.modular-nav-items');
        modularNavItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.href}"><i class="material-icons">${item.icon}</i> <span class="nav-text">${item.text}</span></a></li>`;
            ul.appendChild(li);
        });
    }

    // Settings-specific logic
    if (bodyId === 'settings') {
            // Hide all previous sidebar items
            const sidebarItems = document.querySelectorAll('.modular-nav-items li');
            sidebarItems.forEach(item => item.classList.add('hidden'));
        
            // Create and append the settings menu with Material Dashboard icons
            const settingsMenu = `
                <li><a href="/modular1/main/dashboard.php"><i class="material-icons">home</i><span class="nav-text">Home</span></a></li>
                <li><a href="#company-settings" onclick="activateSection('company-settings')"><i class="material-icons">business</i><span class="nav-text">Company Settings</span></a></li>
                <li><a href="#invoice-preferences" onclick="activateSection('invoice-preferences')"><i class="material-icons">receipt</i><span class="nav-text">Invoice Preferences</span></a></li>
                <li><a href="#payment-settings" onclick="activateSection('payment-settings')"><i class="material-icons">payment</i><span class="nav-text">Payment Settings</span></a></li>
                <li><a href="#tax-settings" onclick="activateSection('tax-settings')"><i class="material-icons">attach_money</i><span class="nav-text">Tax Settings</span></a></li>
                <li><a href="#notification-settings" onclick="activateSection('notification-settings')"><i class="material-icons">notifications</i><span class="nav-text">Notification Settings</span></a></li>
                <li><a href="#user-preferences" onclick="activateSection('user-preferences')"><i class="material-icons">person</i><span class="nav-text">User Preferences</span></a></li>
                <li><a href="#data-management" onclick="activateSection('data-management')"><i class="material-icons">storage</i><span class="nav-text">Data Management</span></a></li>
            `;
        
            const sidebar = document.querySelector('#sidebar');
            if (sidebar) {
                const navItems = document.querySelector('.modular-nav-items');
                navItems.innerHTML += settingsMenu; // Add settings menu inside the existing nav-items
            }
        }
});
