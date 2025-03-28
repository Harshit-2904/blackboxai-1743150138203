// Resume checker functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resume-checker-form');
    if (resumeForm) {
        resumeForm.addEventListener('submit', handleResumeCheck);
    }

    // Initialize drag and drop functionality
    initializeDragAndDrop();
});

// Initialize drag and drop
function initializeDragAndDrop() {
    const dropZone = document.getElementById('resume-drop-zone');
    if (!dropZone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
}

// Handle resume check submission
function handleResumeCheck(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const jobTitle = formData.get('jobTitle');
    const resumeFile = formData.get('resume');

    if (!resumeFile) {
        showError('Please upload a resume');
        return;
    }

    // Show loading state
    showLoading();

    // In a real application, this would make an API call to analyze the resume
    setTimeout(() => {
        analyzeResume(resumeFile, jobTitle);
    }, 1500);
}

// Analyze resume
function analyzeResume(file, jobTitle) {
    // This is a mock analysis - in a real application, this would use AI/ML to analyze the resume
    const mockAnalysis = {
        score: 85,
        matchingKeywords: ['JavaScript', 'React', 'Node.js', 'API Development'],
        missingKeywords: ['TypeScript', 'AWS'],
        suggestions: [
            'Consider adding experience with TypeScript',
            'Include cloud platform experience (AWS)',
            'Quantify your achievements with metrics',
            'Add more specific technical project details'
        ],
        format: {
            hasContactInfo: true,
            hasEducation: true,
            hasExperience: true,
            hasSkills: true
        }
    };

    displayResults(mockAnalysis);
}

// Display analysis results
function displayResults(analysis) {
    hideLoading();

    const resultsContainer = document.getElementById('analysis-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
            <div class="mb-6">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold">Resume Analysis</h2>
                    <div class="text-3xl font-bold ${analysis.score >= 80 ? 'text-green-600' : analysis.score >= 60 ? 'text-yellow-600' : 'text-red-600'}">
                        ${analysis.score}%
                    </div>
                </div>
                <div class="h-2 bg-gray-200 rounded-full mt-2">
                    <div class="h-2 rounded-full ${analysis.score >= 80 ? 'bg-green-600' : analysis.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'}"
                         style="width: ${analysis.score}%"></div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-semibold mb-3">Matching Keywords</h3>
                    <div class="flex flex-wrap gap-2">
                        ${analysis.matchingKeywords.map(keyword => 
                            `<span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">${keyword}</span>`
                        ).join('')}
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-3">Missing Keywords</h3>
                    <div class="flex flex-wrap gap-2">
                        ${analysis.missingKeywords.map(keyword => 
                            `<span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">${keyword}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <h3 class="text-lg font-semibold mb-3">Suggestions for Improvement</h3>
                <ul class="space-y-2">
                    ${analysis.suggestions.map(suggestion => 
                        `<li class="flex items-start">
                            <i class="fas fa-lightbulb text-yellow-500 mt-1 mr-2"></i>
                            <span>${suggestion}</span>
                        </li>`
                    ).join('')}
                </ul>
            </div>

            <div class="mt-6">
                <h3 class="text-lg font-semibold mb-3">Resume Format Check</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${Object.entries(analysis.format).map(([key, value]) => 
                        `<div class="flex items-center">
                            <i class="fas fa-${value ? 'check text-green-500' : 'times text-red-500'} mr-2"></i>
                            <span>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        </div>`
                    ).join('')}
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button onclick="downloadReport()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <i class="fas fa-download mr-2"></i>Download Report
                </button>
            </div>
        </div>
    `;

    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Download analysis report
function downloadReport() {
    // In a real application, this would generate and download a PDF report
    console.log('Downloading report...');
}

// Drag and drop handlers
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    const dropZone = document.getElementById('resume-drop-zone');
    if (dropZone) {
        dropZone.classList.add('border-blue-500', 'bg-blue-50');
    }
}

function unhighlight(e) {
    const dropZone = document.getElementById('resume-drop-zone');
    if (dropZone) {
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    }
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    const file = files[0];
    if (file && file.type === 'application/pdf') {
        const input = document.querySelector('input[type="file"]');
        if (input) {
            input.files = files;
            showFileName(file.name);
        }
    } else {
        showError('Please upload a PDF file');
    }
}

// UI feedback functions
function showFileName(name) {
    const fileNameDisplay = document.getElementById('file-name-display');
    if (fileNameDisplay) {
        fileNameDisplay.textContent = name;
        fileNameDisplay.classList.remove('hidden');
    }
}

function showLoading() {
    const button = document.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner mr-2"></span>Analyzing...';
    }
}

function hideLoading() {
    const button = document.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = false;
        button.innerHTML = 'Check Resume';
    }
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

// Helper function to parse resume text
function parseResumeText(text) {
    // In a real application, this would use NLP to extract information
    return {
        skills: [],
        experience: [],
        education: [],
        contact: {}
    };
}

// Helper function to match resume with job requirements
function matchWithJob(resumeData, jobTitle) {
    // In a real application, this would use AI/ML to match resume with job requirements
    return {
        score: 0,
        matches: [],
        gaps: []
    };
}