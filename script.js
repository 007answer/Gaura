/* ============================================
   ISKCON WEBSITE — SCRIPT.JS
   ============================================ */

// ── Navbar scroll effect & active link ────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Hamburger menu ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinksEl.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll-reveal animations ──────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), parseInt(delay));
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.act-card').forEach(el => observer.observe(el));

// Generic fade-in for section content
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.wb-card, .prasadam-img, .scripture-card, .about-img-card, .stat-item, .gallery-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// ── Lightbox ──────────────────────────────────────
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentLightboxIdx = 0;
const galleryImgList = Array.from(galleryItems);

function openLightbox(idx) {
  currentLightboxIdx = idx;
  const img = galleryImgList[idx];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function prevImage() {
  currentLightboxIdx = (currentLightboxIdx - 1 + galleryImgList.length) % galleryImgList.length;
  openLightbox(currentLightboxIdx);
}

function nextImage() {
  currentLightboxIdx = (currentLightboxIdx + 1) % galleryImgList.length;
  openLightbox(currentLightboxIdx);
}

galleryItems.forEach((img, idx) => {
  img.parentElement.addEventListener('click', () => openLightbox(idx));
});
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

// ── Back to top ───────────────────────────────────
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Contact form ──────────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending... 🙏';
  btn.disabled = true;
  setTimeout(() => {
    formSuccess.classList.add('show');
    btn.textContent = 'Send Message 🙏';
    btn.disabled = false;
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// ── Smooth hover on gallery items ─────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.zIndex = '10';
  });
  item.addEventListener('mouseleave', () => {
    item.style.zIndex = '';
  });
});

// ── Parallax subtle on hero ───────────────────────
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (hero) {
    const y = window.scrollY * 0.4;
    hero.style.backgroundPositionY = `calc(50% + ${y}px)`;
  }
}, { passive: true });

// ── Add staggered visible class to stat items ──────
document.querySelectorAll('.stat-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
});

// ── Animate footer social buttons ─────────────────
const socialBtns = document.querySelectorAll('.social-btn');
const socialObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    socialBtns.forEach((btn, i) => {
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      }, i * 60);
    });
    socialObserver.disconnect();
  }
}, { threshold: 0.3 });

socialBtns.forEach(btn => {
  btn.style.opacity = '0';
  btn.style.transform = 'translateY(16px)';
  btn.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.3s, border-color 0.3s';
});
if (socialBtns.length) socialObserver.observe(socialBtns[0].closest('.footer-social-col'));

// ── Community Comments ────────────────────────────
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

const avatarColors = [
  '#6B8E6B','#6B7A8E','#8E6B6B','#7A6B8E',
  '#8E7A6B','#6B8E7A','#8E6B8A','#7A8E6B'
];

function getInitial(name) {
  return name.trim().charAt(0).toUpperCase();
}

function getMonthYear() {
  return new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('commentName').value.trim();
  const text = document.getElementById('commentText').value.trim();
  if (!name || !text) return;

  const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
  const initial = getInitial(name);

  const card = document.createElement('div');
  card.className = 'comment-card';
  card.innerHTML = `
    <div class="comment-avatar" style="--av-color: ${color};">${initial}</div>
    <div class="comment-body">
      <div class="comment-meta">
        <span class="comment-author">${name}</span>
        <span class="comment-date">${getMonthYear()}</span>
      </div>
      <p class="comment-text">${text}</p>
    </div>
  `;

  commentsList.insertBefore(card, commentsList.firstChild);
  commentForm.reset();
  commentsList.scrollTop = 0;
});

console.log('🌸 Hare Krishna! ISKCON Website Loaded 🌸');
