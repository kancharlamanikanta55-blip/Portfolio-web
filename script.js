document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const taglineElement = document.getElementById('tagline');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxOverlay = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const navLinks = document.querySelectorAll('nav a'); 
    
    const setNavActiveState = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            
            const linkPath = link.getAttribute('href');

            if (linkPath === currentPath) {
                link.classList.add('active-nav');
            }
            
            if (currentPath === 'index.html' && linkPath === 'index.html') {
                 link.classList.add('active-nav');
            }
        });
    };
    
    setNavActiveState();
    
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        body.setAttribute('data-theme', storedTheme);
        themeToggle.textContent = storedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.classList.add('theme-transition');
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeToggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 500);
    });

    if (taglineElement) {
        const text = taglineElement.textContent.trim();
        taglineElement.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; 
            span.style.animationDelay = `${0.03 * index + 1}s`; 
            taglineElement.appendChild(span);
        });
    }

    
    const openLightbox = (src, caption) => {
        lightboxImage.src = src;
        lightboxCaption.textContent = caption;
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeLightbox = () => {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            const imgCaption = item.getAttribute('data-caption');
            openLightbox(imgSrc, imgCaption);
        });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxOverlay?.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay?.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.05
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });


});