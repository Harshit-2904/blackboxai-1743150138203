// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle FAQ toggles
    const faqButtons = document.querySelectorAll('.bg-white.rounded-lg.shadow button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            // Toggle content visibility
            content.classList.toggle('hidden');
            
            // Toggle icon
            if (content.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // Handle mobile menu
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.hidden.md\\:flex');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Handle search functionality
    const searchForm = document.querySelector('.bg-white.rounded-lg.p-2');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const keyword = searchForm.querySelector('input[placeholder="Job title or keyword"]').value;
            const location = searchForm.querySelector('input[placeholder="Location"]').value;
            
            // Implement search functionality
            searchJobs(keyword, location);
        });
    }
});

// Search jobs function
function searchJobs(keyword, location) {
    console.log(`Searching for ${keyword} jobs in ${location}`);
    // Implement actual search functionality here
    // This would typically involve making an API call to your backend
}

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle form submissions
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission based on form ID or other identifier
        console.log('Form submitted:', e.target);
    });
});

// Handle newsletter subscription
function subscribeNewsletter(email) {
    // Implement newsletter subscription functionality
    console.log('Newsletter subscription for:', email);
}

// Handle social media sharing
function shareOnSocial(platform, url) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    window.open(shareUrls[platform], '_blank');
}