document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navbar = document.getElementById("navbar")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const hamburger = document.getElementById("hamburger")
  const startupButton = document.getElementById("startup-button")
  const ctaButton = document.getElementById("cta-button")
  const navLinks = document.querySelectorAll('a[href^="#"]')
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const wallpaperBtn = document.getElementById("wallpaper-btn")
  const wallpaperInput = document.getElementById("wallpaper-input")
  const heroBackground = document.getElementById("hero-background")

  // Wallpaper functionality
  if (wallpaperBtn && wallpaperInput && heroBackground) {
    wallpaperBtn.addEventListener("click", () => {
      wallpaperInput.click()
    })

    wallpaperInput.addEventListener("change", (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          heroBackground.style.backgroundImage = `url(${e.target.result})`
          heroBackground.style.opacity = "0.3"

          // Save to localStorage for persistence
          localStorage.setItem("heroWallpaper", e.target.result)

          // Show success feedback
          showNotification("Wallpaper alterado com sucesso!", "success")
        }
        reader.readAsDataURL(file)
      } else {
        showNotification("Por favor, selecione um arquivo de imagem válido.", "error")
      }
    })

    // Load saved wallpaper on page load
    const savedWallpaper = localStorage.getItem("heroWallpaper")
    if (savedWallpaper) {
      heroBackground.style.backgroundImage = `url(${savedWallpaper})`
      heroBackground.style.opacity = "0.3"
    }
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu && hamburger) {
    mobileMenuBtn.addEventListener("click", () => {
      const isActive = mobileMenu.classList.contains("active")

      if (isActive) {
        // Close menu
        mobileMenu.classList.remove("active")
        hamburger.classList.remove("active")
        mobileMenuBtn.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("aria-hidden", "true")
        document.body.style.overflow = ""
      } else {
        // Open menu
        mobileMenu.classList.add("active")
        hamburger.classList.add("active")
        mobileMenuBtn.setAttribute("aria-expanded", "true")
        mobileMenu.setAttribute("aria-hidden", "false")
        document.body.style.overflow = "hidden"
      }
    })
  }

  // Close mobile menu when clicking on links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu && hamburger && mobileMenuBtn) {
        mobileMenu.classList.remove("active")
        hamburger.classList.remove("active")
        mobileMenuBtn.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("aria-hidden", "true")
        document.body.style.overflow = ""
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileMenu && mobileMenuBtn && hamburger) {
      const isClickInsideMenu = mobileMenu.contains(event.target)
      const isClickOnToggle = mobileMenuBtn.contains(event.target)

      if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
        hamburger.classList.remove("active")
        mobileMenuBtn.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("aria-hidden", "true")
        document.body.style.overflow = ""
      }
    }
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = navbar ? navbar.offsetHeight : 80
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

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (navbar) {
      if (currentScrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }

      // Optional: Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = "translateY(-100%)"
      } else {
        navbar.style.transform = "translateY(0)"
      }
    }

    lastScrollY = currentScrollY
  }

  // Debounce scroll handler for better performance
  let scrollTimeout
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(handleScroll, 10)
  })

  // Startup button action
  if (startupButton) {
    startupButton.addEventListener("click", () => {
      window.open("https://www.instagram.com/sunrise.assai/", "_blank");
    })
  }

  // CTA button action
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      showNotification("Entre em contato conosco para enviar sua proposta de startup!", "info")
      // You can replace this with:
      // window.location.href = 'mailto:contato@assai.pr.gov.br';
      // or open a contact form, etc.
    })
  }

  // Enhanced Social Media Functionality
  const socialIcons = document.querySelectorAll(".social-icon")

  socialIcons.forEach((icon) => {
    const platform = icon.getAttribute("data-platform")

    // Add click event with enhanced feedback
    icon.addEventListener("click", (e) => {
      e.preventDefault()

      // Add click animation
      icon.style.transform = "scale(0.9)"
      setTimeout(() => {
        icon.style.transform = ""
      }, 150)

      // Show platform-specific notification
      const messages = {
        Facebook: "Redirecionando para nossa página no Facebook...",
        Instagram: "Confira nosso Instagram para fotos e stories!",
        YouTube: "Visite nosso canal no YouTube para vídeos exclusivos!",
        WhatsApp: "Entre em contato conosco pelo WhatsApp!",
      }

      showNotification(messages[platform] || `Redirecionando para ${platform}...`, "info")

      // Here you can add actual social media links
      // Example:
      // const socialLinks = {
      //   'Facebook': 'https://facebook.com/prefeituraassai',
      //   'Instagram': 'https://instagram.com/prefeituraassai',
      //   'YouTube': 'https://youtube.com/prefeituraassai',
      //   'WhatsApp': 'https://wa.me/5543999999999'
      // }
      // window.open(socialLinks[platform], '_blank');
    })

    // Add hover sound effect (optional)
    icon.addEventListener("mouseenter", () => {
      // You can add a subtle sound effect here if desired
      // new Audio('hover-sound.mp3').play().catch(() => {});
    })
  })

  // Enhanced social icons functionality
  const enhancedSocialIcons = document.querySelectorAll(".social-icon-enhanced")

  enhancedSocialIcons.forEach((icon) => {
    // Add click event with enhanced feedback
    icon.addEventListener("click", (e) => {
      e.preventDefault()

      // Add click animation
      icon.style.transform = "scale(0.95)"
      setTimeout(() => {
        icon.style.transform = ""
      }, 150)

      // Determine platform from class
      let platform = "Rede Social"
      if (icon.classList.contains("facebook")) platform = "Facebook"
      else if (icon.classList.contains("instagram")) platform = "Instagram"
      else if (icon.classList.contains("youtube")) platform = "YouTube"
      else if (icon.classList.contains("whatsapp")) platform = "WhatsApp"

      // Redirecionamento para Instagram específico
      if (platform === "Instagram") {
        window.open("https://www.instagram.com/valedosolpr/", "_blank");
        return;
      }

      // Redirecionamento para Facebook específico
      if (platform === "Facebook") {
        window.open("https://www.facebook.com/prefeituraassai?locale=pt_BR", "_blank");
        return;
      }

      // Redirecionamento para YouTube específico
      if (platform === "YouTube") {
        window.open("https://www.youtube.com/@valedosolpr", "_blank");
        return;
      }

      // Show platform-specific notification
      const messages = {
        Facebook: "Redirecionando para nossa página no Facebook...",
        Instagram: "Confira nosso Instagram para fotos e stories!",
        YouTube: "Visite nosso canal no YouTube para vídeos exclusivos!",
        WhatsApp: "Entre em contato conosco pelo WhatsApp!",
      }

      showNotification(messages[platform] || `Redirecionando para ${platform}...`, "info")
    })

    // Add subtle hover sound effect (optional)
    icon.addEventListener("mouseenter", () => {
      // Optional: add hover sound
      // new Audio('hover-sound.mp3').play().catch(() => {});
    })
  })

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
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".startup-card, .cta-section")
  animatedElements.forEach((el) => {
    if (!el.classList.contains("fase-card")) {
      // fase-cards have their own animation
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    }
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      hamburger.classList.remove("active")
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      mobileMenu.setAttribute("aria-hidden", "true")
      document.body.style.overflow = ""
    }
  })

  // Prevent scroll when mobile menu is open
  const preventScroll = (e) => {
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      e.preventDefault()
    }
  }

  // Add touch event listeners for mobile
  document.addEventListener("touchmove", preventScroll, { passive: false })

  // Add loading class removal after page load
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger animations for elements already in view
    const elementsInView = document.querySelectorAll(".fase-card")
    elementsInView.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 100)
    })

    // Animate social icons on load
    const socialIconsLoad = document.querySelectorAll(".social-icon")
    socialIconsLoad.forEach((icon, index) => {
      setTimeout(
        () => {
          icon.style.opacity = "1"
          icon.style.transform = "translateY(0) scale(1)"
        },
        500 + index * 100,
      )
    })
  })

  // Add smooth hover effects for cards
  const cards = document.querySelectorAll(".startup-card, .fase-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })

  // Add parallax effect to hero section (optional)
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.3
      hero.style.transform = `translateY(${parallax}px)`
    })
  }

  // Add active link highlighting based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navLinksArray = Array.from(document.querySelectorAll(".nav-link"))

  const highlightNavLink = () => {
    let current = ""
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId
      }
    })

    navLinksArray.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Initialize
  highlightNavLink()

  // Social Media Analytics (optional)
  const trackSocialClick = (platform) => {
    // You can integrate with Google Analytics or other tracking services
    console.log(`Social media click tracked: ${platform}`)
    // Example: gtag('event', 'social_click', { platform: platform });
  }

  // Add social media tracking to existing click handlers
  socialIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const platform = icon.getAttribute("data-platform")
      trackSocialClick(platform)
    })
  })
})

// Utility functions
const smoothScrollTo = (element, duration = 1000) => {
  const targetPosition = element.offsetTop - (document.querySelector(".navbar")?.offsetHeight || 80) - 20
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  const ease = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

const debounce = (func, wait) => {
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

// Social Media Utilities
const socialMediaUtils = {
  // Generate share URLs
  generateShareUrl: (platform, url, text) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(text)

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    }

    return shareUrls[platform.toLowerCase()] || "#"
  },

  // Open social share popup
  openSharePopup: (url, title = "Compartilhar") => {
    const popup = window.open(url, title, "width=600,height=400,scrollbars=yes,resizable=yes")

    if (popup) {
      popup.focus()
    }
  },
}

// Export functions for potential use in other scripts
window.AppUtils = {
  smoothScrollTo,
  debounce,
  socialMediaUtils,
}

// Initialize social media icons with initial hidden state for animation
document.addEventListener("DOMContentLoaded", () => {
  const socialIcons = document.querySelectorAll(".social-icon")
  socialIcons.forEach((icon) => {
    icon.style.opacity = "0"
    icon.style.transform = "translateY(20px) scale(0.8)"
    icon.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
  })
})
