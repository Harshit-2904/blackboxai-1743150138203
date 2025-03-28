// Sample job data - In a real application, this would come from an API
const sampleJobs = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'New York, NY',
        salary: '$120k - $150k',
        type: 'Full-time',
        remote: true,
        logo: 'https://via.placeholder.com/50',
        description: 'We are looking for an experienced software engineer to join our team...'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Design Studio',
        location: 'San Francisco, CA',
        salary: '$90k - $120k',
        type: 'Full-time',
        remote: true,
        logo: 'https://via.placeholder.com/50',
        description: 'Seeking a creative product designer to help shape our digital products...'
    },
    {
        id: 3,
        title: 'Marketing Manager',
        company: 'Growth Co.',
        location: 'Chicago, IL',
        salary: '$80k - $100k',
        type: 'Full-time',
        remote: false,
        logo: 'https://via.placeholder.com/50',
        description: 'Looking for an experienced marketing manager to lead our campaigns...'
    }
];

// Load featured jobs on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedJobs();
});

// Function to load featured jobs
function loadFeaturedJobs() {
    const featuredJobsContainer = document.getElementById('featured-jobs');
    if (!featuredJobsContainer) return;

    sampleJobs.forEach(job => {
        const jobCard = createJobCard(job);
        featuredJobsContainer.appendChild(jobCard);
    });
}

// Function to create a job card
function createJobCard(job) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-lg shadow p-6';
    div.innerHTML = `
        <div class="flex items-center mb-4">
            <img src="${job.logo}" alt="${job.company} Logo" class="w-12 h-12 rounded-lg mr-4">
            <div>
                <h3 class="text-lg font-semibold">${job.title}</h3>
                <p class="text-gray-600">${job.company}</p>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex items-center text-gray-600 mb-2">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>${job.location}</span>
            </div>
            <div class="flex items-center text-gray-600">
                <i class="fas fa-dollar-sign mr-2"></i>
                <span>${job.salary}</span>
            </div>
        </div>
        <div class="flex items-center space-x-2 mb-4">
            <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">${job.type}</span>
            ${job.remote ? '<span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Remote</span>' : ''}
        </div>
        <a href="#" onclick="viewJob(${job.id})" class="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Apply Now</a>
    `;
    return div;
}

// Function to view job details
function viewJob(jobId) {
    const job = sampleJobs.find(j => j.id === jobId);
    if (!job) return;

    // Create modal with job details
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center">
                    <img src="${job.logo}" alt="${job.company} Logo" class="w-16 h-16 rounded-lg mr-4">
                    <div>
                        <h2 class="text-2xl font-bold">${job.title}</h2>
                        <p class="text-gray-600">${job.company}</p>
                    </div>
                </div>
                <button onclick="closeJobModal(this)" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mb-6">
                <div class="flex items-center text-gray-600 mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    <span>${job.location}</span>
                </div>
                <div class="flex items-center text-gray-600 mb-2">
                    <i class="fas fa-dollar-sign mr-2"></i>
                    <span>${job.salary}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">${job.type}</span>
                    ${job.remote ? '<span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Remote</span>' : ''}
                </div>
            </div>
            <div class="prose max-w-none mb-6">
                <h3 class="text-lg font-semibold mb-2">Job Description</h3>
                <p>${job.description}</p>
            </div>
            <div class="flex justify-end space-x-4">
                <button onclick="closeJobModal(this)" class="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
                <button onclick="applyForJob(${job.id})" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply Now</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Function to close job modal
function closeJobModal(button) {
    const modal = button.closest('.fixed');
    if (modal) {
        modal.remove();
    }
}

// Function to handle job application
function applyForJob(jobId) {
    console.log(`Applying for job ${jobId}`);
    // Implement job application functionality
    // This would typically involve showing an application form or redirecting to an application page
}

// Function to filter jobs
function filterJobs(filters) {
    const filteredJobs = sampleJobs.filter(job => {
        return (
            (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.type || job.type === filters.type) &&
            (!filters.remote || job.remote === filters.remote)
        );
    });

    const featuredJobsContainer = document.getElementById('featured-jobs');
    if (!featuredJobsContainer) return;

    featuredJobsContainer.innerHTML = '';
    filteredJobs.forEach(job => {
        const jobCard = createJobCard(job);
        featuredJobsContainer.appendChild(jobCard);
    });
}

// Function to save job
function saveJob(jobId) {
    console.log(`Saving job ${jobId}`);
    // Implement job saving functionality
    // This would typically involve making an API call to save the job to the user's favorites
}

// Function to share job
function shareJob(jobId) {
    console.log(`Sharing job ${jobId}`);
    // Implement job sharing functionality
    // This would typically involve showing a modal with sharing options
}