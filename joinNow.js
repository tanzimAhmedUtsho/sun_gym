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
  const downloadReceiptBtn = document.getElementById("download-receipt-btn");

  let lastTransaction = null;

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
      const allCards = document.querySelectorAll(".glass-card, .bg-gym-neon");
      const priceCard = Array.from(allCards).find((card) => {
        const h3 = card.querySelector("h3");
        return (
          h3 &&
          h3.innerText.toLowerCase().trim() ===
            selectedPlan.toLowerCase().trim()
        );
      });

      if (priceCard && summaryPlan && summaryPrice) {
        const priceValElement = priceCard.querySelector(".price-val");
        const price = priceValElement ? priceValElement.innerText : "";
        const duration = isYearly ? "/yr" : "/mo";
        summaryPlan.innerText = selectedPlan.toUpperCase();
        summaryPrice.innerText = price + duration;
      }

      paymentModal.classList.remove("hidden");
    }, 1500);
  });

  // Payment Input Masking & Validation Logic
  const cardNumberInput = document.getElementById("card-number");
  const cardExpiryInput = document.getElementById("card-expiry");
  const cardCvcInput = document.getElementById("card-cvc");
  const visaIcon = document.getElementById("visa-icon");
  const mastercardIcon = document.getElementById("mastercard-icon");

  cardNumberInput?.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    // Detect card type (Visa starts with 4, Mastercard with 5)
    if (value.startsWith("4")) {
      visaIcon?.classList.remove("grayscale", "opacity-30");
      mastercardIcon?.classList.add("grayscale", "opacity-30");
    } else if (value.startsWith("5")) {
      mastercardIcon?.classList.remove("grayscale", "opacity-30");
      visaIcon?.classList.add("grayscale", "opacity-30");
    } else {
      visaIcon?.classList.add("grayscale", "opacity-30");
      mastercardIcon?.classList.add("grayscale", "opacity-30");
    }
    e.target.value = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  });

  cardExpiryInput?.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
  });

  cardCvcInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      cardNumberInput.value.length < 19 ||
      cardExpiryInput.value.length < 5 ||
      cardCvcInput.value.length < 3
    ) {
      alert("Please enter valid payment details.");
      return;
    }
    payNowBtn.classList.add("btn-loading");
    payNowBtn.disabled = true;

    // Capture data for receipt before reset
    lastTransaction = {
      name: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      plan: document.getElementById("plan").value.toUpperCase(),
      price: document.getElementById("summary-price").innerText,
      date: new Date().toLocaleDateString(),
      txId: "SG-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    };

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

  downloadReceiptBtn?.addEventListener("click", () => {
    if (!lastTransaction) return;

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { background: #0a0a0a; color: white; font-family: 'Inter', sans-serif; padding: 40px; display: flex; justify-content: center; }
          .receipt { border: 1px solid #222; padding: 40px; border-radius: 24px; width: 400px; background: #111; position: relative; overflow: hidden; }
          .neon-line { height: 4px; background: #ccff00; width: 100%; position: absolute; top: 0; left: 0; }
          .logo { font-size: 24px; font-weight: 900; font-style: italic; margin-bottom: 30px; }
          .neon { color: #ccff00; }
          .label { color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 700; margin-bottom: 20px; }
          .price { font-size: 32px; font-weight: 900; color: #ccff00; margin: 20px 0; }
          .status { display: inline-block; background: #ccff00; color: black; padding: 4px 12px; border-radius: 99px; font-size: 10px; font-weight: 900; }
          .footer { margin-top: 40px; border-top: 1px solid #222; pt: 20px; font-size: 12px; color: #444; text-align: center; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="neon-line"></div>
          <div class="logo">SUN<span class="neon">_GYM</span></div>
          
          <div class="label">Transaction ID</div>
          <div class="value">${lastTransaction.txId}</div>
          
          <div class="label">Member Name</div>
          <div class="value">${lastTransaction.name}</div>
          
          <div class="label">Selected Plan</div>
          <div class="value">${lastTransaction.plan} MEMBERSHIP</div>
          
          <div class="label">Date</div>
          <div class="value">${lastTransaction.date}</div>
          
          <div class="price">${lastTransaction.price}</div>
          <div class="status">PAID</div>
          
          <div class="footer">
            <p>PUSH YOUR LIMITS</p>
            <p>© 2023 SUN_GYM GLOBAL</p>
          </div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;

    const blob = new Blob([receiptHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SUN_GYM_Receipt_${lastTransaction.txId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        const h3 = card?.querySelector("h3");
        const planName = h3 ? h3.innerText.toLowerCase() : "";
        const planDropdown = document.getElementById("plan");
        if (planDropdown) planDropdown.value = planName;
      }

      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
});
