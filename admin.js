// Admin credentials
const ADMIN_USERNAME = 'tipschips';
const ADMIN_PASSWORD = 'TipsChips@9211';

// Function to validate admin login
function validateAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store admin session securely
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
    return false;
}

// Function to check if admin is logged in
function checkAdminAuth() {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
    }
}

// Function to logout admin
function logoutAdmin() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}

// Add logout functionality to all admin pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on an admin page (but not the login page)
    if (window.location.pathname.includes('admin-') && !window.location.pathname.includes('admin-login')) {
        checkAdminAuth();
    }
});