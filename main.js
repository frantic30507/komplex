document.addEventListener("DOMContentLoaded", () => {
    
    // =====================================================================
    // 0. ПЛАВНЫЙ СКРОЛЛ (LENIS) - БЫСТРЫЙ И ОТЗЫВЧИВЫЙ
    // =====================================================================
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            lerp: 0.15, // Скорость остановки: чем больше, тем резче (0.15 - идеально)
            wheelMultiplier: 1.5, // Сильнее прокручивает страницу за один щелчок мыши
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        if (typeof gsap !== 'undefined') {
            gsap.ticker.add((time)=>{
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    }

    // =====================================================================
    // 1. УМНАЯ ШАПКА
    // =====================================================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // =====================================================================
    // 2. МОБИЛЬНОЕ МЕНЮ
    // =====================================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // =====================================================================
    // 3. СЛАЙДЕР SWIPER (ПОРТФОЛИО)
    // =====================================================================
    if (document.querySelector('.portfolio-swiper')) {
        const swiper = new Swiper('.portfolio-swiper', {
            loop: true,
            slidesPerView: 1, 
            spaceBetween: 20, 
            autoplay: { delay: 3000, disableOnInteraction: false },
            speed: 800,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 30 }, 
                1024: { slidesPerView: 3, spaceBetween: 30 } 
            }
        });
    }

    // =====================================================================
    // 4. АНИМАЦИИ GSAP И ПАРАЛЛАКС
    // =====================================================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (document.querySelector('.hero')) {
            const tl = gsap.timeline();
            tl.to(".hero-bg", { scale: 1, duration: 3, ease: "power2.out" }, 0);
            tl.to(".header", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.8);
            tl.to(".hero-title .line", { opacity: 1, y: 0, duration: 1, stagger: 0.25, ease: "power3.out" }, 1.2);
            tl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2);
            tl.to(".hero-actions", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2.2);
            
            if (document.querySelector(".hero-image-wrapper")) {
                tl.to(".hero-image-wrapper", { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, 2.4);
            }

            // ПАРАЛЛАКС ЭФФЕКТ ФОНА
            gsap.to(".hero-bg", {
                yPercent: 35, 
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // ПАРАЛЛАКС ЭФФЕКТ КОНТЕНТА
            gsap.to(".hero-content", {
                y: -150, 
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        const animateSection = (sectionId, itemsClass) => {
            if (document.getElementById(sectionId)) {
                gsap.from(`#${sectionId} .section-header`, {
                    scrollTrigger: { trigger: `#${sectionId}`, start: "top 80%" },
                    y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
                });

                gsap.from(`#${sectionId} ${itemsClass}`, {
                    scrollTrigger: { trigger: `#${sectionId} .section-header`, start: "top 70%" },
                    y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
                });
            }
        };

        animateSection("about", ".adv-card");
        animateSection("catalog", ".cat-card");

        if (document.getElementById("portfolio")) {
            gsap.from("#portfolio .section-header", { scrollTrigger: { trigger: "#portfolio", start: "top 80%" }, y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
            gsap.from(".portfolio-swiper", { scrollTrigger: { trigger: "#portfolio", start: "top 70%" }, y: 40, opacity: 0, duration: 1, ease: "power3.out" });
        }

        if (document.querySelector('.timeline')) {
            gsap.from("#process .section-header", { scrollTrigger: { trigger: "#process", start: "top 80%" }, y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
            gsap.from(".timeline-item", { scrollTrigger: { trigger: ".timeline", start: "top 70%" }, x: -30, opacity: 0, duration: 0.8, stagger: 0.3, ease: "power3.out" });
            gsap.to(".timeline-line-active", { scrollTrigger: { trigger: ".timeline", start: "top 60%", end: "bottom 80%", scrub: 1 }, height: "100%", ease: "none" });
        }

        if (document.querySelector('.contacts')) {
            gsap.from(".contact-info", { scrollTrigger: { trigger: ".contacts", start: "top 80%" }, x: -50, opacity: 0, duration: 1, ease: "power3.out" });
            gsap.from(".contact-form-wrapper", { scrollTrigger: { trigger: ".contacts", start: "top 80%" }, x: 50, opacity: 0, duration: 1, ease: "power3.out" });
        }
    }

    // =====================================================================
    // 5. ВСПЛЫВАЮЩЕЕ ОКНО ДЛЯ ФОРМЫ (СТРАНИЦЫ КАТАЛОГА)
    // =====================================================================
    const modal = document.getElementById('orderModal');
    const closeModalBtn = document.getElementById('closeModal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const modalSubtitle = document.getElementById('modalProductName');
    const hiddenInput = document.getElementById('hiddenProductInput');

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = this.getAttribute('data-product');
                if (modalSubtitle) modalSubtitle.innerText = "Вы выбрали / Ви обрали: " + productName;
                if (hiddenInput) hiddenInput.value = productName;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => { 
                modal.classList.remove('active'); 
                document.body.style.overflow = 'auto'; 
            });
        }

        modal.addEventListener('click', (e) => { 
            if (e.target === modal) { 
                modal.classList.remove('active'); 
                document.body.style.overflow = 'auto'; 
            } 
        });
    }

    // =====================================================================
    // 6. ЛАЙТБОКС: УВЕЛИЧЕНИЕ ФОТО (СТРАНИЦЫ КАТАЛОГА)
    // =====================================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const productImages = document.querySelectorAll('.product-img-wrapper');

    if (lightbox && lightboxImg) {
        productImages.forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    lightboxImg.src = imgElement.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; 
                }
            });
        });

        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // =====================================================================
    // 7. УМНЫЙ ПЕРЕХОД ПО ЯКОРЯМ С ДРУГИХ СТРАНИЦ
    // =====================================================================
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 500); 
            }
        }
    });

});