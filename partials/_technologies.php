<?php $isEn = ($lang === 'en'); ?>
<section id="technologies">
  <h1 class="section-title">
    <?= $isEn ? 'Technology Stack' : 'Technologien' ?>
  </h1>
  <p class="tech-intro">
    <?php if ($isEn): ?>
      My daily toolbelt for building high-performance web applications
      and robust system architectures.
    <?php else: ?>
      Mein tägliches Werkzeug für die Entwicklung von
      Hochleistungs-Webanwendungen und robusten
      Systemarchitekturen.
    <?php endif; ?>
  </p>

  <div class="tech-grid">
    <!-- Laravel -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/laravel-2.svg" alt="Laravel" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Laravel</h4>
        <div class="tech-category">Framework</div>
      </div>
    </div>

    <!-- PHP -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/php-6.svg" alt="PHP" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">PHP</h4>
        <div class="tech-category">Backend</div>
      </div>
    </div>

    <!-- JavaScript -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/javascript-1.svg" alt="JavaScript" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">JavaScript</h4>
        <div class="tech-category">Frontend</div>
      </div>
    </div>

    <!-- Tailwind -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/tailwind-css-2.svg" alt="Tailwind CSS" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Tailwind</h4>
        <div class="tech-category">CSS</div>
      </div>
    </div>

    <!-- MySQL -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/mysql-logo-pure.svg" alt="MySQL" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">MySQL</h4>
        <div class="tech-category">Database</div>
      </div>
    </div>

    <!-- Docker -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/docker-4.svg" alt="Docker" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Docker</h4>
        <div class="tech-category">DevOps</div>
      </div>
    </div>

    <!-- Gemini AI -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/gemini-icon-logo.svg" alt="Gemini AI" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Gemini</h4>
        <div class="tech-category">AI</div>
      </div>
    </div>

    <!-- Cloudflare -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/cloudflare.svg" alt="Cloudflare" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Cloudflare</h4>
        <div class="tech-category">CDN + Proxy + R2</div>
      </div>
    </div>

    <!-- Ubuntu -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/ubuntu-4.svg" alt="Ubuntu" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Ubuntu</h4>
        <div class="tech-category">OS</div>
      </div>
    </div>

    <!-- Git -->
    <div class="tech-card">
      <div class="tech-icon-wrapper">
        <img src="assets/svg/technologies/git-icon.svg" alt="Git" class="tech-icon" loading="lazy">
      </div>
      <div class="tech-info">
        <h4 class="tech-name">Git</h4>
        <div class="tech-category">VCS</div>
      </div>
    </div>
  </div>
</section>
