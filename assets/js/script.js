document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------
   * Mobile Dropdown Menu & Toggle Button
   * -------------------------------------- */
  const mobileMenuBtn = document.querySelector('.hamburger');
  const mobileMenuDropdown = document.querySelector('.bottom-mobile-menu');
  const navOverlay = document.querySelector('.overlay');
  const topHeader = document.querySelector('.top-header');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }

  function toggleMenu() {
    mobileMenuDropdown.classList.toggle('active');
    navOverlay.classList.toggle('active');
    mobileMenuBtn.classList.toggle('cross');
    topHeader.classList.toggle('active');
    // Toggle body overflow based on menu state
    document.body.classList.toggle('no-scroll', mobileMenuDropdown.classList.contains('active'));
  }

  // Helper: explicitly close the mobile menu and remove no-scroll
  function closeMobileMenu() {
    mobileMenuDropdown.classList.remove('active');
    mobileMenuBtn.classList.remove('cross');
    navOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  /* ----------------
   * Header Scroll
   * ---------------- */
  const body = document.body;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    // Header class toggling based on scroll direction
    if (currentScroll <= 0) {
      body.classList.add('scroll-up');
    }
    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-up');
      body.classList.add('scroll-down');
    }
    if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-down');
      body.classList.add('scroll-up');
    }
    lastScroll = currentScroll;

    // Log scroll position (for debugging)
    console.log('Scroll Y:', window.scrollY);
  });

  /* ------------------------------
   * Mobile Dropdown Navbar Links
   * ------------------------------ */
  const navbarLinks = document.querySelectorAll('[data-navbar-link]');
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Instead of toggling, explicitly close the menu:
      closeMobileMenu();
    });
  });

  /* ---------------------
   * Phone Link Handler
   * --------------------- */
  const phoneLink = document.querySelector('.phone-icon');
  if (phoneLink) {
    phoneLink.addEventListener('click', event => {
      event.preventDefault();
      callPhoneNumber('+01904 900159');
    });
  }

  function callPhoneNumber(phoneNumber) {
    window.location.href = 'tel:' + phoneNumber;
  }

  /* -----------------------
   * Smooth Scrolling Links
   * ----------------------- */
  // Array of smooth scroll targets with desired offset (adjust offset as needed)
  const smoothScrollLinks = [
    { selector: 'a[href="#about"]', targetSelector: 'section#about', offset: -50 },
    { selector: 'a[href="#services"]', targetSelector: 'section#services', offset: -50 }
  ];
  
  smoothScrollLinks.forEach(({ selector, targetSelector, offset }) => {
    const links = document.querySelectorAll(selector);
    const target = document.querySelector(targetSelector);
    if (links.length && target) {
      links.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          // Ensure closeMobileMenu is defined and working correctly
          closeMobileMenu && closeMobileMenu();
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
      });
    }
  });
  

  /* --------------
   * Carousel Setup
   * -------------- */
  const carouselInner = document.querySelector('.testimonial-items');
  const prevBtn = document.querySelector('.carousel-controls .prev');
  const nextBtn = document.querySelector('.carousel-controls .next');
  const testimonialItems = document.querySelectorAll('.testimonial-item');

  if (carouselInner && prevBtn && nextBtn && testimonialItems.length > 0) {
    const totalItems = testimonialItems.length;
    let currentIndex = 0;

    function updateCarousel() {
      // Calculate offset based on first item's width plus a 20px gap
      const itemWidth = testimonialItems[0].offsetWidth + 20;
      const offset = -currentIndex * itemWidth;
      carouselInner.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }

  /* ----------------------------------
   * Intersection Observer for Elements
   * ---------------------------------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing once visible
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});
