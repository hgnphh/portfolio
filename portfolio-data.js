// portfolio-data.js
// Fetch dữ liệu từ Supabase và render vào DOM cho portfolio pages
// Load sau: supabase-client.js

// ─── SVG Icons cho Social Links ───────────────────────────────────────────────
const SOCIAL_ICONS = {
  github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
  discord: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.076-.076 0-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el && value) el.setAttribute(attr, value);
}

// ─── Load Profile ──────────────────────────────────────────────────────────────
async function loadProfile() {
  const { data, error } = await window.supabaseClient
    .from('profile')
    .select('*')
    .single();

  if (error || !data) { console.error('Profile load error:', error); return; }

  // Hero
  setText('profile-name', data.name);
  setText('profile-quote', data.quote);
  setAttr('cv-button', 'href', data.cv_url || 'cv.pdf');

  // Avatar
  const avatarEl = document.getElementById('avatar-img');
  if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;

  // Bio
  setText('profile-bio1', data.bio_1);
  setText('profile-bio2', data.bio_2);

  // Education
  if (data.gpa)          setText('education-gpa',        `Current GPA : ${data.gpa}`);
  if (data.english_level) setText('education-english',   `English : ${data.english_level}`);
  if (data.coursework)   setText('education-coursework', `Relevant Coursework : ${data.coursework}`);

  // Progress bar
  const pct = data.graduation_progress || 75;
  setText('graduation-progress-pct', `${pct}%`);
  const bar = document.getElementById('graduation-progress-bar');
  if (bar) bar.setAttribute('data-progress', pct);
  if (data.graduation_year) setText('graduation-year-note', `Expected graduation: ${data.graduation_year}`);

  // Contact email
  const emailEl = document.getElementById('contact-email');
  if (emailEl && data.email) {
    emailEl.href = `mailto:${data.email}`;
    emailEl.textContent = data.email;
  }

  // Footer + page title
  setText('footer-copyright', `Copyright © ${new Date().getFullYear()} ${data.name}`);
  document.title = `${data.name} — Portfolio`;
}

// ─── Load Skills "I Know" ──────────────────────────────────────────────────────
async function loadSkillsKnow() {
  const { data, error } = await window.supabaseClient
    .from('skills_know')
    .select('*')
    .order('sort_order');

  if (error || !data) return;
  const el = document.getElementById('skills-know-list');
  if (el) el.innerHTML = data.map(s => `<span>${s.name}</span>`).join('');
}

// ─── Load Skills "I Use" ───────────────────────────────────────────────────────
async function loadSkillsUse() {
  const { data, error } = await window.supabaseClient
    .from('skills_use')
    .select('*')
    .order('sort_order');

  if (error || !data) return;
  const el = document.getElementById('skills-use-list');
  if (el) el.innerHTML = data.map(s => `<span>${s.name}</span>`).join('');
}

// ─── Load Technical Skills ─────────────────────────────────────────────────────
async function loadTechnicalSkills() {
  const { data, error } = await window.supabaseClient
    .from('technical_skills')
    .select('*')
    .order('sort_order');

  if (error || !data) return;
  const el = document.getElementById('technical-skills-list');
  if (el) el.innerHTML = data.map(s => `<p>${s.name}</p>`).join('');
}

// ─── Load Social Links ─────────────────────────────────────────────────────────
async function loadSocialLinks() {
  const { data, error } = await window.supabaseClient
    .from('social_links')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order');

  if (error || !data) return;
  const el = document.getElementById('social-links-list');
  if (!el) return;

  el.innerHTML = data.map(link => `
    <a href="${link.url}" target="_blank" class="social-link" aria-label="${link.platform}">
      ${SOCIAL_ICONS[link.platform] || ''}
      <span>${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}</span>
    </a>
  `).join('');

  // Re-attach ripple effect to new elements
  el.querySelectorAll('.social-link').forEach(el => attachRipple(el));
}

// ─── Load Projects (for projects.html) ────────────────────────────────────────
async function loadProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = '<p style="opacity:0.5;padding:2rem 0">Loading projects...</p>';

  const { data, error } = await window.supabaseClient
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order');

  if (error) {
    container.innerHTML = '<p>Không thể tải dự án. Vui lòng thử lại.</p>';
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = '<p style="opacity:0.5;padding:2rem 0">Chưa có dự án nào.</p>';
    return;
  }

  container.innerHTML = data.map(renderProjectCard).join('');

  // Attach effects to dynamically rendered cards
  container.querySelectorAll('.fade-in').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    obs.observe(el);
  });

  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
  });

  container.querySelectorAll('.project-link').forEach(el => attachRipple(el));
}

function renderProjectCard(project) {
  const demoLink = project.demo_url
    ? `<a href="${project.demo_url}" target="_blank" class="project-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>Demo</a>` : '';

  const githubLink = project.github_url && project.github_url !== '#'
    ? `<a href="${project.github_url}" target="_blank" class="project-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>GitHub</a>` : '';

  const metaLines = [
    project.role        ? `<p class="project-description"><strong>Role :</strong> ${project.role}</p>` : '',
    project.domain      ? `<p class="project-description"><strong>Domain :</strong> ${project.domain}</p>` : '',
    project.team_size   ? `<p class="project-description"><strong>Team size :</strong> ${project.team_size}</p>` : '',
    project.description ? `<p class="project-description">${project.description}</p>` : '',
  ].join('');

  const tags = (project.tech_tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('');

  return `
    <article class="project-card fade-in">
      <div class="project-header">
        <h2>${project.title}</h2>
        <div class="project-links">${demoLink}${githubLink}</div>
      </div>
      ${metaLines}
      <div class="project-tech">${tags}</div>
    </article>`;
}

// ─── Ripple helper (used in both pages) ───────────────────────────────────────
function attachRipple(element) {
  element.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
  const isIndex    = !document.getElementById('projects-list');
  const isProjects = !!document.getElementById('projects-list');

  if (isIndex) {
    await Promise.all([
      loadProfile(),
      loadSkillsKnow(),
      loadSkillsUse(),
      loadTechnicalSkills(),
      loadSocialLinks(),
    ]);
  }

  if (isProjects) {
    await loadProjects();
  }
});

