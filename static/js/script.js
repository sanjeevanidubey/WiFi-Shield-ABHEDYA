// WiFi Shield Abhedya - Advanced Frontend Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        if (icon) icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (icon) icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    // 2. Powerful Sound System
    const sounds = {
        click: 'https://www.soundjay.com/buttons/sounds/button-16.mp3',
        hover: 'https://www.soundjay.com/buttons/sounds/button-20.mp3',
        ping: 'https://www.soundjay.com/buttons/sounds/beep-07a.mp3'
    };

    function playSound(type) {
        const audio = new Audio(sounds[type]);
        audio.volume = 0.1;
        audio.play().catch(() => {}); // Catch browser blocking
    }

    // Global Click Listener for every single click on the page
    document.addEventListener('click', () => playSound('click'));

    // Hover sounds for specific interactive elements
    document.querySelectorAll('.btn-primary, .card, .article-link, .nav-links a, .theme-toggle').forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
    });

    // 3. High-Performance Neural Mesh Background
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        const particleCount = 100;
        const maxDistance = 150;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        }

        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim();
                ctx.fillStyle = accentColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim();

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        ctx.strokeStyle = accentColor;
                        ctx.lineWidth = 0.5;
                        ctx.globalAlpha = 1 - (dist / maxDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0;
            animationId = requestAnimationFrame(animate);
        }

        resize();
        animate();
    }
});
