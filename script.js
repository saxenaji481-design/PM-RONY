(function() {
    'use strict';

    // ========================================
    // PRELOADER
    // ========================================
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 1200);
    });

    // ========================================
    // PARTICLES (Canvas)
    // ========================================
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    const opacity = (1 - dist / 180) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ========================================
    // NAVIGATION
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link update
        const sections = document.querySelectorAll('.section, .home-section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // TILT EFFECT (Desktop only)
    // ========================================
    const card = document.getElementById('mainCard');
    let isMobile = window.innerWidth < 768;

    function handleTilt(e) {
        if (isMobile) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = y * -4;
        const rotateY = x * 4;
        card.style.transform =
            `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'transform 0.06s linear';
    }

    function resetTilt() {
        if (isMobile) return;
        card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }

    if (!isMobile) {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    }

    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        if (isMobile && !wasMobile) {
            card.style.transform = 'none';
            card.style.transition = 'none';
            card.removeEventListener('mousemove', handleTilt);
            card.removeEventListener('mouseleave', resetTilt);
        } else if (!isMobile && wasMobile) {
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        }
    });

    // ========================================
    // AVATAR EASTER EGG
    // ========================================
    const avatar = document.getElementById('avatar');
    let clickCount = 0;
    avatar.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 3) {
            const inner = this.querySelector('.avatar-inner');
            const emojis = ['🔥', '⚡', '🎯', '💀', '👾', '🚀', '👽', '🤖', '🎮', '🏆'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            inner.textContent = randomEmoji;
            inner.style.transition = 'transform 0.3s ease, font-size 0.3s ease';
            inner.style.transform = 'scale(1.4)';
            setTimeout(() => {
                inner.style.transform = 'scale(1)';
            }, 300);
            clickCount = 0;
            console.log('🎮 Avatar easter egg triggered!');
        }
    });

    // ========================================
    // VIEWS COUNTER ANIMATION
    // ========================================
    const viewsSpan = document.getElementById('viewsCount');
    if (viewsSpan) {
        setInterval(() => {
            viewsSpan.style.transition = 'color 0.3s ease';
            viewsSpan.style.color = '#0ff';
            setTimeout(() => {
                viewsSpan.style.color = '#f0f4ff';
            }, 300);
        }, 5000);
    }

    // ========================================
    // COPY EMAIL
    // ========================================
    window.copyEmail = function() {
        const email = 'mihulkumar1461@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const btn = document.querySelector('.copy-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.color = '#0ff';
            btn.style.borderColor = 'rgba(0, 255, 255, 0.2)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        }).catch(() => {
            alert('Email: ' + email);
        });
    };

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // CONSOLE GREETING
    // ========================================
    console.log('%c🎮 PM RONNY · Gaming Hub', 'font-size:20px; font-weight:bold; color:#0ff;');
    console.log('%c🇮🇳 Fully Indian Gamer | Hindi Commentary', 'font-size:14px; color:#aab;');
    console.log('%c📧 mihulkumar1461@gmail.com', 'font-size:14px; color:#888;');
    console.log('%c🚀 Pro Gaming Website Loaded Successfully!', 'font-size:14px; color:#c084fc;');

    // ========================================
    // LINK CLICK TRACKING
    // ========================================
    document.querySelectorAll('.link-card, .social-icon, .footer-social a, .cta-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList.contains('youtube') ? 'YouTube' :
                this.classList.contains('kick') ? 'KICK' :
                this.classList.contains('discord') ? 'Discord' :
                this.classList.contains('instagram') ? 'Instagram' :
                this.classList.contains('video') ? 'VideoTutorial' :
                'Other';
            console.log(`🔗 PM RONNY: ${platform} link clicked → ${this.href || '#'}`);
        });
    });

    console.log('✅ PM RONNY website fully loaded!');
})();