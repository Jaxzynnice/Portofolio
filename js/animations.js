// Advanced animations and scroll effects
class AnimationManager {
    constructor() {
        this.initScrollReveal();
        this.initParallax();
        this.initNumberCounter();
    }
    
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.glass-card, .skill-card, .project-card, .hero-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }
    
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.bg-bubble');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index % 3) * 0.1;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    initNumberCounter() {
        const counters = document.querySelectorAll('.stat-card h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.innerText;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (isNaN(number)) return;
                    
                    let current = 0;
                    const increment = number / 50;
                    const updateCounter = () => {
                        if (current < number) {
                            current += increment;
                            target.innerText = Math.ceil(current) + (text.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.innerText = number + (text.includes('+') ? '+' : '');
                        }
                    };
                    updateCounter();
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
    
    // Add floating animation to icons
    const floatingIcons = document.querySelectorAll('.skill-icon, .project-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animation = `floatIcon ${2 + index % 3}s ease-in-out infinite`;
    });
});

// Add floating animation style
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes floatIcon {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-notification {
        animation: slideIn 0.3s ease;
    }
`;

document.head.appendChild(animationStyles);
