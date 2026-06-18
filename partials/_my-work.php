<?php $isEn = ($lang === 'en'); ?>
<section id="my-work">
  <h1 class="section-title">
    <?= $isEn ? 'Featured Work' : 'Ausgewählte Arbeiten' ?>
  </h1>

  <div class="projects-container">

    <!-- Project: dnbx.de -->
    <article class="project-item" data-project="dnbx">
      <div class="project-info-sticky">
        <div class="project-badge">Domain Management</div>
        <h3 class="project-title">dnbx.de (Domain Box)</h3>
        <div class="project-description">
          <?php if ($isEn): ?>
            A tool for managing my domain portfolio with WhoIs-API integration
            and a REST-API (which is actually used on this website).
          <?php else: ?>
            Ein Tool zur Verwaltung von meinem Domain-Portfolio mit WhoIs-API-Integration
            und einer öffentlichen REST-API (die sogar von dieser seite verwendet wird).
          <?php endif; ?>
        </div>
        <ul class="technology-tags" aria-label="Used Technologies">
          <li class="technology-tag">PHP</li>
          <li class="technology-tag">localStorage</li>
          <li class="technology-tag">CSS3</li>
          <li class="technology-tag">JavaScript</li>
          <li class="technology-tag">WhoIs-API</li>
          <li class="technology-tag">REST API</li>
        </ul>
        <div class="project-links">
          <a href="https://dnbx.de" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/open-link.svg" class="button-icon" alt="" aria-hidden="true">Visit Site</a
          >
          <a href="https://github.com/dnbx-de/site" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/socials/github.svg" class="button-icon" alt="" aria-hidden="true">GitHub</a
          >
        </div>
        <div class="project-progress-container">
          <div class="project-progress-bar"></div>
        </div>
      </div>
      <div class="project-image-column">
        <div class="image-wrapper">
          <img src="assets/img/projects/dnbx.de-light.png" alt="dnbx.de Light Mode" class="project-image project-image-light" loading="lazy">
          <img src="assets/img/projects/dnbx.de-dark.png" alt="dnbx.de Dark Mode" class="project-image project-image-dark" loading="lazy">
        </div>
      </div>
    </article>

    <!-- Project: ternismail.de -->
    <article class="project-item" data-project="ternismail">
      <div class="project-info-sticky">
        <div class="project-badge">Email Service</div>
        <h3 class="project-title">ternismail.de</h3>
        <div class="project-description">
          <?php if ($isEn): ?>
            A private and secure email service focused on privacy and
            ease of use.
          <?php else: ?>
            Ein privater und sicherer E-Mail-Dienst mit Fokus auf
            Datenschutz und einfacher Bedienung.
          <?php endif; ?>
        </div>
        <ul class="technology-tags" aria-label="Used Technologies">
          <li class="technology-tag">TailwindCSS</li>
          <li class="technology-tag">JavaScript</li>
        </ul>
        <div class="project-links">
          <a href="https://ternismail.de" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/open-link.svg" class="button-icon" alt="" aria-hidden="true">Visit Site</a
          >
        </div>
        <div class="project-progress-container">
          <div class="project-progress-bar"></div>
        </div>
      </div>
      <div class="project-image-column">
        <div class="image-wrapper">
          <img src="assets/img/projects/ternismail.de.png" alt="ternismail.de Preview" class="project-image project-image-light" loading="lazy">
          <img src="assets/img/projects/ternismail.de.png" alt="ternismail.de Preview" class="project-image project-image-dark" loading="lazy">
        </div>
      </div>
    </article>

    <!-- Project: ivoternis.de -->
    <article class="project-item" data-project="ivoternis">
      <div class="project-info-sticky">
        <div class="project-badge">Personal Project</div>
        <h3 class="project-title">ivoternis.de</h3>
        <div class="project-description">
          <?php if ($isEn): ?>
            An simple portfolio for my Brother that uses the API from Chess.com and other Platforms. | OUTDATED
          <?php else: ?>
            Ein simples Portfolio für meinen Bruder, das live die CHess.com und andre APIs verwendet. | OUTDATED
          <?php endif; ?>
        </div>
        <ul class="technology-tags" aria-label="Used Technologies">
          <li class="technology-tag">External REST-API</li>
          <li class="technology-tag">Chess.com API</li>
        </ul>
        <div class="project-links">
          <a href="https://ivoternis.de" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/open-link.svg" class="button-icon" alt="" aria-hidden="true">Visit Site</a
          >
          <a href="https://github.com/ivoternis/ivoternis.de" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/socials/github.svg" class="button-icon" alt="" aria-hidden="true">GitHub</a
          >
        </div>
        <div class="project-progress-container">
          <div class="project-progress-bar"></div>
        </div>
      </div>
      <div class="project-image-column">
        <div class="image-wrapper">
          <img src="assets/img/projects/ivoternis-de-v3.png" alt="ivoternis.de Light Mode" class="project-image project-image-light" loading="lazy">
          <img src="assets/img/projects/ivoternis-de-v3.png" alt="ivoternis.de Dark Mode" class="project-image project-image-dark" loading="lazy">
        </div>
      </div>
    </article>

    <!--
    Project: dsc.pics (Commented Out)
    <article class="project-item" data-project="dscpics">...</article>
    -->

    <!--
    Project: Kaufenhof.de (Commented Out)
    <article class="project-item" data-project="kaufenhof">...</article>
    -->

    <!-- Project: api-sandbox.de -->
    <article class="project-item" data-project="apisandbox">
      <div class="project-info-sticky">
        <div class="project-badge">Developer Tool</div>
        <h3 class="project-title">api-sandbox.de</h3>
        <div class="project-description">
          <?php if ($isEn): ?>
            A minimalist API playground for developers to test and
            debug HTTP requests directly within the browser.
          <?php else: ?>
            Ein minimalistischer API-Playground für Entwickler, um
            HTTP-Requests direkt im Browser zu testen und zu
            debuggen.
          <?php endif; ?>
        </div>
        <ul class="technology-tags" aria-label="Used Technologies">
          <li class="technology-tag">JavaScript (ES6+)</li>
          <li class="technology-tag">TailwindCSS</li>
          <li class="technology-tag">REST API</li>
        </ul>
        <div class="project-links">
          <a href="https://api-sandbox.de/playground.html" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/open-link.svg" class="button-icon" alt="" aria-hidden="true">Open Playground</a
          >
          <a href="https://github.com/api-sandbox-DE/api-sandbox.de" class="project-link button" target="_blank" rel="noopener noreferrer"
            ><img src="assets/svg/socials/github.svg" class="button-icon" alt="" aria-hidden="true">GitHub</a
          >
        </div>
        <div class="project-progress-container">
          <div class="project-progress-bar"></div>
        </div>
      </div>
      <div class="project-image-column">
        <div class="image-wrapper">
          <img src="assets/img/projects/api-sandbox-de_playground.png" alt="API Sandbox Interface Light" class="project-image project-image-light" loading="lazy">
          <img src="assets/img/projects/api-sandbox-de_playground.png" alt="API Sandbox Interface Dark" class="project-image project-image-dark" loading="lazy">
        </div>
      </div>
    </article>

    <!--
    Project: drophtml.de (Commented Out)
    <article class="project-item" data-project="drophtml">...</article>
    -->

  </div>

  <!--div class="more-projects-note">
    <a href="https://github.com/fabianternis" target="_blank" rel="noopener noreferrer" class="post-it-wrapper">
      <div class="post-it">
        <div class="post-it-tape"></div>
        <div class="post-it-text">
          <div class="post-it-main"><?= $isEn ? 'And many more projects...' : 'Und viele weitere Projekte...' ?></div>
          <div class="post-it-subtext"><?= $isEn ? '(Seriously, check my GitHub!)' : '(Schau auf GitHub vorbei!)' ?></div>
        </div>
      </div>
    </a>
  </div-->
</section>
