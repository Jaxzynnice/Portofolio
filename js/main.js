// Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTypingEffect();
    initSkillBars();
    initProjects();
    initChatSimulation();
    initButtons();
    initMobileNav();
    initCursorEffects();
    initBackgroundBubbles();
});

// Typing Effect
function initTypingEffect() {
    const roles = [
        "WhatsApp Bot Architect",
        "Web Scraping Engineer",
        "REST API Specialist",
        "Web Hunter",
        "Node.js Automation Expert"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.querySelector('.typed-text');
    
    if (!typedElement) return;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 500);
                return;
            }
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    
    typeEffect();
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Projects Data
const projectsData = [
    {
        icon: 'fab fa-whatsapp',
        iconClass: 'whatsapp',
        title: 'WA MegaBot Engine',
        description: 'High-performance WhatsApp bot with AI responses, group management, auto-reply, and custom API integration. Used by 200+ communities.',
        tech: ['Node.js', 'Baileys', 'MongoDB', 'Redis']
    },
    {
        icon: 'fas fa-spider',
        iconClass: 'scrape',
        title: 'ScrapeMaster JS',
        description: 'Headless browser scraper that extracts e-commerce data, bypasses bot protection, and outputs structured JSON with proxy rotation.',
        tech: ['Puppeteer', 'Playwright', 'Cheerio', 'Express']
    },
    {
        icon: 'fas fa-network-wired',
        iconClass: 'hunt',
        title: 'WebHunter Recon',
        description: 'Automated OSINT & web hunting tool for subdomain discovery, endpoint enumeration, and security research.',
        tech: ['Node.js', 'Axios', 'Cheerio', 'CLI']
    }
];

function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card glass-card';
        projectCard.innerHTML = `
            <div class="project-icon ${project.iconClass}">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Chat simulation
function initChatSimulation() {
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    if (!chatMessages) return;
    
    const responses = [
        "📊 Scraping data: 150 items ditemukan!",
        "🔍 Web hunting: 12 subdomains discovered",
        "🤖 WhatsApp bot: 2.3k active sessions",
        "⚡ API Call: 200 OK - data extracted",
        "🕸️ Puppeteer: screenshot captured",
        "💾 Data saved to MongoDB successfully"
    ];
    
    let responseIndex = 0;
    
    setInterval(() => {
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message received';
            responseDiv.innerHTML = `
                <div class="message-content">${responses[responseIndex % responses.length]}</div>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            `;
            chatMessages.appendChild(responseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            responseIndex++;
        }, 1500);
    }, 8000);
}

// Button interactions
function initButtons() {
    const contactBtn = document.getElementById('contactBtn');
    const projectsBtn = document.getElementById('projectsBtn');
    const waDirect = document.getElementById('waDirect');
    const copyEmail = document.getElementById('copyEmail');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            window.open('https://wa.me/6281234567890?text=Hi%20Jaxzynnice,%20I%20saw%20your%20portfolio%20and%20interested%20in%20your%20services', '_blank');
        });
    }
    
    if (projectsBtn) {
        projectsBtn.addEventListener('click', () => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (waDirect) {
        waDirect.addEventListener('click', () => {
            window.open('https://wa.me/6281234567890?text=Hi%20Jaxzynnice,%20I%20need%20automation%20help', '_blank');
        });
    }
    
    if (copyEmail) {
        copyEmail.addEventListener('click', () => {
            navigator.clipboard.writeText('januar@jaxzynnice.dev');
            showToast('Email copied to clipboard!');
        });
    }
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(37, 211, 102, 0.9);
        backdrop-filter: blur(10px);
        color: #0a0f1e;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Mobile navigation
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Cursor effects
function initCursorEffects() {
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');
    
    if (!cursorGlow || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .glass-card, .skill-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorDot.style.background = 'var(--whatsapp-green)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'var(--ice-blue)';
        });
    });
}

// Background floating bubbles
function initBackgroundBubbles() {
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bg-bubble';
        const size = Math.random() * 100 + 30;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 20 + 's';
        bubble.style.animationDuration = 15 + Math.random() * 20 + 's';
        document.body.appendChild(bubble);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
