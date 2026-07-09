// Sayfa geçişlerinde kodların uyumaması için Astro tetikleyicisi
document.addEventListener('astro:page-load', function() {
    
    // --- 1. MOBİL MENÜ MANTIĞI ---
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuList = document.getElementById('menuList');
    const menuOverlay = document.getElementById('menuOverlay');

    function toggleMenu() {
        if(menuList) menuList.classList.toggle('active');
        if(menuOverlay) menuOverlay.classList.toggle('active');
    }

    if(menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if(menuClose) menuClose.addEventListener('click', toggleMenu);
    if(menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

    // --- 2. HİZMETLERİMİZ ACCORDION (SADECE MOBİL İÇİN) ---
    const servicesLink = document.getElementById('servicesLink');
    const dropdownContent = document.querySelector('.dropdown-content');

    if(servicesLink && dropdownContent) {
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

    // --- 3. ANA SAYFA HERO SLIDER ---
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');
    let currentHeroSlide = 0;
    let heroInterval;
    
    function showHeroSlide(index) {
        if (heroSlides.length === 0) return;
        
        // Sınır kontrolü
        if (index >= heroSlides.length) currentHeroSlide = 0;
        else if (index < 0) currentHeroSlide = heroSlides.length - 1;
        else currentHeroSlide = index;

        // Hepsinden active class'ını sil ve sadece seçili olana ekle
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[currentHeroSlide].classList.add('active');
    }

    if(heroNextBtn) {
        heroNextBtn.addEventListener('click', () => {
            showHeroSlide(currentHeroSlide + 1);
            resetHeroInterval();
        });
    }
    if(heroPrevBtn) {
        heroPrevBtn.addEventListener('click', () => {
            showHeroSlide(currentHeroSlide - 1);
            resetHeroInterval();
        });
    }

    function resetHeroInterval() {
        clearInterval(heroInterval);
        if (heroSlides.length > 1) {
            heroInterval = setInterval(() => {
                showHeroSlide(currentHeroSlide + 1);
            }, 5000);
        }
    }
    
    // Slider varsa otomatik geçişi başlat
    if (heroSlides.length > 0) {
        resetHeroInterval();
    }

    // --- 4. YORUMLAR SLIDER ---
    const track = document.getElementById('testimonialSlider');
    if(track) {
        const slides = Array.from(track.children);
        const dotsContainer = document.getElementById('sliderDots');
        let currentSlideIndex = 0;

        // Geçişlerde noktaların üst üste binmesini engellemek için temizle
        if (dotsContainer) dotsContainer.innerHTML = '';

        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
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