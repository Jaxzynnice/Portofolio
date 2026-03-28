// Tech Stack Carousel
const techIcons = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#e34c26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4' },
    { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'TypeScript', icon: 'fab fa-typescript', color: '#3178c6' },
    { name: 'Axios', icon: 'fas fa-cloud-upload-alt', color: '#5a67d8' },
    { name: 'Cheerio', icon: 'fab fa-node-js', color: '#68a063' },
    { name: 'Express', icon: 'fab fa-node-js', color: '#000000' },
    { name: 'Node.js', icon: 'fab fa-node', color: '#68a063' },
    { name: 'Bash', icon: 'fas fa-terminal', color: '#4eaa25' },
    { name: 'Shell', icon: 'fas fa-code', color: '#89e051' },
    { name: 'SQL', icon: 'fas fa-database', color: '#f29111' },
    { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47a248' }
];

let currentIndex = 0;
let autoPlayInterval;

function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track) return;
    
    // Create carousel items
    techIcons.forEach((tech, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="tech-icon" style="color: ${tech.color}">
                <i class="${tech.icon} fa-3x"></i>
            </div>
            <span class="tech-name">${tech.name}</span>
        `;
        track.appendChild(item);
    });
    
    // Create dots
    const itemsPerView = getItemsPerView();
    const totalDots = Math.ceil(techIcons.length / itemsPerView);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    updateCarousel();
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
        startAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        const maxIndex = Math.ceil(techIcons.length / getItemsPerView()) - 1;
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
        startAutoPlay();
    });
    
    // Auto play
    startAutoPlay();
    
    // Pause on hover
    const container = document.querySelector('.carousel-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        updateCarousel();
        recreateDots(dotsContainer);
    });
}

function getItemsPerView() {
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 5;
    return 7;
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const itemsPerView = getItemsPerView();
    const itemWidth = 100 / itemsPerView;
    const translateX = -(currentIndex * 100);
    
    if (track) {
        track.style.transform = `translateX(${translateX}%)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Update item width
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => {
            item.style.flex = `0 0 ${itemWidth}%`;
        });
    }
    
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function recreateDots(dotsContainer) {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const itemsPerView = getItemsPerView();
    const totalDots = Math.ceil(techIcons.length / itemsPerView);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    stopAutoPlay();
    currentIndex = index;
    updateCarousel();
    startAutoPlay();
}

function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        const maxIndex = Math.ceil(techIcons.length / getItemsPerView()) - 1;
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 3000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Add carousel styles
const carouselStyles = document.createElement('style');
carouselStyles.textContent = `
    .carousel-container {
        position: relative;
        overflow: hidden;
        padding: 2rem 0;
        margin: 2rem 0;
    }
    
    .carousel-track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        gap: 1rem;
    }
    
    .carousel-item {
        flex: 0 0 calc(100% / 7);
        text-align: center;
        padding: 1.5rem;
        transition: all 0.3s ease;
    }
    
    .carousel-item:hover {
        transform: translateY(-5px);
    }
    
    .tech-icon {
        font-size: 3rem;
        margin-bottom: 0.75rem;
        transition: transform 0.3s ease;
    }
    
    .carousel-item:hover .tech-icon {
        transform: scale(1.1);
    }
    
    .tech-name {
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
    }
    
    .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(74, 158, 255, 0.3);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(74, 158, 255, 0.5);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .carousel-btn:hover {
        background: rgba(74, 158, 255, 0.6);
        transform: translateY(-50%) scale(1.05);
    }
    
    .prev-btn {
        left: 0;
    }
    
    .next-btn {
        right: 0;
    }
    
    .carousel-dots {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 2rem;
    }
    
    .carousel-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(74, 158, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .carousel-dot.active {
        background: var(--ice-blue);
        width: 24px;
        border-radius: 10px;
    }
    
    @media (max-width: 1024px) {
        .carousel-item {
            flex: 0 0 calc(100% / 5);
        }
    }
    
    @media (max-width: 768px) {
        .carousel-item {
            flex: 0 0 calc(100% / 3);
        }
    }
`;

document.head.appendChild(carouselStyles);

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', initCarousel);
