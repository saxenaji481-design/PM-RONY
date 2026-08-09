(function() {
    'use strict';

    // ---- 1. TILT EFFECT ----
    const card = document.getElementById('mainCard');
    let isMobile = window.innerWidth < 768;

    function handleTilt(e) {
        if (isMobile) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = y * -3;
        const rotateY = x * 3;
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

    // ---- 2. RESIZE HANDLER ----
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

    // ---- 3. LINK CLICK TRACKING ----
    const allLinks = document.querySelectorAll('.link-btn, .more-info a, .email-row a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList.contains('youtube') ? 'YouTube' :
                this.classList.contains('kick') ? 'KICK' :
                this.classList.contains('discord') ? 'Discord' :
                this.classList.contains('instagram') ? 'Instagram' :
                this.classList.contains('video') ? 'VideoTutorial' :
                'Other';
            console.log(`🔗 PM RONNY: ${platform} link clicked → ${this.href}`);
        });
    });

    // ---- 4. CONSOLE GREETING ----
    console.log('%c🎮 PM RONNY · Gaming Hub', 'font-size:18px; font-weight:bold; color:#0ff;');
    console.log('%c🇮🇳 Fully Indian Gamer | Hindi Commentary', 'font-size:13px; color:#aab;');
    console.log('%c📧 mihulkumar1461@gmail.com', 'font-size:13px; color:#888;');
    console.log('%c🚀 Enjoy the neon vibe!', 'font-size:13px; color:#c084fc;');

    // ---- 5. AVATAR EASTER EGG ----
    const avatar = document.querySelector('.avatar');
    let clickCount = 0;
    avatar.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 3) {
            const inner = this.querySelector('.avatar-inner');
            const emojis = ['🔥', '⚡', '🎯', '💀', '👾', '🚀'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            inner.textContent = randomEmoji;
            inner.style.transition = 'transform 0.3s ease';
            inner.style.transform = 'scale(1.3)';
            setTimeout(() => {
                inner.style.transform = 'scale(1)';
            }, 300);
            clickCount = 0;
            console.log('🎮 Avatar easter egg triggered!');
        }
    });

    // ---- 6. VIEWS PULSE ----
    const viewsSpan = document.querySelector('.stat-item span');
    if (viewsSpan) {
        setInterval(() => {
            viewsSpan.style.transition = 'color 0.3s ease';
            viewsSpan.style.color = '#0ff';
            setTimeout(() => {
                viewsSpan.style.color = '#f0f4ff';
            }, 300);
        }, 5000);
    }

    console.log('✅ PM RONNY website loaded successfully!');
})();