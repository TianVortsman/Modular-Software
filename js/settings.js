// Select all sidebar links and setting sections
const sidebarLinks = document.querySelectorAll('.modular-nav-items a');
const settingSections = document.querySelectorAll('.setting-section');

// Function to handle section activation for any link
function activateSection(sectionId) {
    console.log('Section to activate:', sectionId);

    // Hide all sections
    settingSections.forEach(section => {
        section.classList.remove('active');
        console.log('Removed active class from section:', section.id);
    });

    // Remove the active class from all links
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        console.log('Removed active class from link:', link.href);
    });

    // Show the selected section by adding the active class
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        console.log('Activated section:', sectionId);
    } else {
        console.log('No section found with id:', sectionId);
    }

    // Add the active class to the clicked menu item
    const clickedLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (clickedLink) {
        clickedLink.classList.add('active');
        console.log('Added active class to clicked link:', clickedLink.href);
    }
}

// Optionally, show the first section by default when the page loads
if (settingSections.length > 0) {
    settingSections[0].classList.add('active');
    sidebarLinks[0].classList.add('active');
    console.log('Activated default section and link:', settingSections[0].id, sidebarLinks[0].href);
}


// Function to update the summary (you can modify this function as needed)
function updateSummary(sectionId) {
    const summaryElement = document.getElementById('summary'); // Assuming there's an element with id 'summary'
    if (summaryElement) {
        switch (sectionId) {
            case 'invoice-preferences':
                summaryElement.textContent = 'You are viewing Invoice Preferences.';
                break;
            case 'company-settings':
                summaryElement.textContent = 'You are viewing Company Settings.';
                break;
            // Add cases for other sections as needed
            default:
                summaryElement.textContent = 'Select a section to see details.';
        }
    }
}

// Function to update the summary (additional implementation for sections)
function updateSummary(sectionId) {
    if (sectionId === 'invoice-preferences') {
        const template = document.getElementById('invoice-template').value;
        document.getElementById('summary-template').textContent = template;

        // Update the preview area based on selected template
    } else if (sectionId === 'company-settings') {
        const companyName = document.getElementById('company-name').value;
        document.getElementById('summary-company-name').textContent = companyName;
        // Add more updates for currency and tax rate if applicable
    }
    // Additional updates for other sections can be added here
}

document.getElementById('invoice-template').addEventListener('change', function() {
    updateInvoicePreview(); // Call the function when selection changes
});


// Function to update the invoice preview
function updateInvoicePreview() {
    const template = document.getElementById('invoice-template').value;
    const previewContent = document.querySelector('.preview-content');

    if (template === 'template1') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/invoice-template1.css'; // Update with the correct path
        document.head.appendChild(link);
    
        invoiceHTML = `
        </body>
            <div class="py-4">
                <div class="px-14 py-6">
                    <table class="w-full border-collapse border-spacing-0">
                    <tbody>
                        <tr>
                        <td class="w-full align-top">
                            <div>
                            <img src="https://menkoff.com/assets/brand-sample.png" class="h-12" />
                            </div>
                        </td>

                        <td class="align-top">
                            <div class="text-sm">
                            <table class="border-collapse border-spacing-0">
                                <tbody>
                                <tr>
                                    <td class="border-r pr-4">
                                    <div>
                                        <p class="whitespace-nowrap text-slate-400 text-right">Date</p>
                                        <p class="whitespace-nowrap font-bold text-main text-right">April 26, 2023</p>
                                    </div>
                                    </td>
                                    <td class="pl-4">
                                    <div>
                                        <p class="whitespace-nowrap text-slate-400 text-right">Invoice #</p>
                                        <p class="whitespace-nowrap font-bold text-main text-right">BRA-00335</p>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div class="bg-slate-100 px-14 py-6 text-sm">
                    <table class="w-full border-collapse border-spacing-0">
                    <tbody>
                        <tr>
                        <td class="w-1/2 align-top">
                            <div class="text-sm text-neutral-600">
                            <p class="font-bold">Supplier Company INC</p>
                            <p>Number: 23456789</p>
                            <p>VAT: 23456789</p>
                            <p>6622 Abshire Mills</p>
                            <p>Port Orlofurt, 05820</p>
                            <p>United States</p>
                            </div>
                        </td>
                        <td class="w-1/2 align-top text-right">
                            <div class="text-sm text-neutral-600">
                            <p class="font-bold">Customer Company</p>
                            <p>Number: 123456789</p>
                            <p>VAT: 23456789</p>
                            <p>9552 Vandervort Spurs</p>
                            <p>Paradise, 43325</p>
                            <p>United States</p>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div class="px-14 py-10 text-sm text-neutral-700">
                    <table class="w-full border-collapse border-spacing-0">
                    <thead>
                        <tr>
                        <td class="border-b-2 border-main pb-3 pl-3 font-bold text-main">#</td>
                        <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Product details</td>
                        <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Price</td>
                        <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">Qty.</td>
                        <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">VAT</td>
                        <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Subtotal</td>
                        <td class="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">Subtotal + VAT</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td class="border-b py-3 pl-3">1.</td>
                        <td class="border-b py-3 pl-2">Montly accountinc services</td>
                        <td class="border-b py-3 pl-2 text-right">$150.00</td>
                        <td class="border-b py-3 pl-2 text-center">1</td>
                        <td class="border-b py-3 pl-2 text-center">20%</td>
                        <td class="border-b py-3 pl-2 text-right">$150.00</td>
                        <td class="border-b py-3 pl-2 pr-3 text-right">$180.00</td>
                        </tr>
                        <tr>
                        <td class="border-b py-3 pl-3">2.</td>
                        <td class="border-b py-3 pl-2">Taxation consulting (hour)</td>
                        <td class="border-b py-3 pl-2 text-right">$60.00</td>
                        <td class="border-b py-3 pl-2 text-center">2</td>
                        <td class="border-b py-3 pl-2 text-center">20%</td>
                        <td class="border-b py-3 pl-2 text-right">$120.00</td>
                        <td class="border-b py-3 pl-2 pr-3 text-right">$144.00</td>
                        </tr>
                        <tr>
                        <td class="border-b py-3 pl-3">3.</td>
                        <td class="border-b py-3 pl-2">Bookkeeping services</td>
                        <td class="border-b py-3 pl-2 text-right">$50.00</td>
                        <td class="border-b py-3 pl-2 text-center">1</td>
                        <td class="border-b py-3 pl-2 text-center">20%</td>
                        <td class="border-b py-3 pl-2 text-right">$50.00</td>
                        <td class="border-b py-3 pl-2 pr-3 text-right">$60.00</td>
                        </tr>
                        <tr>
                        <td colspan="7">
                            <table class="w-full border-collapse border-spacing-0">
                            <tbody>
                                <tr>
                                <td class="w-full"></td>
                                <td>
                                    <table class="w-full border-collapse border-spacing-0">
                                    <tbody>
                                        <tr>
                                        <td class="border-b p-3">
                                            <div class="whitespace-nowrap text-slate-400">Net total:</div>
                                        </td>
                                        <td class="border-b p-3 text-right">
                                            <div class="whitespace-nowrap font-bold text-main">$320.00</div>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td class="p-3">
                                            <div class="whitespace-nowrap text-slate-400">VAT total:</div>
                                        </td>
                                        <td class="p-3 text-right">
                                            <div class="whitespace-nowrap font-bold text-main">$64.00</div>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td class="bg-main p-3">
                                            <div class="whitespace-nowrap font-bold text-white">Total:</div>
                                        </td>
                                        <td class="bg-main p-3 text-right">
                                            <div class="whitespace-nowrap font-bold text-white">$384.00</div>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div class="px-14 text-sm text-neutral-700">
                    <p class="text-main font-bold">PAYMENT DETAILS</p>
                    <p>Banks of Banks</p>
                    <p>Bank/Sort Code: 1234567</p>
                    <p>Account Number: 123456678</p>
                    <p>Payment Reference: BRA-00335</p>
                </div>

                <div class="px-14 py-10 text-sm text-neutral-700">
                    <p class="text-main font-bold">Notes</p>
                    <p class="italic">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                    for previewing layouts and visual mockups.</p>
                    </dvi>

                    <footer class="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
                    Supplier Company
                    <span class="text-slate-300 px-2">|</span>
                    info@company.com
                    <span class="text-slate-300 px-2">|</span>
                    +1-202-555-0106
                    </footer>
                </div>
                </div>
        </body>
        `;

    previewContent.innerHTML = invoiceHTML;
    }};
