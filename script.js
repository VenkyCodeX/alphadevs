/* ========== MOBILE DETECTION ========== */
const isMobile = () => window.innerWidth <= 768 || ('ontouchstart' in window);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========== CUSTOM CURSOR (desktop only) ========== */
(function() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || isMobile()) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a, button, .service-card, .project-card, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ========== SCROLL PROGRESS ========== */
(function() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ========== HERO CHAR SPLIT ========== */
(function() {
  const lines = document.querySelectorAll('.hero-title .text-line');
  lines.forEach((line, li) => {
    const text = line.childNodes;
    let html = '';
    text.forEach(node => {
      if (node.nodeType === 3) {
        node.textContent.split('').forEach((ch, ci) => {
          const delay = (li * 0.3 + ci * 0.04 + 0.5).toFixed(2);
          html += ch === ' '
            ? ' '
            : `<span class="char" style="animation-delay:${delay}s">${ch}</span>`;
        });
      } else {
        // span.gradient-text — split its text too
        const inner = node.textContent.split('').map((ch, ci) => {
          const delay = (li * 0.3 + ci * 0.04 + 0.5).toFixed(2);
          return ch === ' ' ? ' ' : `<span class="char" style="animation-delay:${delay}s">${ch}</span>`;
        }).join('');
        html += `<span class="gradient-text">${inner}</span>`;
      }
    });
    line.innerHTML = html;
  });
})();

/* ========== BUTTON RIPPLE ========== */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.className = 'btn-ripple';
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
});

/* ========== DIRECTIONAL REVEAL OBSERVER ========== */
const dirObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = [...(el.parentElement?.children || [])].filter(c =>
        c.classList.contains('reveal-left') ||
        c.classList.contains('reveal-right') ||
        c.classList.contains('reveal-scale')
      );
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 0.12}s`;
      el.classList.add('visible');
      dirObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale').forEach(el => dirObserver.observe(el));

/* ========== PARALLAX ON SCROLL (desktop only) ========== */
if (!isMobile() && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    document.querySelectorAll('.orb-1').forEach(o => o.style.transform = `translateY(${sy * 0.15}px)`);
    document.querySelectorAll('.orb-2').forEach(o => o.style.transform = `translateY(${sy * -0.1}px)`);
    document.querySelectorAll('.orb-3').forEach(o => o.style.transform = `translateY(${sy * 0.08}px)`);
    document.querySelectorAll('.section-header').forEach(h => {
      const rect = h.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight - 0.5) * 20;
      h.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}

/* ========== TYPING EFFECT ========== */
const typedTextElement = document.getElementById('typed-text');
const phrases = [
  'Web Development',
  'UI/UX Design',
  'Full Stack Solutions',
  'Startup MVPs',
  'Creative Innovation'
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typedTextElement) return;
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
  } else {
    typedTextElement.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;
  }

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2500);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 80);
}

// Start typing effect after loader
if (typedTextElement) {
  setTimeout(() => { typeEffect(); }, 2600);
}

/* ========== HAMBURGER MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
  }
});

/* ========== SMOOTH SCROLL NAVIGATION ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ========== ACTIVE NAV LINK ========== */
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ========== SCROLL REVEAL — IntersectionObserver ========== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // stagger siblings
      const siblings = [...(el.parentElement?.children || [])].filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 0.1}s`;
      el.classList.add('visible');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========== SECTION HEADER GLITCH + UNDERLINE ========== */
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const glitch = entry.target.querySelector('.glitch');
      if (glitch) {
        glitch.classList.add('animate');
        setTimeout(() => glitch.classList.remove('animate'), 600);
      }
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section-header').forEach(el => headerObserver.observe(el));

/* ========== TESTIMONIAL CARD REVEAL ========== */
(function() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  const obs = new MutationObserver(() => {
    grid.querySelectorAll('.testimonial-card:not(.visible)').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  });
  obs.observe(grid, { childList: true });
})();

/* ========== BACK TO TOP VISIBILITY ========== */
(function() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
})();

/* ========== PARTICLES CANVAS (skip on low-end/mobile) ========== */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  // Reduce particle count on mobile for performance
  const MOBILE_COUNT = 40;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COUNT = isMobile() ? MOBILE_COUNT : 100;
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkParticle() {
    const colors = ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(255,0,110,'];
    const c = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5,
      color: c,
      pulse: Math.random() * Math.PI * 2
    };
  }

  function init() { resize(); particles = Array.from({ length: COUNT }, mkParticle); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.001;

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      p.pulse += 0.02;
      const alpha = 0.4 + Math.sin(p.pulse) * 0.3;
      const r = p.r + Math.sin(p.pulse) * 0.5;

      // glow
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      grd.addColorStop(0, p.color + alpha + ')');
      grd.addColorStop(1, p.color + '0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (alpha + 0.2) + ')';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          grad.addColorStop(0, particles[i].color + (0.2 * (1 - dist/130)) + ')');
          grad.addColorStop(1, particles[j].color + (0.2 * (1 - dist/130)) + ')');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 180) {
        // repel slightly
        particles[i].vx += (dx / dist) * 0.02;
        particles[i].vy += (dy / dist) * 0.02;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(0,212,255,${0.4 * (1 - dist/180)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // dampen velocity
      particles[i].vx *= 0.999;
      particles[i].vy *= 0.999;
    }
    requestAnimationFrame(draw);
  }

  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('resize', resize);
  init(); draw();
})();

/* ========== MOUSE GLOW ========== */
(function initMouseGlow() {
  const glow = document.getElementById('heroMouseGlow');
  const hero = document.getElementById('hero');
  if (!glow || !hero) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top  = (e.clientY - rect.top)  + 'px';
    glow.style.opacity = '1';
  });
  hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  glow.style.opacity = '0';
  glow.style.transition = 'opacity 0.4s ease';
})();

/* ========== 3D TILT — SERVICE CARDS (desktop only) ========== */
if (!isMobile() && !prefersReducedMotion) {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  /* ========== MAGNETIC HOVER — PROJECT CARDS ========== */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.06;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.06;
      card.style.transform = `translate(${x}px, ${y - 10}px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translate(0,0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });
  });
}

/* ========== STAT CARD PULSE OBSERVER ========== */
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));

/* ========== SKILL BAR GLOW DOT ========== */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const aboutSection = document.getElementById('about');
if (aboutSection) skillObserver.observe(aboutSection);

/* ========== COUNTER ANIMATION ========== */
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const runCounter = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const statsSection = document.getElementById('stats');
let counterStarted = false;
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterStarted) {
      runCounter();
      counterStarted = true;
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
if (statsSection) counterObserver.observe(statsSection);

/* ========== TABS FUNCTIONALITY ========== */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Add active class to clicked button and corresponding panel
    button.classList.add('active');
    const tabId = `tab-${button.getAttribute('data-tab')}`;
    document.getElementById(tabId).classList.add('active');
  });
});

/* ========== EMAILJS INIT ========== */
// Replace these with your actual EmailJS credentials from https://emailjs.com
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEFghiJKL'

if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ========== CONTACT FORM HANDLING ========== */
const contactForm = document.getElementById('contactForm');

// Change this to your deployed backend URL in production
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : 'https://alphadevs.in';

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput    = contactForm.querySelector('input[name="Name"]');
    const emailInput   = contactForm.querySelector('input[name="Email"]');
    const subjectInput = contactForm.querySelector('input[name="Subject"]');
    const messageInput = contactForm.querySelector('textarea[name="Message"]');
    const formMsg      = document.getElementById('form-msg');
    const submitBtn    = contactForm.querySelector('.submit-btn');

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    try {
      const res  = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();

      if (data.success) {
        showNotification('Message sent! I will get back to you soon.', 'success');
        formMsg.textContent = '✓ Message sent successfully!';
        formMsg.className = 'success';
        contactForm.reset();
        setTimeout(() => { formMsg.textContent = ''; formMsg.className = ''; }, 5000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showNotification(error.message || 'Failed to send. Email: vsmakkalvar@gmail.com', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
    }
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInUp 0.5s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.5s ease-out forwards';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

/* ========== PARALLAX EFFECT ========== */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (hero) {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

/* ========== PROJECT CARD HOVER EFFECT (touch fallback) ========== */
if (isMobile()) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('touchstart', () => card.style.transform = 'translateY(-6px)', { passive: true });
    card.addEventListener('touchend',   () => card.style.transform = 'translateY(0)');
  });
}

/* ========== SMOOTH SCROLL FOR SCROLL INDICATOR ========== */
const scrollIndicator = document.querySelector('.scroll-wheel');
if (scrollIndicator) {
  setInterval(() => {
    const hero = document.getElementById('hero');
    if (hero && window.scrollY < hero.offsetHeight) {
      scrollIndicator.style.opacity = Math.max(0, 1 - window.scrollY / hero.offsetHeight);
    }
  }, 100);
}

/* ========== NAVBAR BACKGROUND ON SCROLL ========== */
const navbar = document.getElementById('navbar');
const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset > 50;
  navbar.style.background = scrolled
    ? (isLight() ? 'rgba(255,255,255,0.97)' : 'rgba(10,10,10,0.97)')
    : (isLight() ? 'rgba(255,255,255,0.7)'  : 'rgba(10,10,10,0.7)');
}, { passive: true });


/* ========== KEYBOARD SHORTCUTS ========== */
document.addEventListener('keydown', (e) => {
  // Press 'H' to go to hero
  if (e.key === 'h' || e.key === 'H') {
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
  }
  // Press '/' to focus on search (if needed)
  if (e.key === '/') {
    e.preventDefault();
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
  }
});

/* ========== TECH STACK TABS ========== */
(function() {
  const tabs = document.querySelectorAll('.tech-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tech-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tech-' + tab.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger reveal animations for newly shown cards
        panel.querySelectorAll('.reveal-scale').forEach((el, i) => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), i * 60);
        });
      }
    });
  });
  // Init first panel cards as visible
  document.querySelectorAll('.tech-panel.active .reveal-scale').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 60 + 300);
  });
})();

/* ========== TECH CARD INTERACTIONS ========== */
document.querySelectorAll('.tech-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
  });
});

/* ========== PROCESS STEP REVEAL ========== */
document.querySelectorAll('.process-step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.15}s`;
});

/* ========== PRICING CARD HOVER GLOW ========== */
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 50px rgba(0,212,255,0.15)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

console.log('🚀 AlphaDevs — Building next-gen digital products.');

/* ========== AVAILABILITY BANNER CLOSE ========== */
(function() {
  const banner = document.getElementById('availability-banner');
  const btn = document.getElementById('bannerClose');
  if (!banner || !btn) return;
  if (localStorage.getItem('bannerDismissed')) banner.classList.add('hidden');
  btn.addEventListener('click', () => {
    banner.classList.add('hidden');
    localStorage.setItem('bannerDismissed', '1');
  });
})();

/* ========== FAQ ACCORDION ========== */
(function() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ========== PRICING TOGGLE ========== */
(function() {
  const toggle = document.getElementById('pricingToggle');
  const labelOne = document.getElementById('toggleLabelOne');
  const labelMonthly = document.getElementById('toggleLabelMonthly');
  const usdBtn = document.getElementById('currencyUSD');
  const inrBtn = document.getElementById('currencyINR');
  if (!toggle) return;
  let isMonthly = false;
  let isINR = false;

  function updatePrices() {
    const period = isMonthly ? 'monthly' : 'onetime';
    const currency = isINR ? 'Inr' : 'Usd';
    document.querySelectorAll('.price-val').forEach(el => {
      el.textContent = el.dataset[period + currency];
    });
    document.querySelectorAll('.price-symbol').forEach(el => {
      el.textContent = isINR ? '\u20b9' : '$';
    });
  }

  toggle.addEventListener('click', () => {
    isMonthly = !isMonthly;
    toggle.classList.toggle('monthly', isMonthly);
    labelOne.classList.toggle('active-label', !isMonthly);
    labelMonthly.classList.toggle('active-label', isMonthly);
    updatePrices();
  });

  if (usdBtn && inrBtn) {
    usdBtn.addEventListener('click', () => {
      isINR = false;
      usdBtn.classList.add('active');
      inrBtn.classList.remove('active');
      updatePrices();
    });
    inrBtn.addEventListener('click', () => {
      isINR = true;
      inrBtn.classList.add('active');
      usdBtn.classList.remove('active');
      updatePrices();
    });
  }
})();

/* ========== CAROUSEL CONTROLS ========== */
(function() {
  const grid = document.getElementById('reviewsGrid');
  const controls = document.getElementById('carouselControls');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!grid || !controls) return;

  const obs = new MutationObserver(() => {
    const cards = grid.querySelectorAll('.testimonial-card');
    if (cards.length < 2) return;
    controls.style.display = 'flex';
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => scrollTo(i));
      dotsWrap.appendChild(dot);
    });
  });
  obs.observe(grid, { childList: true });

  function scrollTo(idx) {
    const cards = grid.querySelectorAll('.testimonial-card');
    if (!cards[idx]) return;
    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function currentIndex() {
    const cards = [...grid.querySelectorAll('.testimonial-card')];
    return cards.findIndex(c => c.getBoundingClientRect().left >= grid.getBoundingClientRect().left - 10);
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    const idx = Math.max(0, currentIndex() - 1);
    scrollTo(idx);
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    const cards = grid.querySelectorAll('.testimonial-card');
    const idx = Math.min(cards.length - 1, currentIndex() + 1);
    scrollTo(idx);
  });
})();

/* ========== MOBILE BOTTOM NAV ACTIVE + PILL ========== */
(function() {
  const mbnItems = document.querySelectorAll('.mbn-item');
  const pill = document.getElementById('mbnPill');
  const nav = document.getElementById('mobileBottomNav');

  function movePill(activeItem) {
    if (!pill || !nav || !activeItem) return;
    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    pill.style.left = (itemRect.left - navRect.left + itemRect.width * 0.2) + 'px';
    pill.style.width = (itemRect.width * 0.6) + 'px';
  }

  window.addEventListener('scroll', () => {
    let current = 'hero';
    document.querySelectorAll('section').forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    mbnItems.forEach(item => {
      const isActive = item.getAttribute('href') === '#' + current;
      item.classList.toggle('active', isActive);
      if (isActive) movePill(item);
    });
  }, { passive: true });

  // Init pill on first active item
  setTimeout(() => {
    const first = document.querySelector('.mbn-item.active') || mbnItems[0];
    movePill(first);
  }, 100);
})();

/* ========== CV DOWNLOAD FALLBACK ========== */
const cvBtn = document.getElementById('cvDownloadBtn');
if (cvBtn) {
  cvBtn.addEventListener('click', async (e) => {
    const res = await fetch(cvBtn.href, { method: 'HEAD' }).catch(() => null);
    if (!res || !res.ok) {
      e.preventDefault();
      window.open('https://www.linkedin.com/in/venkat-makkalwar-14b628286/', '_blank');
      showNotification('CV not uploaded yet. Opening LinkedIn profile instead.', 'error');
    }
  });
}
