// GSAP Animations and Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP
  let gsap
  let ScrollTrigger
  let TextPlugin
  if (typeof window !== "undefined") {
    gsap = window.gsap
    ScrollTrigger = window.ScrollTrigger
    TextPlugin = window.TextPlugin
  }
  gsap.registerPlugin(ScrollTrigger, TextPlugin)

  // Simple cursor effect
  const cursor = document.querySelector(".cursor")

  // Text Scramble Effect
  class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = "!<>-_\\/[]{}—=+*^?#________"
      this.update = this.update.bind(this)
    }

    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => (this.resolve = resolve))
      this.queue = []

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ""
        const to = newText[i] || ""
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }

      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }

    update() {
      let output = ""
      let complete = 0

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]

        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }

      this.el.innerHTML = output

      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  // Initialize text scramble effect
  const phrases = [
    "Transforming the future with technology",
    "Building intelligent solutions",
    "Pioneering AI & blockchain innovation",
    "Creating tomorrow's technology today",
    "Empowering businesses with AI",
  ]

  const scrambleEl = document.getElementById("scramble-text")
  if (scrambleEl) {
    const fx = new TextScramble(scrambleEl)

    let counter = 0
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000)
      })
      counter = (counter + 1) % phrases.length
    }

    gsap.to(scrambleEl, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.3,
    })

    next()
  }

  // Enhanced cursor effects
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    })
  })

  // Add magnetic effect to buttons
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 10
      const moveY = (y - centerY) / 10

      gsap.to(this, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    })
  })

  // Add tilt effect to cards
  const cards = document.querySelectorAll(".service-card, .team-member")

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(this, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    })
  })

  // Links and buttons hover effect
  const links = document.querySelectorAll("a, button")

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "30px"
      cursor.style.height = "30px"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
    })
  })

  // Hero animations with enhanced effects
  const heroTitle = document.querySelector(".hero-title")
  gsap.to(heroTitle, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      gsap.to(heroTitle, {
        textShadow:
          "0 0 10px rgba(138, 43, 226, 0.8), 0 0 20px rgba(138, 43, 226, 0.5), 0 0 30px rgba(138, 43, 226, 0.3)",
        repeat: -1,
        yoyo: true,
        duration: 2,
      })
    },
  })

  const heroDescription = document.querySelector(".hero-description")
  const heroButtons = document.querySelector(".hero-buttons")

  gsap.to(heroDescription, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.8,
  })

  gsap.to(heroButtons, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.1,
  })

  // Typewriter effect
  const typewriterTexts = [
    "Building the Future with AI & Blockchain",
    "Transforming Businesses with Technology",
    "Creating Innovative Solutions for Tomorrow",
    "Empowering Growth with Advanced Technology",
  ]

  let currentTextIndex = 0

  function startTypewriter() {
    const currentText = typewriterTexts[currentTextIndex]

    gsap.to(heroTitle, {
      duration: 2,
      text: currentText,
      ease: "none",
      onComplete: () => {
        setTimeout(() => {
          gsap.to(heroTitle, {
            duration: 1,
            text: "",
            ease: "none",
            onComplete: () => {
              currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length
              startTypewriter()
            },
          })
        }, 3000)
      },
    })
  }

  setTimeout(startTypewriter, 2000)

  // Initialize cart
  const cart = {
    items: [],
    total: 0,
  }

  // DOM Elements
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")
  const cartIcon = document.querySelector(".cart-icon")
  const miniCart = document.getElementById("mini-cart")
  const miniCartClose = document.getElementById("mini-cart-close")
  const miniCartItems = document.getElementById("mini-cart-items")
  const cartCount = document.getElementById("cart-count")
  const cartTotal = document.getElementById("cart-total")
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart")
  const chatbotToggle = document.getElementById("chatbot-toggle")
  const chatbotWindow = document.getElementById("chatbot-window")
  const chatbotClose = document.getElementById("chatbot-close")
  const chatbotMessages = document.getElementById("chatbot-messages")
  const userInput = document.getElementById("user-input")
  const sendBtn = document.getElementById("send-btn")
  const heroParticles = document.getElementById("hero-particles")

  // GSAP Typewriter Effect
  // Import GSAP (if using a module bundler) or ensure it's loaded in your HTML
  // For example, if using CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
  // If using a module bundler like Webpack or Parcel:
  // import gsap from 'gsap';

  // Header scroll effect
  const mainHeader = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add("scrolled")
    } else {
      mainHeader.classList.remove("scrolled")
    }
  })

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".main-nav ul")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu &&
      navMenu.classList.contains("active") &&
      !e.target.closest(".main-nav") &&
      !e.target.closest(".mobile-menu-btn")
    ) {
      navMenu.classList.remove("active")
    }
  })

  // Dropdown menu functionality
  const dropdownToggle = document.querySelector(".dropdown-toggle")
  const dropdown = document.querySelector(".dropdown")
  const dropdownMenu = document.querySelector(".dropdown-menu")

  // For mobile devices
  if (window.innerWidth < 768 && dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault()
      dropdown.classList.toggle("active")
      dropdownMenu.classList.toggle("show")
    })
  }

  // For desktop hover effect
  if (window.innerWidth >= 768 && dropdown) {
    dropdown.addEventListener("mouseenter", () => {
      dropdownMenu.classList.add("show")
    })

    dropdown.addEventListener("mouseleave", () => {
      dropdownMenu.classList.remove("show")
    })
  }

  // Cart functionality
  if (cartIcon && miniCart) {
    // Toggle mini cart
    cartIcon.addEventListener("click", () => {
      miniCart.classList.toggle("active")
    })

    // Close mini cart
    miniCartClose.addEventListener("click", () => {
      miniCart.classList.remove("active")
    })

    // Add to cart buttons
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id")
        const name = button.getAttribute("data-name")
        const price = Number.parseFloat(button.getAttribute("data-price"))

        addToCart(id, name, price)
        showNotification(`${name} added to cart!`, "success")
      })
    })
  }

  // Add to cart function
  function addToCart(id, name, price) {
    const existingItem = cart.items.find((item) => item.id === id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.items.push({
        id,
        name,
        price,
        quantity: 1,
      })
    }

    updateCart()
  }

  // Update cart function
  function updateCart() {
    // Update cart count
    if (cartCount) {
      cartCount.textContent = cart.items.reduce((total, item) => total + item.quantity, 0)
    }

    // Update cart total
    cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
    if (cartTotal) {
      cartTotal.textContent = `$${cart.total.toFixed(2)}`
    }

    // Update cart items
    renderCartItems()
  }

  // Render cart items
  function renderCartItems() {
    if (!miniCartItems) return

    if (cart.items.length === 0) {
      miniCartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>'
      return
    }

    miniCartItems.innerHTML = ""

    cart.items.forEach((item) => {
      const cartItemElement = document.createElement("div")
      cartItemElement.classList.add("cart-item")

      cartItemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="cart-item-remove" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </div>
      `

      miniCartItems.appendChild(cartItemElement)
    })

    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll(".quantity-btn.decrease").forEach((button) => {
      button.addEventListener("click", () => {
        decreaseQuantity(button.getAttribute("data-id"))
      })
    })

    document.querySelectorAll(".quantity-btn.increase").forEach((button) => {
      button.addEventListener("click", () => {
        increaseQuantity(button.getAttribute("data-id"))
      })
    })

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", () => {
        removeFromCart(button.getAttribute("data-id"))
      })
    })
  }

  // Increase quantity
  function increaseQuantity(id) {
    const item = cart.items.find((item) => item.id === id)
    if (item) {
      item.quantity++
      updateCart()
    }
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    const item = cart.items.find((item) => item.id === id)
    if (item) {
      item.quantity--
      if (item.quantity === 0) {
        removeFromCart(id)
      } else {
        updateCart()
      }
    }
  }

  // Remove from cart
  function removeFromCart(id) {
    cart.items = cart.items.filter((item) => item.id !== id)
    updateCart()
  }

  // Show notification
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.classList.add("notification", type)
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Chatbot Functionality
  if (chatbotToggle && chatbotWindow) {
    // Toggle chatbot window
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.style.display = "flex"
      chatbotToggle.style.display = "none"
    })

    // Close chatbot window
    chatbotClose.addEventListener("click", () => {
      chatbotWindow.style.display = "none"
      chatbotToggle.style.display = "flex"
    })

    // Send message function
    function sendMessage() {
      const message = userInput.value.trim()
      if (message !== "") {
        // Add user message
        addMessage(message, "user")

        // Clear input
        userInput.value = ""

        // Simulate bot response after a short delay
        setTimeout(() => {
          const botResponse = getBotResponse(message)
          addMessage(botResponse, "bot")
        }, 1000)
      }
    }

    // Add message to chat
    function addMessage(message, sender) {
      const messageElement = document.createElement("div")
      messageElement.classList.add("message", sender)

      const messageContent = document.createElement("div")
      messageContent.classList.add("message-content")
      messageContent.textContent = message

      messageElement.appendChild(messageContent)
      chatbotMessages.appendChild(messageElement)

      // Scroll to bottom
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight
    }

    // Get bot response (simple AI simulation)
    function getBotResponse(message) {
      message = message.toLowerCase()

      if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        return "Hello! How can I assist you with Obsidian Technology's AI or blockchain solutions today?"
      } else if (message.includes("services") || message.includes("what do you offer")) {
        return "We offer custom AI development, blockchain solutions, cloud AI services, and enterprise integration. Which would you like to know more about?"
      } else if (message.includes("ai") || message.includes("artificial intelligence")) {
        return "Our AI solutions include custom machine learning models, natural language processing, and computer vision systems tailored to your business needs."
      } else if (message.includes("blockchain")) {
        return "We provide end-to-end blockchain application development, smart contracts, and DApp creation to secure your business processes."
      } else if (message.includes("price") || message.includes("cost") || message.includes("pricing")) {
        return "Our pricing varies based on project requirements. Would you like to schedule a consultation to discuss your specific needs?"
      } else if (message.includes("contact") || message.includes("talk to human")) {
        return "You can reach our team at contactus@obsidiantech.ai or schedule a demo through our website."
      } else {
        return "Thank you for your message. Our team will analyze your query and get back to you shortly. Is there anything specific about our AI or blockchain solutions you'd like to know?"
      }
    }

    // Send message on button click
    sendBtn.addEventListener("click", sendMessage)

    // Send message on Enter key
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  // AI Agent Interaction
  const interactBtn = document.getElementById("interact-btn")

  if (interactBtn) {
    interactBtn.addEventListener("click", () => {
      window.location.href = "https://chat.obsidiantech.ai/login.html"
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = contactForm.querySelector("button[type='submit']")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Submitting..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Create particles for hero section
  function createParticles() {
    const heroParticles = document.getElementById("hero-particles")
    if (!heroParticles) return

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      // Random size
      const size = Math.random() * 5 + 1

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1

      // Random animation duration
      const duration = Math.random() * 20 + 10

      // Set styles
      particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        animation: float ${duration}s infinite ease-in-out;
      `

      heroParticles.appendChild(particle)
    }
  }

  createParticles()

  // Add animation for float particles
  const style = document.createElement("style")
  style.innerHTML = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-20px) translateX(10px);
      }
      50% {
        transform: translateY(-10px) translateX(-10px);
      }
      75% {
        transform: translateY(-30px) translateX(5px);
      }
    }
  `
  document.head.appendChild(style)

  // Scroll animations
  const fadeElements = document.querySelectorAll(
    "section:not(.hero) h2, section:not(.hero) p, .service-card, .feature-item, .team-member, .vision, .mission",
  )

  fadeElements.forEach((element) => {
    element.classList.add("fade-in")

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => element.classList.add("active"),
      once: true,
    })
  })

  // Initialize sections with opacity 0 and transform
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = "1"
        section.style.transform = "translateY(0)"
      }
    })
  })

  sections.forEach((section) => {
    if (section !== document.querySelector(".hero")) {
      section.style.opacity = "0"
      section.style.transform = "translateY(20px)"
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    }
  })

  // Trigger scroll event once to initialize visible sections
  window.dispatchEvent(new Event("scroll"))
})
