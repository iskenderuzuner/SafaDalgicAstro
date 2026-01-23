document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MOBİL MENÜ MANTIĞI ---
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuList = document.getElementById('menuList');
    const menuOverlay = document.getElementById('menuOverlay');

    function toggleMenu() {
        menuList.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    }

    if(menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if(menuClose) menuClose.addEventListener('click', toggleMenu);
    if(menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

    // --- 2. HİZMETLERİMİZ ACCORDION (SADECE MOBİL İÇİN) ---
    const servicesLink = document.getElementById('servicesLink');
    const dropdownContent = document.querySelector('.dropdown-content');

    if(servicesLink) {
        servicesLink.addEventListener('click', function(e) {
            // 1024px ve altı (Tablet & Mobil) için tıklama ile aç/kapat
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdownContent.classList.toggle('show');
                const icon = this.querySelector('i');
                if(icon) {
                     icon.classList.toggle('fa-chevron-down');
                     icon.classList.toggle('fa-chevron-up');
                }
            }
        });
    }

    // Slider Fonksiyonları
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    let currentSlide = 0;

    // Eğer slider yoksa fonksiyonu durdur (Hata vermemesi için)
    if (slides.length === 0) return;

    function showSlide(index) {
        // Slayt sınırlarını kontrol et
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Aktif sınıfını yönet
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }

    // Buton Dinleyicileri (Varsa ekle)
    if (nextBtn) {
        nextBtn.onclick = function() {
            showSlide(currentSlide + 1);
        };
    }

    if (prevBtn) {
        prevBtn.onclick = function() {
            showSlide(currentSlide - 1);
        };
    }

    // Otomatik Geçiş (5 Saniye)
    // Eğer otomatik dönmesini istemiyorsan alttaki 3 satırı silebilirsin
    if (slides.length > 1) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
}

// Astro Sayfa Geçişlerinde Çalışması İçin (View Transitions)
document.addEventListener('astro:page-load', initHeroSlider);

// Sayfa İlk Yüklendiğinde Çalışması İçin
document.addEventListener('DOMContentLoaded', initHeroSlider);

    // --- 4. YORUMLAR SLIDER ---
    const track = document.getElementById('testimonialSlider');
    if(track) {
        const slides = Array.from(track.children);
        const dotsContainer = document.getElementById('sliderDots');
        let currentSlideIndex = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        function moveToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            currentSlideIndex = index;
            updateDots(currentSlideIndex);
        }

        window.moveSlider = function(direction) {
            moveToSlide(currentSlideIndex + direction);
        };
    }
});