// Skeleton Loading Effect
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading time
    setTimeout(() => {
        const skeletonLoader = document.getElementById('skeletonLoader');
        const mainContent = document.getElementById('mainContent');
        
        if (skeletonLoader && mainContent) {
            skeletonLoader.style.opacity = '0';
            setTimeout(() => {
                skeletonLoader.style.display = 'none';
                mainContent.style.display = 'block';
                mainContent.style.animation = 'fadeIn 0.5s ease';
            }, 300);
        }
    }, 1500);
});

// Add skeleton styles
const skeletonStyles = document.createElement('style');
skeletonStyles.textContent = `
    .skeleton-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease;
    }
    
    .skeleton-container {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .skeleton-navbar {
        height: 70px;
        background: linear-gradient(90deg, #1e2a3a 25%, #2a3a4a 50%, #1e2a3a 75%);
        background-size: 200% 100%;
        border-radius: 40px;
        margin-bottom: 3rem;
        animation: skeletonShimmer 1.5s infinite;
    }
    
    .skeleton-hero {
        height: 400px;
        background: linear-gradient(90deg, #1e2a3a 25%, #2a3a4a 50%, #1e2a3a 75%);
        background-size: 200% 100%;
        border-radius: 32px;
        margin-bottom: 3rem;
        animation: skeletonShimmer 1.5s infinite;
    }
    
    .skeleton-skills {
        height: 300px;
        background: linear-gradient(90deg, #1e2a3a 25%, #2a3a4a 50%, #1e2a3a 75%);
        background-size: 200% 100%;
        border-radius: 32px;
        margin-bottom: 3rem;
        animation: skeletonShimmer 1.5s infinite;
    }
    
    .skeleton-projects {
        height: 350px;
        background: linear-gradient(90deg, #1e2a3a 25%, #2a3a4a 50%, #1e2a3a 75%);
        background-size: 200% 100%;
        border-radius: 32px;
        animation: skeletonShimmer 1.5s infinite;
    }
    
    @keyframes skeletonShimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(skeletonStyles);
