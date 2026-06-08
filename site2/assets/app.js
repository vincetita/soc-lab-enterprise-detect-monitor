
const lines = [
  "hydra -L users.txt -P passwords.txt 192.168.117.30 ssh -t 4 -V",
  "nmap -sS -sV 192.168.117.0/24",
  "gobuster dir -u http://192.168.117.30 -w common.txt",
  "open Wazuh → confirm alert → map to MITRE"
];
let li = 0, ci = 0, deleting = false;
const typed = document.getElementById('typedLine');
function tick(){
  const text = lines[li];
  typed.textContent = deleting ? text.slice(0, ci--) : text.slice(0, ci++);
  if(!deleting && ci > text.length + 6) deleting = true;
  if(deleting && ci < 0){ deleting = false; li = (li + 1) % lines.length; ci = 0; }
  setTimeout(tick, deleting ? 35 : 60);
}
tick();

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if(menuBtn){
  menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
}

const carousel = document.querySelector('[data-carousel]');
const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.querySelector('[data-dots]');
let current = 0, timer = null;
function renderDots(){
  dotsWrap.innerHTML = '';
  slides.forEach((_, i)=>{
    const b = document.createElement('button');
    b.className = 'dot' + (i===current ? ' active' : '');
    b.addEventListener('click', ()=> { current=i; showSlide(); restart(); });
    dotsWrap.appendChild(b);
  });
}
function showSlide(){
  slides.forEach((s,i)=> s.classList.toggle('active', i===current));
  [...dotsWrap.children].forEach((d,i)=> d.classList.toggle('active', i===current));
}
function next(){ current = (current + 1) % slides.length; showSlide(); }
function prev(){ current = (current - 1 + slides.length) % slides.length; showSlide(); }
function restart(){ clearInterval(timer); timer = setInterval(next, 3200); }
document.querySelector('[data-next]').addEventListener('click', ()=> { next(); restart(); });
document.querySelector('[data-prev]').addEventListener('click', ()=> { prev(); restart(); });
carousel.addEventListener('mouseenter', ()=> clearInterval(timer));
carousel.addEventListener('mouseleave', restart);
renderDots(); showSlide(); restart();

function setDemoState(stage, playing){
  const img = stage.querySelector('.demo-media');
  const overlay = stage.querySelector('.demo-overlay');
  if(playing){
    img.src = stage.dataset.gif;
    stage.classList.remove('paused');
    overlay.textContent = 'Demo playing';
  } else {
    img.src = stage.dataset.poster;
    stage.classList.add('paused');
    overlay.textContent = 'Demo paused';
  }
}
document.querySelectorAll('[data-demo-target]').forEach(btn=>{
  const target = document.getElementById(btn.dataset.demoTarget);
  btn.addEventListener('click', ()=>{
    const playing = target.classList.contains('paused');
    setDemoState(target, playing);
    btn.textContent = playing ? 'Turn off' : (btn.dataset.defaultLabel || 'Play demo');
  });
});
document.getElementById('playAll').addEventListener('click', ()=>{
  document.querySelectorAll('.demo-stage').forEach(s=> setDemoState(s, true));
  document.querySelectorAll('[data-demo-target]').forEach(btn=> btn.textContent = 'Turn off');
});
document.getElementById('pauseAll').addEventListener('click', ()=>{
  document.querySelectorAll('.demo-stage').forEach(s=> setDemoState(s, false));
  document.querySelectorAll('[data-demo-target]').forEach(btn=> btn.textContent = btn.dataset.defaultLabel || 'Play demo');
});

document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=> c.classList.remove('active'));
    chip.classList.add('active');
    const val = chip.dataset.filter;
    document.querySelectorAll('.demos .card').forEach(card=>{
      card.classList.toggle('hidden', !(val === 'all' || card.dataset.category === val));
    });
  });
});

function openModal(id){
  const el = document.getElementById(id);
  if(el) el.classList.add('show');
}
function closeModal(el){ el.classList.remove('show'); }
document.querySelectorAll('[data-open-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=> openModal(btn.dataset.openModal));
});
document.querySelectorAll('[data-close-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=> closeModal(btn.closest('.modal-shell')));
});
document.querySelectorAll('.modal-shell').forEach(shell=>{
  shell.addEventListener('click', (e)=>{ if(e.target === shell) closeModal(shell); });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
document.querySelectorAll('[data-open-lightbox]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    lightboxImg.src = btn.dataset.lightboxSrc;
    lightboxTitle.textContent = btn.dataset.openLightbox;
    openModal('lightbox');
  });
});
