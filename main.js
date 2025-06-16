document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      const isActive = mobileMenu.classList.contains("active")

      if (isActive) {
        // Close menu
        mobileMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        document.body.style.overflow = ""
      } else {
        // Open menu
        mobileMenu.classList.add("active")
        mobileMenuToggle.classList.add("active")
        mobileMenuToggle.setAttribute("aria-expanded", "true")
        document.body.style.overflow = "hidden"
      }
    })
  }

  // Close mobile menu when clicking on links
  const mobileMenuLinks = document.querySelectorAll(".header-link")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu && mobileMenuToggle) {
        mobileMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        document.body.style.overflow = ""
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileMenu && mobileMenuToggle) {
      const isClickInsideMenu = mobileMenu.contains(event.target)
      const isClickOnToggle = mobileMenuToggle.contains(event.target)

      if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        document.body.style.overflow = ""
      }
    }
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  let lastScrollY = window.scrollY
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.backgroundColor = "rgba(240, 244, 249, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.backgroundColor = "#F0F4F9"
      header.style.backdropFilter = "none"
    }

    // Hide/show header on scroll (optional)
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  // Startup button action
  const startupButton = document.getElementById("startup-content")
  if (startupButton) {
    startupButton.addEventListener("click", () => {
      // You can redirect to a specific page or show more information
      alert("Em breve mais informações sobre a SunRise!")
      // window.location.href = 'startup-details.html';
    })
  }

  // CTA button action
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      // You can redirect to a contact form or email
      alert("Entre em contato conosco para enviar sua proposta de startup!")
      // window.location.href = 'mailto:contato@assai.pr.gov.br';
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".startup-card, .fase-card, .cta-section")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
      mobileMenuToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }
  })

  // Prevent scroll when mobile menu is open
  function preventScroll(e) {
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      e.preventDefault()
    }
  }

  // Add touch event listeners for mobile
  document.addEventListener("touchmove", preventScroll, { passive: false })

  // Update current year in footer
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Add loading class removal after page load
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debounce to scroll handler
  const debouncedScrollHandler = debounce(() => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.backgroundColor = "rgba(240, 244, 249, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.backgroundColor = "#F0F4F9"
      header.style.backdropFilter = "none"
    }
  }, 10)

  window.addEventListener("scroll", debouncedScrollHandler)
})

// Add some utility functions
function smoothScrollTo(element, duration = 1000) {
  const targetPosition = element.offsetTop - document.querySelector(".header").offsetHeight - 20
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

// Export functions for potential use in other scripts
window.AppUtils = {
  smoothScrollTo,
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
}
