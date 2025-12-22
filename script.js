// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const menuLinks = mobileMenu.querySelectorAll("a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Accordion Functionality
const accordionCards = document.querySelectorAll(".accordion-card");

accordionCards.forEach((card) => {
  const header = card.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    // Close all other cards
    accordionCards.forEach((otherCard) => {
      if (otherCard !== card && otherCard.classList.contains("active")) {
        otherCard.classList.remove("active");
      }
    });

    // Toggle current card
    card.classList.toggle("active");
  });
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header hide/show on scroll with debouncing
let lastScrollY = window.pageYOffset;
const header = document.querySelector("header");

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Scroll handler
function handleScroll() {
  const currentScrollY = window.pageYOffset;

  // Only hide header if scrolled down more than 100px
  if (currentScrollY > 100) {
    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide header
      header.classList.add("hidden");
    } else {
      // Scrolling up - show header
      header.classList.remove("hidden");
    }
  } else {
    // Near top - always show header
    header.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;

  // Parallax effect for hero section (subtle)
  const hero = document.querySelector(".hero");
  if (hero && currentScrollY < window.innerHeight) {
    hero.style.backgroundPositionY = currentScrollY * 0.5 + "px";
  }
}

// Apply debounced scroll handler with passive listener
window.addEventListener("scroll", debounce(handleScroll, 10), {
  passive: true,
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
  ".diagram-node, .highlight-card, .accordion-card"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});

// CTA Button click handler
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    // Scroll to services section or open contact form
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }

    // Add a pulse animation
    ctaButton.style.animation = "pulse 0.5s ease-out";
    setTimeout(() => {
      ctaButton.style.animation = "";
    }, 500);
  });
}

// Add pulse animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);
