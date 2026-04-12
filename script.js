// ================= ELEMENTS =================
const navbar = document.querySelector(".navbar");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-center");

// ================= NAVBAR SCROLL =================
function handleNavbar(){
  if(!navbar) return;

  if(window.scrollY > 50){
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// ================= SCROLL REVEAL (ALL IN ONE) =================
const reveals = document.querySelectorAll(".reveal, .service-card");

function handleReveal(){
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el, index) => {
    const rect = el.getBoundingClientRect();

    if(rect.top < triggerBottom){
      el.classList.add("active");

      // 🔥 stagger effect for service cards
      if(el.classList.contains("service-card")){
        el.style.transitionDelay = `${index * 0.06}s`;
      }
    }
  });
}

// ================= SCROLL EVENT =================
window.addEventListener("scroll", () => {
  handleNavbar();
  handleReveal();
});

// run once
handleReveal();


// ================= MOBILE MENU =================
if(toggle && nav){
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ================= CLOSE MENU =================
document.querySelectorAll(".nav-center a").forEach(link => {
  link.addEventListener("click", () => {
    if(nav){
      nav.classList.remove("active");
    }
  });
});


// ================= PORTFOLIO TILT =================
document.querySelectorAll(".portfolio-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 6;
    const rotateY = (x / rect.width - 0.5) * -6;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  });

});


// ================= TESTIMONIAL TILT =================
document.querySelectorAll(".testimonial-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 5;
    const rotateY = (x / rect.width - 0.5) * -5;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  });

});


// ================= CONTACT REVEAL =================
const contactSection = document.querySelector(".contact");

function revealContact(){
  const triggerBottom = window.innerHeight * 0.85;

  if(contactSection){
    const rect = contactSection.getBoundingClientRect();

    if(rect.top < triggerBottom){
      contactSection.classList.add("active");
    }
  }
}

window.addEventListener("scroll", revealContact);
revealContact();


// ================= FORM HANDLING =================
const form = document.querySelector(".contact-form");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const button = form.querySelector("button");
    const inputs = form.querySelectorAll("input, textarea");

    let isValid = true;

    inputs.forEach(input => {
      if(input.hasAttribute("required") && input.value.trim() === ""){
        input.style.borderColor = "#ff3b30";
        isValid = false;
      } else {
        input.style.borderColor = "rgba(255,255,255,.08)";
      }
    });

    if(!isValid) return;

    button.innerText = "Sending...";
    button.disabled = true;

    setTimeout(() => {
      button.innerText = "Message Sent ✓";
      form.reset();

      setTimeout(() => {
        button.innerText = "Send Message";
        button.disabled = false;
      }, 2000);

    }, 1500);
  });
}


// ================= COUNTER =================
const counters = document.querySelectorAll(".counter");

function runCounter(){
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const increment = target / 80;

    const update = () => {
      count += increment;

      if(count < target){
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + "+";
      }
    };

    update();
  });
}

let counterStarted = false;

window.addEventListener("scroll", () => {
  const section = document.getElementById("about");

  if(!section || counterStarted) return;

  const rect = section.getBoundingClientRect();

  if(rect.top < window.innerHeight * 0.9){
    runCounter();
    counterStarted = true;
  }
});
