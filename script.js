// Navbar Scroll Interaction
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("glass");
    navbar.classList.add("py-4");
    navbar.classList.remove("py-6");
  } else {
    navbar.classList.remove("glass");
    navbar.classList.add("py-6");
    navbar.classList.remove("py-4");
  }
});

// Active Link Highlighter (ScrollSpy)
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("text-gym-neon");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("text-gym-neon");
          }
        });
      }
    });
  },
  { threshold: 0.3 },
);

sections.forEach((section) => scrollSpyObserver.observe(section));

// Reveal on Scroll Logic (Intersection Observer)
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// BMI Calculator Logic
const calcBtn = document.getElementById("calc-btn");

if (calcBtn) {
  const resultCard = document.getElementById("bmi-result-card");
  const bmiValDisplay = document.getElementById("bmi-val");
  const bmiStatusDisplay = document.getElementById("bmi-status");
  const weightRangeDisplay = document.getElementById("weight-range");
  const bmiPlanDisplay = document.getElementById("bmi-plan");

  calcBtn.addEventListener("click", () => {
    const h = parseFloat(document.getElementById("height").value);
    const w = parseFloat(document.getElementById("weight").value);

    if (h > 0 && w > 0) {
      const hM = h / 100;
      const bmi = (w / (hM * hM)).toFixed(1);

      resultCard.classList.remove("hidden");
      bmiValDisplay.innerText = bmi;

      let status = "";
      let plan = "";
      if (bmi < 18.5) {
        status = "Underweight";
        plan = "Strength Training (Mass Gainer)";
      } else if (bmi < 24.9) {
        status = "Healthy Weight";
        plan = "Standard Maintenance Plan";
      } else if (bmi < 29.9) {
        status = "Overweight";
        plan = "HIIT & Cardio (Fat Burn)";
      } else {
        status = "Obese";
        plan = "Intensive 1-on-1 Coaching";
      }

      bmiStatusDisplay.innerText = status;
      bmiPlanDisplay.innerText = plan;

      const minWeight = (18.5 * hM * hM).toFixed(1);
      const maxWeight = (24.9 * hM * hM).toFixed(1);
      weightRangeDisplay.innerText = `${minWeight}kg - ${maxWeight}kg`;

      if (window.innerWidth < 768) {
        resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      alert("Please enter valid height and weight values.");
    }
  });
}

// Trainer Carousel Logic
const carousel = document.getElementById("trainer-carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (carousel && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    carousel.scrollLeft += 400;
  });
  prevBtn.addEventListener("click", () => {
    carousel.scrollLeft -= 400;
  });
}

// Booking Form Submission Logic
const bookingForm = document.getElementById("booking-form");
const successMsg = document.getElementById("success-msg");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      trainer: document.getElementById("trainer").value,
    };

    console.log("Form Submitted:", formData);

    // Transition UI
    bookingForm.classList.add("hidden");
    successMsg.classList.remove("hidden");

    // Reset Form
    bookingForm.reset();
  });
}

// Force Background Video Playback
document.addEventListener("DOMContentLoaded", () => {
  const bgVideo = document.querySelector("video");
  if (bgVideo) {
    bgVideo.play().catch(() => {
      console.log(
        "Autoplay was prevented. This usually happens in battery saver mode or specific browser settings.",
      );
    });
  }
});
