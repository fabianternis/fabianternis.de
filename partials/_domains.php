<?php $isEn = ($lang === 'en'); ?>
<section id="domains">
  <h1 class="section-title">Domain Portfolio</h1>
  <p class="domains-subtitle">
    <?php if ($isEn): ?>
      A collection of domains I've registered and managed over the
      years — from personal projects to experiments.
    <?php else: ?>
      Eine Sammlung von Domains, die ich über die Jahre registriert und
      verwaltet habe — von persönlichen Projekten bis hin zu
      Experimenten.
    <?php endif; ?>
  </p>
  <div class="domains-layout">
    <div class="domains-counter-card">
      <div class="domains-counter-inner">
        <span
          class="domains-counter-number"
          id="domainsCounter"
          data-target="0"
          >0</span
        >
        <span class="domains-counter-plus">+</span>
      </div>
      <p class="domains-counter-label">
        <?php if ($isEn): ?>
          domains registered &amp; managed
        <?php else: ?>
          Domains registriert &amp; verwaltet
        <?php endif; ?>
      </p>
      <a
        href="https://dnbx.de#domainlist"
        target="_blank"
        rel="noopener noreferrer"
        class="domains-counter-link"
      >
        <?= $isEn ? 'View full list' : 'Vollständige Liste' ?>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6">
          <polyline points="15 3 21 3 21 9">
          <line x1="10" y1="14" x2="21" y2="3">
        </svg>
      </a>
      <a
        href="https://domainlist.fabianternis.de/"
        target="_blank"
        rel="noopener noreferrer"
        class="domains-counter-link-secondary"
      >
        Old domainlist (Depreciated)
      </a>
    </div>
    <div class="domains-examples-card">
      <div class="domains-examples-header">
        <p class="domains-examples-label">
          <?= $isEn ? 'Search &amp; Explore' : 'Suchen &amp; Entdecken' ?>
        </p>
        <div class="domains-search-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="domains-search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
           >
          </svg>
          <input
            type="text"
            id="domainSearch"
            class="domains-search-input"
            placeholder="Search domains..."
            aria-label="Search domains"
          >
        </div>
      </div>
      <div class="domains-examples-grid" id="domainsGrid">
        <!-- Populated dynamically via DNBX.de API -->
        <div class="domains-loader-wrapper">
          <div class="loader" aria-hidden="true">
            <span class="loader-spinner"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="domains-tld-grid" id="tldGrid">
    <!-- Populated dynamically via DNBX.de API -->
  </div>
</section>
