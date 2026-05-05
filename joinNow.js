document.addEventListener("DOMContentLoaded", () => {
  // Preloader Logic
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    }, 800);
  });

  // Reveal on Scroll Logic
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Pricing Toggle Logic
  const toggleBtn = document.getElementById("price-toggle");
  const toggleCircle = document.getElementById("toggle-circle");
  const priceVals = document.querySelectorAll(".price-val");
  const durationTexts = document.querySelectorAll(".duration-text");
  let isYearly = false;

  toggleBtn.addEventListener("click", () => {
    isYearly = !isYearly;
    if (isYearly) {
      toggleCircle.style.transform = "translateX(1.5rem)";
      priceVals.forEach((p) => (p.innerText = `$${p.dataset.yearly}`));
      durationTexts.forEach((d) => (d.innerText = "/yr"));
    } else {
      toggleCircle.style.transform = "translateX(0)";
      priceVals.forEach((p) => (p.innerText = `$${p.dataset.monthly}`));
      durationTexts.forEach((d) => (d.innerText = "/mo"));
    }
  });

  // Testimonial Slider Logic
  const slider = document.getElementById("testimonial-slider");
  const nextTest = document.getElementById("next-test");
  const prevTest = document.getElementById("prev-test");
  let currentSlide = 0;
  const totalSlides = 3;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  nextTest.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });

  prevTest.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  // Form Validation & Submission Logic
  const joinForm = document.getElementById("join-form");
  const submitBtn = document.getElementById("submit-btn");
  const successPopup = document.getElementById("success-popup");
  const paymentModal = document.getElementById("payment-modal");
  const paymentForm = document.getElementById("payment-form");
  const payNowBtn = document.getElementById("pay-now-btn");
  const closePayment = document.getElementById("close-payment");

  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple Validation
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (phone.length < 8) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Loading Animation
    submitBtn.classList.add("btn-loading");
    submitBtn.disabled = true;

    // Transition to Payment
    setTimeout(() => {
      submitBtn.classList.remove("btn-loading");
      submitBtn.disabled = false;

      // Populate Payment Details
      const selectedPlan = document.getElementById("plan").value;
      const summaryPlan = document.getElementById("summary-plan");
      const summaryPrice = document.getElementById("summary-price");

      // Find price from the cards based on toggle state
      const priceCard = Array.from(
        document.querySelectorAll(".glass-card, .bg-gym-neon"),
      ).find(
        (card) =>
          card.querySelector("h3").innerText.toLowerCase() === selectedPlan,
      );

      if (priceCard) {
        const price = priceCard.querySelector(".price-val").innerText;
        const duration = isYearly ? "/yr" : "/mo";
        summaryPlan.innerText = selectedPlan.toUpperCase();
        summaryPrice.innerText = price + duration;
      }

      paymentModal.classList.remove("hidden");
    }, 1500);
  });

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    payNowBtn.classList.add("btn-loading");
    payNowBtn.disabled = true;

    // Simulate Payment Processing
    setTimeout(() => {
      payNowBtn.classList.remove("btn-loading");
      payNowBtn.disabled = false;
      paymentModal.classList.add("hidden");
      successPopup.classList.remove("hidden");

      joinForm.reset();
      paymentForm.reset();
    }, 2500);
  });

  closePayment.addEventListener("click", () => {
    paymentModal.classList.add("hidden");
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Smooth Scroll for "Choose Plan" buttons
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Auto-select plan in form when clicking from pricing cards
      if (this.getAttribute("href") === "#register") {
        const card =
          this.closest(".glass-card") || this.closest(".bg-gym-neon");
        const planName = card.querySelector("h3").innerText.toLowerCase();
        const planDropdown = document.getElementById("plan");
        if (planDropdown) planDropdown.value = planName;
      }

      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
});
