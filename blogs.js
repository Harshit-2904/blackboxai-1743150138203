// Sample blog data - In a real application, this would come from an API
const sampleBlogs = [
    {
        id: 1,
        title: 'How to Ace Your Job Interview',
        excerpt: 'Essential tips and strategies to help you prepare for your next job interview...',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        author: 'John Doe',
        authorImage: 'https://via.placeholder.com/40',
        date: '2024-01-20',
        readTime: '5 min read'
    },
    {
        id: 2,
        title: 'Top 10 Resume Writing Tips',
        excerpt: 'Learn how to create a compelling resume that stands out to employers...',
        image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
        author: 'Jane Smith',
        authorImage: 'https://via.placeholder.com/40',
        date: '2024-01-18',
        readTime: '4 min read'
    },
    {
        id: 3,
        title: 'Remote Work Best Practices',
        excerpt: 'Maximize your productivity and maintain work-life balance while working remotely...',
        image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
        author: 'Mike Johnson',
        authorImage: 'https://via.placeholder.com/40',
        date: '2024-01-15',
        readTime: '6 min read'
    }
];

// Load blog posts on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});

// Function to load blog posts
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    sampleBlogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogContainer.appendChild(blogCard);
    });
}

// Function to create a blog card
function createBlogCard(blog) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-lg shadow overflow-hidden';
    div.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
        <div class="p-6">
            <div class="flex items-center mb-4">
                <img src="${blog.authorImage}" alt="${blog.author}" class="w-8 h-8 rounded-full mr-3">
                <div class="text-sm">
                    <p class="font-semibold">${blog.author}</p>
                    <p class="text-gray-600">${blog.date} · ${blog.readTime}</p>
                </div>
            </div>
            <h3 class="text-xl font-semibold mb-2">${blog.title}</h3>
            <p class="text-gray-600 mb-4">${blog.excerpt}</p>
            <a href="blog${blog.id}.html" class="text-blue-600 hover:text-blue-800">Read More <i class="fas fa-arrow-right ml-1"></i></a>
        </div>
    `;
    return div;
}

// Function to create a new blog post
function createBlogPost(data) {
    // Fetch the blog template
    fetch('blog-template.html')
        .then(response => response.text())
        .then(template => {
            // Replace placeholders with actual content
            const content = template
                .replace(/{{title}}/g, data.title)
                .replace(/{{author}}/g, data.author)
                .replace(/{{author_image}}/g, data.authorImage || 'https://via.placeholder.com/40')
                .replace(/{{date}}/g, data.date)
                .replace(/{{content}}/g, data.content);

            // Save the blog post
            saveBlogPost(content, data.title);
        });
}

// Function to save blog post
function saveBlogPost(content, title) {
    // In a real application, this would make an API call to save the blog post
    console.log('Saving blog post:', title);
    
    // Update the blog list if we're on the main page
    const blogContainer = document.getElementById('blog-posts');
    if (blogContainer) {
        const newBlog = {
            id: sampleBlogs.length + 1,
            title: title,
            excerpt: 'New blog post...',
            image: 'https://via.placeholder.com/800x400',
            author: 'Admin',
            authorImage: 'https://via.placeholder.com/40',
            date: new Date().toISOString().split('T')[0],
            readTime: '5 min read'
        };
        
        const blogCard = createBlogCard(newBlog);
        blogContainer.insertBefore(blogCard, blogContainer.firstChild);
    }
}

// Function to edit blog post
function editBlogPost(blogId, data) {
    console.log(`Editing blog post ${blogId}`);
    // Implement blog post editing functionality
    // This would typically involve making an API call to update the blog post
}

// Function to delete blog post
function deleteBlogPost(blogId) {
    console.log(`Deleting blog post ${blogId}`);
    // Implement blog post deletion functionality
    // This would typically involve making an API call to delete the blog post
}

// Function to handle blog comments
function addComment(blogId, comment) {
    console.log(`Adding comment to blog ${blogId}:`, comment);
    // Implement comment functionality
    // This would typically involve making an API call to save the comment
}

// Function to handle blog likes
function toggleLike(blogId) {
    console.log(`Toggling like for blog ${blogId}`);
    // Implement like functionality
    // This would typically involve making an API call to toggle the like status
}

// Function to share blog post
function shareBlogPost(blogId, platform) {
    console.log(`Sharing blog ${blogId} on ${platform}`);
    // Implement sharing functionality
    // This would typically involve opening a share dialog for the selected platform
}

// Function to search blogs
function searchBlogs(query) {
    const filteredBlogs = sampleBlogs.filter(blog => {
        return (
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(query.toLowerCase())
        );
    });

    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    blogContainer.innerHTML = '';
    filteredBlogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogContainer.appendChild(blogCard);
    });
}