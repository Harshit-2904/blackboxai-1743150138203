// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('bg-blue-50', 'text-blue-700'));
            // Add active class to clicked link
            link.classList.add('bg-blue-50', 'text-blue-700');
            
            // Update content based on section
            const section = link.getAttribute('href').replace('#', '');
            updateContent(section);
        });
    });

    // Load initial dashboard section
    loadDashboardSection();
});

// Function to update content based on section
function updateContent(section) {
    // Update header title
    const header = document.querySelector('header h2');
    if (header) {
        header.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    }
    
    // Update main content based on section
    switch(section) {
        case 'blogs':
            loadBlogsSection();
            break;
        case 'jobs':
            loadJobsSection();
            break;
        case 'content':
            loadContentSection();
            break;
        case 'settings':
            loadSettingsSection();
            break;
        default:
            loadDashboardSection();
    }
}

// Function to load dashboard section
function loadDashboardSection() {
    const mainContent = document.querySelector('.p-6');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-blue-50 rounded-full">
                        <i class="fas fa-blog text-blue-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-gray-500 text-sm">Total Blogs</h3>
                        <p class="text-2xl font-semibold text-gray-800">10</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-green-50 rounded-full">
                        <i class="fas fa-briefcase text-green-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-gray-500 text-sm">Active Jobs</h3>
                        <p class="text-2xl font-semibold text-gray-800">24</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-purple-50 rounded-full">
                        <i class="fas fa-users text-purple-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-gray-500 text-sm">Total Users</h3>
                        <p class="text-2xl font-semibold text-gray-800">1.2k</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-yellow-50 rounded-full">
                        <i class="fas fa-eye text-yellow-600 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-gray-500 text-sm">Page Views</h3>
                        <p class="text-2xl font-semibold text-gray-800">5.6k</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Posts -->
        <div class="bg-white rounded-lg shadow mb-6">
            <div class="p-6 border-b">
                <h3 class="text-lg font-semibold text-gray-800">Recent Blog Posts</h3>
            </div>
            <div class="p-6">
                <table class="w-full">
                    <thead>
                        <tr class="text-left text-gray-500">
                            <th class="pb-4">Title</th>
                            <th class="pb-4">Author</th>
                            <th class="pb-4">Date</th>
                            <th class="pb-4">Status</th>
                            <th class="pb-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-t">
                            <td class="py-4">How to Ace Your Job Interview</td>
                            <td>John Doe</td>
                            <td>2024-01-20</td>
                            <td><span class="px-2 py-1 bg-green-100 text-green-700 rounded">Published</span></td>
                            <td>
                                <button class="text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-edit"></i></button>
                                <button class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Recent Jobs -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
                <h3 class="text-lg font-semibold text-gray-800">Recent Job Postings</h3>
            </div>
            <div class="p-6">
                <table class="w-full">
                    <thead>
                        <tr class="text-left text-gray-500">
                            <th class="pb-4">Position</th>
                            <th class="pb-4">Company</th>
                            <th class="pb-4">Location</th>
                            <th class="pb-4">Status</th>
                            <th class="pb-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-t">
                            <td class="py-4">Senior Software Engineer</td>
                            <td>Tech Corp</td>
                            <td>New York, NY</td>
                            <td><span class="px-2 py-1 bg-blue-100 text-blue-700 rounded">Active</span></td>
                            <td>
                                <button class="text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-edit"></i></button>
                                <button class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Function to load blogs section
function loadBlogsSection() {
    const mainContent = document.querySelector('.p-6');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="mb-6">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <i class="fas fa-plus mr-2"></i>New Blog Post
            </button>
        </div>
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
                <h3 class="text-lg font-semibold">Manage Blog Posts</h3>
            </div>
            <div class="p-6">
                <div id="blogsList">
                    <!-- Blog posts will be loaded here -->
                </div>
            </div>
        </div>
    `;
    loadBlogPosts();
}

// Function to load jobs section
function loadJobsSection() {
    const mainContent = document.querySelector('.p-6');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="mb-6">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <i class="fas fa-plus mr-2"></i>New Job Posting
            </button>
        </div>
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
                <h3 class="text-lg font-semibold">Manage Job Postings</h3>
            </div>
            <div class="p-6">
                <div id="jobsList">
                    <!-- Job postings will be loaded here -->
                </div>
            </div>
        </div>
    `;
    loadJobPostings();
}

// Function to load content section
function loadContentSection() {
    const mainContent = document.querySelector('.p-6');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
                <h3 class="text-lg font-semibold">Manage Website Content</h3>
            </div>
            <div class="p-6">
                <div class="space-y-6">
                    <div>
                        <h4 class="font-semibold mb-2">Hero Section</h4>
                        <textarea class="w-full px-3 py-2 border rounded-lg" rows="4">Current hero section content...</textarea>
                        <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update</button>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2">About Section</h4>
                        <textarea class="w-full px-3 py-2 border rounded-lg" rows="4">Current about section content...</textarea>
                        <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to load settings section
function loadSettingsSection() {
    const mainContent = document.querySelector('.p-6');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
                <h3 class="text-lg font-semibold">Website Settings</h3>
            </div>
            <div class="p-6">
                <div class="space-y-6">
                    <div>
                        <h4 class="font-semibold mb-2">General Settings</h4>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Website Name</label>
                                <input type="text" class="mt-1 w-full px-3 py-2 border rounded-lg" value="JobPortal">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Contact Email</label>
                                <input type="email" class="mt-1 w-full px-3 py-2 border rounded-lg" value="contact@jobportal.com">
                            </div>
                        </div>
                        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions
function loadBlogPosts() {
    const blogsList = document.getElementById('blogsList');
    if (!blogsList) return;

    // In a real application, this would fetch blog posts from an API
    const samplePosts = [
        {
            title: 'How to Ace Your Job Interview',
            author: 'John Doe',
            date: '2024-01-20',
            status: 'Published'
        },
        {
            title: 'Top 10 Resume Writing Tips',
            author: 'Jane Smith',
            date: '2024-01-18',
            status: 'Draft'
        }
    ];

    blogsList.innerHTML = `
        <table class="w-full">
            <thead>
                <tr class="text-left text-gray-500">
                    <th class="pb-4">Title</th>
                    <th class="pb-4">Author</th>
                    <th class="pb-4">Date</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${samplePosts.map(post => `
                    <tr class="border-t">
                        <td class="py-4">${post.title}</td>
                        <td>${post.author}</td>
                        <td>${post.date}</td>
                        <td><span class="px-2 py-1 bg-${post.status === 'Published' ? 'green' : 'yellow'}-100 text-${post.status === 'Published' ? 'green' : 'yellow'}-700 rounded">${post.status}</span></td>
                        <td>
                            <button class="text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-edit"></i></button>
                            <button class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadJobPostings() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    // In a real application, this would fetch job postings from an API
    const sampleJobs = [
        {
            position: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'New York, NY',
            status: 'Active'
        },
        {
            position: 'Product Designer',
            company: 'Design Studio',
            location: 'San Francisco, CA',
            status: 'Closed'
        }
    ];

    jobsList.innerHTML = `
        <table class="w-full">
            <thead>
                <tr class="text-left text-gray-500">
                    <th class="pb-4">Position</th>
                    <th class="pb-4">Company</th>
                    <th class="pb-4">Location</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${sampleJobs.map(job => `
                    <tr class="border-t">
                        <td class="py-4">${job.position}</td>
                        <td>${job.company}</td>
                        <td>${job.location}</td>
                        <td><span class="px-2 py-1 bg-${job.status === 'Active' ? 'blue' : 'gray'}-100 text-${job.status === 'Active' ? 'blue' : 'gray'}-700 rounded">${job.status}</span></td>
                        <td>
                            <button class="text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-edit"></i></button>
                            <button class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}