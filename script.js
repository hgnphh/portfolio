// Theme Toggle Functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme
  if (currentTheme === 'dark') {
    html.classList.add('dark-theme');
  }
  
  // Theme toggle button click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      html.classList.toggle('dark-theme');
      
      // Save theme preference
      const theme = html.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
  
  // Animate progress bar
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const progressBarFill = progressBar.querySelector('.progress-bar-fill');
    const progressValue = progressBar.getAttribute('data-progress') || 0;
    
    // Create intersection observer for progress bar
    const progressObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (progressBarFill) {
              progressBarFill.style.width = progressValue + '%';
            }
          }, 300);
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    progressObserver.observe(progressBar);
  }
});

// Add hover effect to project cards and blog cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.project-card, .blog-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Add click ripple effect to buttons and links
document.addEventListener('DOMContentLoaded', function() {
  const interactiveElements = document.querySelectorAll('.theme-toggle, .project-link, .blog-read-more, .social-link');
  
  interactiveElements.forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Typing effect for name (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
  const nameElement = document.querySelector('.name');
  const pathname = window.location.pathname;
  const isHomePage = pathname === '/index.html' || pathname === '/' || pathname.endsWith('index.html');
  
  if (nameElement && isHomePage) {
    // Get text content excluding the verified badge
    const textNodes = Array.from(nameElement.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('')
      .trim();
    
    if (textNodes) {
      // Find verified badge to preserve it
      const verifiedBadge = nameElement.querySelector('.verified-badge');
      
      // Clear and set opacity
      nameElement.style.opacity = '0';
      
      // Use requestAnimationFrame instead of setTimeout for better CSP compliance
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          // Restore content
          nameElement.innerHTML = textNodes;
          if (verifiedBadge) {
            nameElement.appendChild(verifiedBadge);
          }
          nameElement.style.transition = 'opacity 0.5s ease';
          nameElement.style.opacity = '1';
        });
      });
    }
  }
});
