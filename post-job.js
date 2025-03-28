// Job posting functionality
document.addEventListener('DOMContentLoaded', function() {
    const jobPostForm = document.getElementById('job-post-form');
    if (jobPostForm) {
        jobPostForm.addEventListener('submit', handleJobPostSubmit);
    }

    // Initialize any rich text editors
    initializeEditors();

    // Initialize form validation
    initializeFormValidation();
});

// Initialize rich text editors
function initializeEditors() {
    // This would typically integrate with a rich text editor library
    console.log('Initializing rich text editors');
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('job-post-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }

    // URL validation
    if (field.type === 'url' && value && !isValidURL(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid URL';
    }

    // Salary range validation
    if (field.name === 'salary' && value) {
        const salaryPattern = /^\$?\d+(?:,\d{3})*(?:\.\d{2})?(?:\s*-\s*\$?\d+(?:,\d{3})*(?:\.\d{2})?)?$/;
        if (!salaryPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid salary range (e.g., $50,000 - $70,000)';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// Show error message for a field
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

// Handle job post form submission
function handleJobPostSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showError('Please fix the errors before submitting');
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const jobData = {
        title: formData.get('title'),
        company: formData.get('company'),
        location: formData.get('location'),
        type: formData.get('type'),
        salary: formData.get('salary'),
        description: formData.get('description'),
        requirements: formData.get('requirements'),
        benefits: formData.get('benefits'),
        remote: formData.get('remote') === 'true',
        date: new Date().toISOString(),
        applicationDeadline: formData.get('deadline'),
        experienceLevel: formData.get('experience'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        companyLogo: document.getElementById('company-logo-preview')?.src
    };

    // Save job posting
    saveJobPosting(jobData);
}

// Save job posting
function saveJobPosting(data) {
    // Show loading state
    showLoading();

    // In a real application, this would make an API call to save the job posting
    setTimeout(() => {
        console.log('Saving job posting:', data);
        
        // Hide loading state
        hideLoading();
        
        // Show success message
        showSuccess('Job posted successfully!');
        
        // Reset form
        resetForm();
        
        // Redirect to job listing
        setTimeout(() => {
            window.location.href = '/admin-dashboard.html#jobs';
        }, 2000);
    }, 1000);
}

// Preview job posting
function previewJobPosting() {
    const form = document.getElementById('job-post-form');
    if (!form) return;

    const formData = new FormData(form);
    const jobData = Object.fromEntries(formData);

    // Validate before preview
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showError('Please fix the errors before previewing');
        return;
    }

    const previewModal = document.createElement('div');
    previewModal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center modal-overlay';
    previewModal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl modal-content overflow-y-auto max-h-[90vh]">
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-2xl font-bold">Preview Job Posting</h2>
                <button onclick="closePreview(this)" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="prose max-w-none">
                <div class="flex items-center mb-6">
                    ${jobData.companyLogo ? `<img src="${jobData.companyLogo}" alt="${jobData.company}" class="w-16 h-16 object-contain mr-4">` : ''}
                    <div>
                        <h1 class="text-3xl font-bold mb-2">${jobData.title}</h1>
                        <div class="flex items-center text-gray-600">
                            <span class="mr-4"><i class="fas fa-building mr-2"></i>${jobData.company}</span>
                            <span class="mr-4"><i class="fas fa-map-marker-alt mr-2"></i>${jobData.location}</span>
                            <span><i class="fas fa-dollar-sign mr-2"></i>${jobData.salary}</span>
                        </div>
                    </div>
                </div>
                <div class="mb-6">
                    <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mr-2">${jobData.type}</span>
                    ${jobData.remote === 'true' ? '<span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Remote</span>' : ''}
                    <span class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm ml-2">${jobData.experienceLevel}</span>
                </div>
                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-3">Job Description</h2>
                    <div class="text-gray-700">${jobData.description}</div>
                </div>
                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-3">Requirements</h2>
                    <div class="text-gray-700">${jobData.requirements}</div>
                </div>
                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-3">Benefits</h2>
                    <div class="text-gray-700">${jobData.benefits}</div>
                </div>
                <div class="mb-6">
                    <h2 class="text-xl font-semibold mb-3">Required Skills</h2>
                    <div class="flex flex-wrap gap-2">
                        ${jobData.skills.split(',').map(skill => 
                            `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${skill.trim()}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="text-gray-600">
                    <p><i class="far fa-calendar mr-2"></i>Application Deadline: ${jobData.deadline}</p>
                </div>
            </div>
            <div class="mt-6 flex justify-end space-x-4">
                <button onclick="closePreview(this)" class="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
                <button onclick="handleJobPostSubmit(event)" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Post Job</button>
            </div>
        </div>
    `;
    document.body.appendChild(previewModal);
}

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// UI feedback functions
function showLoading() {
    const button = document.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner mr-2"></span>Posting...';
    }
}

function hideLoading() {
    const button = document.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = false;
        button.innerHTML = 'Post Job';
    }
}

function showSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'toast bg-green-100 text-green-700';
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'toast bg-red-100 text-red-700';
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function closePreview(button) {
    const modal = button.closest('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function resetForm() {
    const form = document.getElementById('job-post-form');
    if (form) {
        form.reset();
        const preview = document.getElementById('company-logo-preview');
        if (preview) {
            preview.src = '';
            preview.classList.add('hidden');
        }
    }
}

// Handle image upload
function handleImageUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('company-logo-preview');
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(file);
    }
}