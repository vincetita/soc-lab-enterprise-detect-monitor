const lines = [
  "hydra -L users.txt -P passwords.txt 192.168.117.30 ssh -t 4 -V",
  "nmap -sS -sV 192.168.117.0/24",
  "gobuster dir -u http://192.168.117.30 -w common.txt",
  "open Wazuh → confirm alert → map to MITRE",
  "open Security Onion → Hunt → validate network evidence",
  "open Prometheus/Grafana → review attack-window metrics"
];

const typed = document.getElementById("typedLine");
let li = 0;
let ci = 0;
let deleting = false;

function tick(){
  if(!typed) return;
  const text = lines[li];
  typed.textContent = deleting ? text.slice(0, ci--) : text.slice(0, ci++);

  if(!deleting && ci > text.length + 6) deleting = true;
  if(deleting && ci < 0){
    deleting = false;
    li = (li + 1) % lines.length;
    ci = 0;
  }

  setTimeout(tick, deleting ? 35 : 60);
}
tick();

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if(menuBtn && nav){
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

const carousel = document.querySelector("[data-carousel]");
const slides = [...document.querySelectorAll(".slide")];
const dotsWrap = document.querySelector("[data-dots]");
let current = 0;
let timer = null;

function renderDots(){
  if(!dotsWrap || !slides.length) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const button = document.createElement("button");
    button.className = "dot" + (i === current ? " active" : "");
    button.setAttribute("aria-label", `Go to slide ${i + 1}`);
    button.addEventListener("click", () => {
      current = i;
      showSlide();
      restartCarousel();
    });
    dotsWrap.appendChild(button);
  });
}

function showSlide(){
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  if(dotsWrap){
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
  }
}

function nextSlide(){
  if(!slides.length) return;
  current = (current + 1) % slides.length;
  showSlide();
}

function prevSlide(){
  if(!slides.length) return;
  current = (current - 1 + slides.length) % slides.length;
  showSlide();
}

function restartCarousel(){
  clearInterval(timer);
  if(slides.length) timer = setInterval(nextSlide, 3200);
}

if(carousel && slides.length){
  const nextBtn = document.querySelector("[data-next]");
  const prevBtn = document.querySelector("[data-prev]");

  if(nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); restartCarousel(); });
  if(prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); restartCarousel(); });

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", restartCarousel);

  renderDots();
  showSlide();
  restartCarousel();
}

function setDemoState(stage, playing){
  if(!stage) return;
  const img = stage.querySelector(".demo-media");
  const overlay = stage.querySelector(".demo-overlay");

  if(playing){
    if(img && stage.dataset.gif) img.src = stage.dataset.gif;
    stage.classList.remove("paused");
    if(overlay) overlay.textContent = "Demo playing";
  } else {
    if(img && stage.dataset.poster) img.src = stage.dataset.poster;
    stage.classList.add("paused");
    if(overlay) overlay.textContent = "Demo paused";
  }
}

document.querySelectorAll("[data-demo-target]").forEach(button => {
  const target = document.getElementById(button.dataset.demoTarget);
  button.addEventListener("click", () => {
    const shouldPlay = target && target.classList.contains("paused");
    setDemoState(target, shouldPlay);
    button.textContent = shouldPlay ? "Turn off" : (button.dataset.defaultLabel || "Play demo");
  });
});

const playAll = document.getElementById("playAll");
const pauseAll = document.getElementById("pauseAll");

if(playAll){
  playAll.addEventListener("click", () => {
    document.querySelectorAll(".demo-stage").forEach(stage => setDemoState(stage, true));
    document.querySelectorAll("[data-demo-target]").forEach(button => button.textContent = "Turn off");
  });
}

if(pauseAll){
  pauseAll.addEventListener("click", () => {
    document.querySelectorAll(".demo-stage").forEach(stage => setDemoState(stage, false));
    document.querySelectorAll("[data-demo-target]").forEach(button => button.textContent = button.dataset.defaultLabel || "Play demo");
  });
}

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(item => item.classList.remove("active"));
    chip.classList.add("active");

    const value = chip.dataset.filter;
    document.querySelectorAll(".demos .card").forEach(card => {
      card.classList.toggle("hidden", !(value === "all" || card.dataset.category === value));
    });
  });
});

function openModal(id){
  const modal = document.getElementById(id);
  if(modal){
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeModal(modal){
  if(modal){
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
}

document.querySelectorAll("[data-open-modal]").forEach(button => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
  button.addEventListener("click", () => closeModal(button.closest(".modal-shell")));
});

document.querySelectorAll(".modal-shell").forEach(shell => {
  shell.addEventListener("click", event => {
    if(event.target === shell) closeModal(shell);
  });
});

document.addEventListener("keydown", event => {
  if(event.key === "Escape"){
    document.querySelectorAll(".modal-shell.show").forEach(closeModal);
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".card, .contact-card, .accordion").forEach(item => observer.observe(item));
