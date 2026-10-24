/* ============================================
   MASTER JAVASCRIPT - EduLearn
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==========================================
    // 1. NAVIGATION & HAMBURGER
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ==========================================
    // 2. BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 3. HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 4. TESTIMONIAL SLIDER
    // ==========================================
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (prevBtn && nextBtn && testimonials.length) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);

        // Auto-slide
        let slideInterval = setInterval(nextTestimonial, 5000);

        // Pause on hover
        const slider = document.querySelector('.testimonials-slider');
        slider?.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider?.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextTestimonial, 5000);
        });
    }

    // ==========================================
    // 5. COURSE DATA & RENDERING
    // ==========================================
    const coursesData = [
        {
            id: 1,
            title: 'Full Stack Web Development',
            category: 'web',
            description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
            image: 'https://via.placeholder.com/400x250/4f46e5/ffffff?text=Web+Dev',
            price: '$49.99',
            originalPrice: '$99.99',
            rating: 4.8,
            students: 1250
        },
        {
            id: 2,
            title: 'Data Science & Machine Learning',
            category: 'data',
            description: 'Learn Python, Pandas, NumPy, Scikit-learn, and TensorFlow.',
            image: 'https://via.placeholder.com/400x250/0ea5e9/ffffff?text=Data+Science',
            price: '$59.99',
            originalPrice: '$129.99',
            rating: 4.9,
            students: 980
        },
        {
            id: 3,
            title: 'UI/UX Design Masterclass',
            category: 'design',
            description: 'Learn Figma, Adobe XD, design principles, and user research.',
            image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=UI%2FUX',
            price: '$39.99',
            originalPrice: '$89.99',
            rating: 4.7,
            students: 750
        },
        {
            id: 4,
            title: 'Digital Marketing Strategy',
            category: 'marketing',
            description: 'SEO, SEM, Social Media Marketing, Email Marketing, and Analytics.',
            image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Marketing',
            price: '$44.99',
            originalPrice: '$94.99',
            rating: 4.6,
            students: 620
        },
        {
            id: 5,
            title: 'Advanced JavaScript',
            category: 'web',
            description: 'ES6+, Promises, Async/Await, OOP, and Design Patterns.',
            image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=JavaScript',
            price: '$34.99',
            originalPrice: '$69.99',
            rating: 4.8,
            students: 890
        },
        {
            id: 6,
            title: 'Python for Beginners',
            category: 'data',
            description: 'Start your programming journey with Python from scratch.',
            image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Python',
            price: '$29.99',
            originalPrice: '$59.99',
            rating: 4.5,
            students: 2100
        }
    ];

    // Render courses function
    function renderCourses(courses, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!courses || courses.length === 0) {
            container.innerHTML = '<p class="no-results">No courses found. Try adjusting your search.</p>';
            return;
        }

        container.innerHTML = courses.map(course => `
            <div class="course-card" data-category="${course.category}">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}" loading="lazy" />
                    <span class="course-badge">${course.rating} ★</span>
                </div>
                <div class="course-body">
                    <div class="course-meta">
                        <span><i class="fas fa-users"></i> ${course.students} students</span>
                        <span><i class="fas fa-clock"></i> 40h</span>
                    </div>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-footer">
                        <span class="course-price">${course.price} <span>${course.originalPrice}</span></span>
                        <a href="#" class="btn btn-primary btn-sm">Enroll Now</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render popular courses on home page
    const popularContainer = document.getElementById('popularCourses');
    if (popularContainer) {
        renderCourses(coursesData.slice(0, 3), 'popularCourses');
    }

    // Render all courses on courses page
    const allCoursesContainer = document.getElementById('allCourses');
    if (allCoursesContainer) {
        renderCourses(coursesData, 'allCourses');

        // ==========================================
        // 6. COURSE FILTERING
        // ==========================================
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('courseSearch');
        const searchBtn = document.getElementById('searchBtn');

        function filterCourses(filter, searchTerm = '') {
            let filtered = coursesData;

            if (filter !== 'all') {
                filtered = filtered.filter(course => course.category === filter);
            }

            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase().trim();
                filtered = filtered.filter(course => 
                    course.title.toLowerCase().includes(term) ||
                    course.description.toLowerCase().includes(term)
                );
            }

            renderCourses(filtered, 'allCourses');
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                const searchTerm = searchInput?.value || '';
                filterCourses(filter, searchTerm);
            });
        });

        function handleSearch() {
            const searchTerm = searchInput?.value || '';
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            filterCourses(filter, searchTerm);
        }

        if (searchInput) {
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') handleSearch();
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', handleSearch);
        }
    }

    // ==========================================
    // 7. TEAM DATA & RENDERING
    // ==========================================
    const teamData = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Lead Instructor - Web Development',
            image: 'https://via.placeholder.com/300x300/4f46e5/ffffff?text=SJ',
            social: { linkedin: '#', twitter: '#', github: '#' }
        },
        {
            name: 'Prof. Michael Chen',
            role: 'Data Science Expert',
            image: 'https://via.placeholder.com/300x300/0ea5e9/ffffff?text=MC',
            social: { linkedin: '#', twitter: '#', github: '#' }
        },
        {
            name: 'Emily Rodriguez',
            role: 'UI/UX Design Lead',
            image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=ER',
            social: { linkedin: '#', twitter: '#', github: '#' }
        },
        {
            name: 'David Kim',
            role: 'Digital Marketing Specialist',
            image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=DK',
            social: { linkedin: '#', twitter: '#', github: '#' }
        }
    ];

    function renderTeam(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = teamData.map(member => `
            <div class="team-card">
                <img src="${member.image}" alt="${member.name}" loading="lazy" />
                <h4>${member.name}</h4>
                <span>${member.role}</span>
                <div class="team-social">
                    <a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="${member.social.github}" target="_blank"><i class="fab fa-github"></i></a>
                </div>
            </div>
        `).join('');
    }

    renderTeam('teamGrid');

    // ==========================================
    // 8. BLOG DATA & RENDERING
    // ==========================================
    const blogData = [
        {
            id: 1,
            title: '10 Tips for Learning Web Development Faster',
            excerpt: 'Discover proven strategies to accelerate your web development learning journey.',
            image: 'https://via.placeholder.com/400x250/4f46e5/ffffff?text=Blog+1',
            date: 'June 15, 2026',
            author: 'Sarah Johnson',
            category: 'Web Development'
        },
        {
            id: 2,
            title: 'The Future of AI in Education',
            excerpt: 'How artificial intelligence is transforming the way we learn and teach.',
            image: 'https://via.placeholder.com/400x250/0ea5e9/ffffff?text=Blog+2',
            date: 'June 10, 2026',
            author: 'Michael Chen',
            category: 'AI & Technology'
        },
        {
            id: 3,
            title: 'Designing User-Centric Interfaces',
            excerpt: 'Learn the principles of creating interfaces that users love and engage with.',
            image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Blog+3',
            date: 'June 5, 2026',
            author: 'Emily Rodriguez',
            category: 'UI/UX Design'
        },
        {
            id: 4,
            title: 'Digital Marketing Trends for 2026',
            excerpt: 'Stay ahead of the curve with these emerging digital marketing strategies.',
            image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Blog+4',
            date: 'May 28, 2026',
            author: 'David Kim',
            category: 'Marketing'
        },
        {
            id: 5,
            title: 'Mastering CSS Grid and Flexbox',
            excerpt: 'A comprehensive guide to modern CSS layout techniques for responsive design.',
            image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Blog+5',
            date: 'May 20, 2026',
            author: 'Sarah Johnson',
            category: 'Web Development'
        },
        {
            id: 6,
            title: 'Data Visualization with Python',
            excerpt: 'Learn how to create stunning data visualizations using Python libraries.',
            image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Blog+6',
            date: 'May 15, 2026',
            author: 'Michael Chen',
            category: 'Data Science'
        }
    ];

    let blogCount = 3; // Initially show 3 posts

    function renderBlog(count) {
        const container = document.getElementById('blogGrid');
        if (!container) return;

        const posts = blogData.slice(0, count);
        container.innerHTML = posts.map(post => `
            <div class="blog-card">
                <img src="${post.image}" alt="${post.title}" loading="lazy" />
                <div class="blog-card-body">
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>
        `).join('');
    }

    renderBlog(blogCount);

    // Load more blog posts
    const loadMoreBtn = document.getElementById('loadMoreBlog');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            blogCount = Math.min(blogCount + 3, blogData.length);
            renderBlog(blogCount);
            if (blogCount >= blogData.length) {
                this.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 9. CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const contactFeedback = document.getElementById('contactFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('fullName')?.value.trim();
            const email = document.getElementById('emailAddress')?.value.trim();
            const subject = document.getElementById('subjectLine')?.value.trim();
            const message = document.getElementById('messageContent')?.value.trim();

            // Simple validation
            if (!name || !email || !subject || !message) {
                showFeedback(contactFeedback, 'Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFeedback(contactFeedback, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate sending
            showFeedback(contactFeedback, 'Thank you! Your message has been sent successfully.', 'success');
            this.reset();

            // Clear feedback after 5 seconds
            setTimeout(() => {
                contactFeedback.style.display = 'none';
                contactFeedback.className = 'form-feedback';
            }, 5000);
        });
    }

    // ==========================================
    // 10. AUTH FORMS (Login/Signup)
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginFeedback = document.getElementById('loginFeedback');
    const signupFeedback = document.getElementById('signupFeedback');

    // Tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    if (authTabs.length) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                authTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const tabName = this.getAttribute('data-tab');
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                document.getElementById(tabName + 'Form')?.classList.add('active');
            });
        });
    }

    // Switch between login and signup
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.auth-tab[data-tab="signup"]')?.click();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.auth-tab[data-tab="login"]')?.click();
        });
    }

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail')?.value.trim();
            const password = document.getElementById('loginPassword')?.value.trim();

            if (!email || !password) {
                showFeedback(loginFeedback, 'Please enter both email and password.', 'error');
                return;
            }

            // Simulate login (store in localStorage)
            localStorage.setItem('user', JSON.stringify({ email, loggedIn: true }));
            showFeedback(loginFeedback, 'Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Signup form
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName')?.value.trim();
            const email = document.getElementById('signupEmail')?.value.trim();
            const password = document.getElementById('signupPassword')?.value;
            const confirm = document.getElementById('signupConfirm')?.value;

            if (!name || !email || !password || !confirm) {
                showFeedback(signupFeedback, 'Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFeedback(signupFeedback, 'Please enter a valid email address.', 'error');
                return;
            }

            if (password.length < 6) {
                showFeedback(signupFeedback, 'Password must be at least 6 characters.', 'error');
                return;
            }

            if (password !== confirm) {
                showFeedback(signupFeedback, 'Passwords do not match.', 'error');
                return;
            }

            // Simulate signup
            localStorage.setItem('user', JSON.stringify({ name, email, loggedIn: true }));
            showFeedback(signupFeedback, 'Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // ==========================================
    // 11. TOGGLE PASSWORD VISIBILITY
    // ==========================================
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            }
        });
    });

    // ==========================================
    // 12. NEWSLETTER FORM
    // ==========================================
    const newsletterForms = document.querySelectorAll('#newsletterForm');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                alert('Thank you for subscribing to our newsletter!');
                input.value = '';
            }
        });
    });

    // ==========================================
    // 13. UTILITY FUNCTIONS
    // ==========================================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFeedback(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = 'form-feedback ' + type;
        element.style.display = 'block';
    }

    // ==========================================
    // 14. SCROLL ANIMATION (Intersection Observer)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const animateElements = document.querySelectorAll('[data-aos]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    // ==========================================
    // 15. CHECK LOGIN STATUS
    // ==========================================
    const userData = JSON.parse(localStorage.getItem('user'));
    const navMenuAuth = document.querySelector('.nav-menu');
    if (userData && userData.loggedIn) {
        // Add a logout option if logged in
        const loginLink = document.querySelector('.btn-nav');
        if (loginLink && loginLink.textContent.trim() === 'Login') {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
    }

    console.log('EduLearn Website Loaded Successfully! 🚀');
});