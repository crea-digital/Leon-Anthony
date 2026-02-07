document.addEventListener("DOMContentLoaded", () => {
    const animatedSections = document.querySelectorAll(".fade-in-section");

    if (animatedSections.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Carousel
    const slides = document.querySelector('.carousel-slides') as HTMLElement;
    const prevButton = document.querySelector('.carousel-prev') as HTMLElement;
    const nextButton = document.querySelector('.carousel-next') as HTMLElement;
    const dotsContainer = document.querySelector('.carousel-dots') as HTMLElement;

    if (slides && prevButton && nextButton && dotsContainer) {
        let currentIndex = 0;
        const slideCount = slides.children.length;
        let slideInterval: number;

        // Générer les points de navigation
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        const updateCarousel = () => {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const goToSlide = (index: number) => {
            currentIndex = index;
            updateCarousel();
            resetInterval();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        };

        const startInterval = () => {
            slideInterval = window.setInterval(nextSlide, 3000); // Défilement toutes les 3 secondes
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        updateCarousel();
        startInterval();
    }

    // Image Zoom & Lightbox
    const zoomableImages = document.querySelectorAll('.image-zoom-container img');
    if (zoomableImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);

        const lightboxContent = document.createElement('img');
        lightboxContent.className = 'lightbox-content';
        lightbox.appendChild(lightboxContent);

        const closeButton = document.createElement('span');
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;';
        lightbox.appendChild(closeButton);

        zoomableImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxContent.src = (image as HTMLImageElement).src;
            });
        });

        closeButton.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = (document.getElementById('name') as HTMLInputElement).value.trim();
            const email = (document.getElementById('email') as HTMLInputElement).value.trim();
            const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

            if (name === '' || email === '' || message === '') {
                formFeedback.textContent = 'Veuillez remplir tous les champs.';
                formFeedback.style.color = 'red';
            } else {
                formFeedback.textContent = 'Merci pour votre message. Nous vous répondrons bientôt.';
                formFeedback.style.color = 'green';
                contactForm.reset();
            }
        });
    }
});
