// script.js — UI Effects (theme toggle, scroll animations, ripple)
// Các hiệu ứng này hoạt động độc lập với data layer (portfolio-data.js)

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') html.classList.add('dark-theme');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      html.classList.toggle('dark-theme');
      localStorage.setItem('theme', html.classList.contains('dark-theme') ? 'dark' : 'light');
    });
  }
})();

// ─── Smooth Scroll ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ─── Fade-in on Scroll ────────────────────────────────────────────────────────
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
});

// ─── Progress Bar Animation ───────────────────────────────────────────────────
// Được trigger sau khi portfolio-data.js cập nhật data-progress attribute
function animateProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  const progressBarFill = progressBar.querySelector('.progress-bar-fill');
  const progressValue = progressBar.getAttribute('data-progress') || 0;

  const progressObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          if (progressBarFill) progressBarFill.style.width = progressValue + '%';
        }, 300);
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressObserver.observe(progressBar);
}

// Re-run sau khi data đã load (portfolio-data.js gọi sau DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function () {
  // Chờ portfolio-data.js cập nhật DOM xong (100ms là đủ vì cùng DOMContentLoaded)
  setTimeout(animateProgressBar, 500);
});

// ─── Project Card Hover Effect ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Static cards (nếu có)
  document.querySelectorAll('.project-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-4px)'; });
    card.addEventListener('mouseleave', function () { this.style.transform = 'translateY(0)'; });
  });
});

// ─── Ripple Effect ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.theme-toggle, .project-link, .blog-read-more, .social-link').forEach(el => {
    el.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});
