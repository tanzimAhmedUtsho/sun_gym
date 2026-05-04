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
const resultCard = document.getElementById("bmi-result-card");
const bmiValDisplay = document.getElementById("bmi-val");
const bmiStatusDisplay = document.getElementById("bmi-status");

calcBtn.addEventListener("click", () => {
  const h = parseFloat(document.getElementById("height").value);
  const w = parseFloat(document.getElementById("weight").value);

  if (h > 0 && w > 0) {
    const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);

    resultCard.classList.remove("hidden");
    bmiValDisplay.innerText = bmi;

    let status = "";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi < 24.9) status = "Healthy Weight";
    else if (bmi < 29.9) status = "Overweight";
    else status = "Obese";

    bmiStatusDisplay.innerText = status;

    // Smooth scroll to result on mobile
    if (window.innerWidth < 768) {
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    alert("Please enter valid height and weight values.");
  }
});
