
// MOBILE DROPDOWN MENU & TOGGLE BUTTON

const mobileMenuBtn = document.querySelector(".hamburger");
const mobileMenuDropdown = document.querySelector(".bottom-mobile-menu");
const navOverlay = document.querySelector(".overlay");
const topHeader = document.querySelector(".top-header");

mobileMenuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  mobileMenuDropdown.classList.toggle("active");
  navOverlay.classList.toggle("active");
  mobileMenuBtn.classList.toggle("cross");
  topHeader.classList.toggle("active");

  // Toggle a class on the body to handle overflow
  document.body.classList.toggle("no-scroll", mobileMenuDropdown.classList.contains("active"));
}






// HEADER SCROLL
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.add("scroll-up");
  }
  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }
  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
})


//  MOBILE DROP DOWN MENU
const navbarLinks = document.querySelectorAll("[data-navbar-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    mobileMenuDropdown.classList.toggle("active");
    mobileMenuBtn.classList.toggle("cross");
    
    navOverlay.classList.remove("active");
    

  });
}


document.addEventListener('DOMContentLoaded', function () {
  // Wait for the DOM to be fully loaded before attaching the event listener.

  // Get the phone link element by its class name.
  let phoneLink = document.querySelector('.phone-icon');

  // Check if the phone link element exists.
  if (phoneLink) {
      // Attach a click event listener to the phone link.
      phoneLink.addEventListener('click', function (event) {
          // Prevent the default behavior of the anchor tag (preventing the navigation).
          event.preventDefault();
          
          // Call the function with the desired phone number.
          callPhoneNumber('+01904 900159');
      });
  }
});

function callPhoneNumber(phoneNumber) {
  // Open the phone dialer with the specified phone number.
  window.location.href = 'tel:' + phoneNumber;
}


// SMOOTH SCROLLING

document.querySelector('a[href="#about"]').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    
    const offset = -200; // Adjust this value to scroll further up
    const target = document.getElementById('about');
    
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
  
  
  // CAROUSEL
  document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.querySelector('.testimonial-items');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const totalItems = testimonialItems.length;
    let currentIndex = 0;
  
    function updateCarousel() {
      // Get the width of a single testimonial item including the gap
      const itemWidth = testimonialItems[0].offsetWidth + 20; // 20px gap
  
      // Calculate offset based on index
      const offset = -currentIndex * itemWidth;
  
      // Apply transform
      carouselInner.style.transform = `translateX(${offset}px)`;
    }
  
    prevBtn.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalItems - 1; // Loop back to last item
      }
      updateCarousel();
    });
  
    nextBtn.addEventListener('click', function () {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to first item
      }
      updateCarousel();
    });
  });
  
  
  
  
