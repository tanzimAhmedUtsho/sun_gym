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

    // Simulate API Call
    setTimeout(() => {
      submitBtn.classList.remove("btn-loading");
      successPopup.classList.remove("hidden");
      joinForm.reset();

      // Log form data
      const formData = new FormData(joinForm);
      console.log("Registration Successful:", Object.fromEntries(formData));
    }, 2000);
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Smooth Scroll for "Choose Plan" buttons
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
});
