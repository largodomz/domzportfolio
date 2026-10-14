/* ==========================================================================
   DOMINIC LARGO PORTFOLIO - TAILWIND JS LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Set Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    /* ----------------------------------------------------------------------
       1. Dynamic Typing Effect
       ---------------------------------------------------------------------- */
    const typingElement = document.getElementById('typingElement');
    const words = [
        "Web Development & Design",
        "Cybersecurity Education",
        "Digital Marketing & Funnels",
        "Business Tech Automation"
    ];
    let wordIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--; typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++; typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true; typeSpeed = 1800; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 400;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    /* ----------------------------------------------------------------------
       2. Tailwind Dark/Light Mode Toggle
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme
    if(savedTheme === 'light') {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
    }
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            if(isDark) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateThemeIcon('light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon('dark');
            }
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    /* ----------------------------------------------------------------------
       3. Navbar Scroll & Mobile Menu (Tailwind styles)
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('bg-white/70', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-slate-200', 'dark:border-slate-800');
            navbar?.classList.remove('py-5');
            navbar?.classList.add('py-3');
        } else {
            navbar?.classList.remove('bg-white/70', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-slate-200', 'dark:border-slate-800');
            navbar?.classList.remove('py-3');
            navbar?.classList.add('py-5');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isClosed = mobileMenu.style.right === '-100%' || mobileMenu.style.right === '';
            mobileMenu.style.right = isClosed ? '0' : '-100%';
            mobileToggle.querySelector('i').className = isClosed ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.right = '-100%';
            if(mobileToggle) mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    /* ----------------------------------------------------------------------
       4. Canvas Particle Network (Simplified for Tailwind view)
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeCanvas); resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 1.5 + 1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(6, 182, 212, 0.3)'; ctx.fill();
            }
        }
        for (let i = 0; i < 50; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, index) => {
                p.update(); p.draw();
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 - dist / 1200})`;
                        ctx.lineWidth = 0.8; ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* ----------------------------------------------------------------------
       5. Projects Filtering
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('filter-active');
                b.classList.add('text-slate-600', 'dark:text-slate-400');
            });
            btn.classList.add('filter-active');
            btn.classList.remove('text-slate-600', 'dark:text-slate-400');

            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) ? 'flex' : 'none';
            });
        });
    });

    /* ----------------------------------------------------------------------
       6. Counter Animation
       ---------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimatedStats) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let count = 0;
                    const speed = target / 40;
                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            stat.textContent = Math.ceil(count);
                            setTimeout(updateCount, 30);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    updateCount();
                });
                hasAnimatedStats = true;
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    /* ----------------------------------------------------------------------
       7. Modal Logic (Tailwind specific classes)
       ---------------------------------------------------------------------- */
    const modalData = {
        modal7: { title: "Doneverse.com Marketing", cat: "Automation", desc: "Built full automated sales funnels, email sequences, and membership site logic to optimize business conversions and manage leads effectively.", list: ["Automated Funnel Logic", "Email Workflow Architecture", "Copywriting & Design", "Membership Site Build"] },
        modal1: { title: "Interactive LMS", cat: "EdTech", desc: "A robust learning management system meant for remote tech education allowing live code compiling.", list: ["React & Node.js", "Live Code Environment", "Progress Metrics"] },
        modal2: { title: "Network Vulnerability Scanner", cat: "Cybersecurity", desc: "A classroom utility to demonstrate network sweeping, port discovery, and report generation safely.", list: ["Python Scripting", "NMap Integration", "CVE Reporting"] }
    };

    const projectModal = document.getElementById('projectModal');
    const modalContentScale = document.getElementById('modalContentScale');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const data = modalData[btn.getAttribute('data-modal')];
            if (data && modalBody) {
                modalBody.innerHTML = `
                    <span class="font-mono text-brand-cyan text-sm">${data.cat}</span>
                    <h3 class="font-heading text-3xl font-bold mb-4 text-slate-900 dark:text-white mt-2">${data.title}</h3>
                    <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">${data.desc}</p>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-3">Key Highlights</h4>
                    <ul class="list-disc pl-5 text-slate-600 dark:text-slate-400 mb-8 flex flex-col gap-2">
                        ${data.list.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                    <button class="w-full py-3 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" onclick="document.getElementById('modalClose').click()">Close</button>
                `;
                projectModal.classList.remove('opacity-0', 'pointer-events-none');
                projectModal.classList.add('opacity-100', 'pointer-events-auto');
                modalContentScale.classList.remove('scale-95');
                modalContentScale.classList.add('scale-100');
            }
        });
    });

    const closeModal = () => {
        projectModal.classList.add('opacity-0', 'pointer-events-none');
        projectModal.classList.remove('opacity-100', 'pointer-events-auto');
        modalContentScale.classList.add('scale-95');
        modalContentScale.classList.remove('scale-100');
    };

    modalClose?.addEventListener('click', closeModal);
    projectModal?.addEventListener('click', (e) => { if (e.target === projectModal) closeModal(); });

    /* ----------------------------------------------------------------------
       8. Form Submission Simulator
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.className = 'text-center text-sm mt-3 font-medium text-brand-cyan';
            formStatus.textContent = 'Sending message...';
            setTimeout(() => {
                formStatus.className = 'text-center text-sm mt-3 font-medium text-green-500';
                formStatus.textContent = 'Message sent successfully!';
                contactForm.reset();
            }, 1200);
        });
    }
});