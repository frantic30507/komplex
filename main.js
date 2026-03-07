/* ==========================================================================
   1. ПЛАВНЫЙ СКРОЛЛ СТРАНИЦЫ (LENIS)
   ========================================================================== */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ==========================================================================
   2. АНИМАЦИЯ ШАПКИ ПРИ СКРОЛЛЕ
   ========================================================================== */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ==========================================================================
   3. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР)
   ========================================================================== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* ==========================================================================
   4. СЛАЙДЕР ДЛЯ ПОРТФОЛИО (SWIPER)
   ========================================================================== */
if (document.querySelector('.portfolio-swiper')) {
    new Swiper('.portfolio-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        }
    });
}

/* ==========================================================================
   5. ВСПЛЫВАЮЩЕЕ ОКНО (МОДАЛКА ЗАКАЗА)
   ========================================================================== */
const modal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalProductName');
const hiddenInput = document.getElementById('hiddenProductInput');

// Открытие модалки
document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
            const productName = btn.getAttribute('data-product');
            // Обновляем текст в модалке
            if (modalTitle && productName) {
                modalTitle.textContent = productName;
            }
            if (hiddenInput && productName) {
                hiddenInput.value = productName;
            }
            modal.classList.add('active');
        }
    });
});

// Закрытие модалки по крестику
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Закрытие модалки при клике на темный фон
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

/* ==========================================================================
   6. УВЕЛИЧЕНИЕ ФОТО (ЛАЙТБОКС) - ИСПРАВЛЕНО
   ========================================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');

// Открытие фото
document.querySelectorAll('.product-img-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('img');
        if (img && lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        }
    });
});

// ЗАКРЫТИЕ ФОТО ПРИ КЛИКЕ В ЛЮБОЕ МЕСТО (включая саму картинку)
if (lightbox) {
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

/* ==========================================================================
   7. ИДЕАЛЬНАЯ МАСКА ДЛЯ ТЕЛЕФОНА (+38)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            // Очищаем от всего, кроме цифр
            let numbers = e.target.value.replace(/\D/g, '');
            
            // Если пользователь стер всё, оставляем пустоту
            if (!numbers) {
                e.target.value = '';
                return;
            }

            // Жестко задаем начало на 38
            if (!numbers.startsWith('38')) {
                numbers = '38' + numbers;
            }

            // Форматируем строку: +38 (0XX) XXX-XX-XX
            let formatted = '+38 ';
            if (numbers.length > 2) {
                formatted += '(' + numbers.substring(2, 5);
            }
            if (numbers.length >= 6) {
                formatted += ') ' + numbers.substring(5, 8);
            }
            if (numbers.length >= 9) {
                formatted += '-' + numbers.substring(8, 10);
            }
            if (numbers.length >= 11) {
                formatted += '-' + numbers.substring(10, 12);
            }

            e.target.value = formatted;
        });

        // При клике на поле ставим +38, если оно пустое
        input.addEventListener('focus', function(e) {
            if (e.target.value === '') {
                e.target.value = '+38 ';
            }
        });

        // Если убрал мышку и оставил только +38, очищаем поле
        input.addEventListener('blur', function(e) {
            if (e.target.value === '+38 ' || e.target.value === '+38') {
                e.target.value = '';
            }
        });
    });
});

/* ==========================================================================
   8. АНИМАЦИИ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (GSAP)
   ========================================================================== */
gsap.registerPlugin(ScrollTrigger);

// Анимация главного экрана
if (document.querySelector('.hero-title span')) {
    gsap.to('.hero-title span', { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.to('.hero-subtitle', { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" });
    gsap.to('.hero-actions', { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" });
    gsap.to('.hero-image-wrapper', { x: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: "power3.out" });
}

// Анимация появления секций
document.querySelectorAll('.section').forEach(sec => {
    gsap.from(sec, {
        scrollTrigger: {
            trigger: sec,
            start: "top 85%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// Анимация карточек преимуществ и каталога
gsap.utils.toArray('.adv-card, .cat-card, .product-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    });
});