document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  const typedLine = document.getElementById("typedLine");
  const phrases = [
    "hydra -> auth.log -> Wazuh alert -> Security Onion hunt",
    "nmap -> Suricata/Zeek -> MITRE T1046 evidence",
    "gobuster -> Apache logs -> Wazuh + NDR correlation",
    "klist -> DC01 events -> Kerberos monitoring"
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;
  function typeLoop(){
    if(!typedLine) return;
    const current = phrases[phraseIndex];
    if(!deleting){
      typedLine.textContent = current.slice(0, charIndex++);
      if(charIndex > current.length + 10) deleting = true;
    } else {
      typedLine.textContent = current.slice(0, charIndex--);
      if(charIndex <= 0){ deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 34 : 58);
  }
  typeLoop();

  const carousel = document.querySelector("[data-carousel]");
  if(carousel){
    const slides = Array.from(carousel.querySelectorAll(".slide"));
    const dotsWrap = carousel.querySelector("[data-dots]");
    let current = 0, timer;
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", `Go to slide ${i+1}`);
      dot.addEventListener("click", () => showSlide(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
    function showSlide(index){
      current = (index + slides.length) % slides.length;
      slides.forEach((s,i)=>s.classList.toggle("active", i === current));
      dots.forEach((d,i)=>d.classList.toggle("active", i === current));
      restart();
    }
    function restart(){ clearInterval(timer); timer = setInterval(()=>showSlide(current+1), 4500); }
    carousel.querySelector("[data-prev]")?.addEventListener("click", () => showSlide(current-1));
    carousel.querySelector("[data-next]")?.addEventListener("click", () => showSlide(current+1));
    showSlide(0);
  }

  document.querySelectorAll("[data-open-modal]").forEach(button => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.openModal);
      modal?.classList.add("active");
      modal?.setAttribute("aria-hidden","false");
    });
  });
  document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-shell");
      modal?.classList.remove("active");
      modal?.setAttribute("aria-hidden","true");
    });
  });
  document.querySelectorAll(".modal-shell").forEach(modal => {
    modal.addEventListener("click", e => {
      if(e.target === modal){ modal.classList.remove("active"); modal.setAttribute("aria-hidden","true"); }
    });
  });

  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      document.querySelectorAll("[data-category]").forEach(card => {
        card.style.display = (filter === "all" || card.dataset.category === filter) ? "" : "none";
      });
    });
  });

  const demoViewer = document.getElementById("demoViewer");
  const demoViewerContent = document.getElementById("demoViewerContent");
  const closeDemoViewer = document.getElementById("closeDemoViewer");
  function closeViewer(){
    if(!demoViewer || !demoViewerContent) return;
    demoViewer.classList.remove("active");
    demoViewer.setAttribute("aria-hidden","true");
    demoViewerContent.innerHTML = "";
  }
  document.querySelectorAll(".open-demo").forEach(btn => {
    btn.addEventListener("click", () => {
      const demo = btn.dataset.demo;
      const fallback = btn.dataset.fallback;
      const type = btn.dataset.type || "image";
      if(!demoViewer || !demoViewerContent) return;
      if(type === "video"){
        demoViewerContent.innerHTML = `<video controls autoplay playsinline><source src="${demo}" type="video/mp4">${fallback ? `<img src="${fallback}" alt="SOC demo fallback">` : "Your browser does not support this video."}</video>`;
      } else {
        demoViewerContent.innerHTML = `<img src="${demo}" alt="SOC demo full-screen preview">`;
      }
      demoViewer.classList.add("active");
      demoViewer.setAttribute("aria-hidden","false");
    });
  });
  closeDemoViewer?.addEventListener("click", closeViewer);
  demoViewer?.addEventListener("click", e => { if(e.target === demoViewer) closeViewer(); });
  document.addEventListener("keydown", e => {
    if(e.key === "Escape"){
      closeViewer();
      document.querySelectorAll(".modal-shell.active").forEach(m=>{ m.classList.remove("active"); m.setAttribute("aria-hidden","true"); });
    }
  });
});
