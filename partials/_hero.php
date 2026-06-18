<?php
// $lang is provided by the including file ('en' or 'de')
$isEn = ($lang === 'en');

// SVG paths reused in both language sections
$laravelSvg = <<<'SVG'
<svg
  class="header-logo"
  data-hover-image="assets/img/other/hero_hover_laravel_16x9.webp"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 113.02 28.1942764712217"
>
  <title>Laravel</title>
  <path
    fill="#ff2d20"
    d="M4.44 0v23.05h8.34v3.97H0V0h4.44zm24 11.46V9.03h4.22v18h-4.2v-2.44c-.58.9-1.38 1.6-2.42 2.1-1.04.53-2.1.78-3.15.78-1.37 0-2.62-.25-3.75-.75a8.76 8.76 0 0 1-2.92-2.06 9.6 9.6 0 0 1-1.9-3 9.72 9.72 0 0 1-.67-3.64c0-1.26.23-2.47.68-3.6a9.56 9.56 0 0 1 1.9-3.04 8.77 8.77 0 0 1 2.9-2.08c1.14-.5 2.4-.75 3.75-.75 1.05 0 2.1.26 3.14.77 1.04.52 1.84 1.22 2.4 2.12zm-.38 8.77a6.3 6.3 0 0 0 .4-2.2c0-.78-.14-1.5-.4-2.2A5.58 5.58 0 0 0 26.98 14a5.23 5.23 0 0 0-1.68-1.22 5.16 5.16 0 0 0-2.18-.47c-.8 0-1.52.17-2.16.48A5.3 5.3 0 0 0 19.3 14a5.3 5.3 0 0 0-1.06 1.83 6.56 6.56 0 0 0-.37 2.2c0 .77.12 1.5.37 2.2.24.7.6 1.3 1.06 1.8a5.28 5.28 0 0 0 1.66 1.25c.64.3 1.36.46 2.16.46s1.53-.15 2.18-.46a5.22 5.22 0 0 0 1.68-1.24 5.58 5.58 0 0 0 1.08-1.8zm7.92 6.8v-18H47.4v4.14h-7.22v13.85h-4.2zm26.67-15.57V9.03h4.2v18h-4.2v-2.44c-.56.9-1.37 1.6-2.4 2.1-1.05.53-2.1.78-3.16.78-1.37 0-2.62-.25-3.75-.75a8.76 8.76 0 0 1-2.92-2.06 9.6 9.6 0 0 1-1.9-3 9.72 9.72 0 0 1-.66-3.64c0-1.26.22-2.47.67-3.6a9.56 9.56 0 0 1 1.9-3.04 8.77 8.77 0 0 1 2.9-2.08c1.14-.5 2.4-.75 3.75-.75 1.05 0 2.1.26 3.14.77 1.04.52 1.85 1.22 2.4 2.12zm-.38 8.77a6.3 6.3 0 0 0 .38-2.2c0-.78-.13-1.5-.38-2.2A5.58 5.58 0 0 0 61.2 14a5.23 5.23 0 0 0-1.7-1.22c-.65-.3-1.38-.47-2.17-.47-.8 0-1.52.17-2.17.48A5.3 5.3 0 0 0 53.5 14a5.3 5.3 0 0 0-1.06 1.83 6.56 6.56 0 0 0-.36 2.2c0 .77.12 1.5.36 2.2.25.7.6 1.3 1.06 1.8a5.28 5.28 0 0 0 1.66 1.25c.65.3 1.37.46 2.17.46.8 0 1.52-.15 2.18-.46a5.22 5.22 0 0 0 1.7-1.24 5.58 5.58 0 0 0 1.07-1.8zm21.46-11.2H88l-6.9 18h-5.3l-6.9-18h4.25l5.3 13.78 5.28-13.77zm13.44-.46c5.73 0 9.64 5.08 8.9 11.02H92.1c0 1.54 1.58 4.54 5.3 4.54 3.2 0 5.35-2.8 5.35-2.8l2.84 2.2c-2.55 2.7-4.63 3.95-7.9 3.95-5.82 0-9.76-3.7-9.76-9.47 0-5.23 4.08-9.46 9.23-9.46zm-5.05 7.9h10.1c-.04-.35-.6-4.56-5.08-4.56-4.5 0-4.98 4.22-5.02 4.56zM108.82 27V0h4.2v27.02h-4.2z"
 >
</svg>
SVG;

$phpSvg = <<<'SVG'
<svg
  class="header-logo"
  data-hover-image="assets/img/other/hero_hover_php_16x9.webp"
  viewBox="0 0 96.17000000000002 48.124"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>PHP</title>
  <path
    fill="var(--text-color, currentColor)"
    d="M7.579 10.123h14.204c4.169.035 7.19 1.237 9.063 3.604s2.491 5.6 1.855 9.699c-.247 1.873-.795 3.71-1.643 5.512a16.385 16.385 0 0 1-3.392 4.876c-1.767 1.837-3.657 3.003-5.671 3.498s-4.099.742-6.254.742h-6.36l-2.014 10.07H0zm6.201 6.042l-3.18 15.9c.212.035.424.053.636.053h.742c3.392.035 6.219-.3 8.48-1.007 2.261-.742 3.781-3.321 4.558-7.738.636-3.71 0-5.848-1.908-6.413-1.873-.565-4.222-.83-7.049-.795-.424.035-.83.053-1.219.053h-1.113zM41.093 0h7.314L46.34 10.123h6.572c3.604.071 6.289.813 8.056 2.226 1.802 1.413 2.332 4.099 1.59 8.056l-3.551 17.649h-7.42L54.979 21.2c.353-1.767.247-3.021-.318-3.763s-1.784-1.113-3.657-1.113l-5.883-.053-4.346 21.783h-7.314zM70.412 10.123h14.204c4.169.035 7.19 1.237 9.063 3.604s2.491 5.6 1.855 9.699c-.247 1.873-.795 3.71-1.643 5.512a16.385 16.385 0 0 1-3.392 4.876c-1.767 1.837-3.657 3.003-5.671 3.498s-4.099.742-6.254.742h-6.36L70.2 48.124h-7.367zm6.201 6.042l-3.18 15.9c.212.035.424.053.636.053h.742c3.392.035 6.219-.3 8.48-1.007 2.261-.742 3.781-3.321 4.558-7.738.636-3.71 0-5.848-1.908-6.413-1.873-.565-4.222-.83-7.049-.795-.424.035-.83.053-1.219.053H76.56z"
 ></svg>
SVG;

$dnbxSvgInner = <<<'SVG'
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 160 48"
  class="build-dnbx"
  aria-hidden="true"
>
  <g transform="translate(0,0)">
    <line x1="10" y1="8" x2="10" y2="40" class="dnbx-spine"></line>
    <path
      d="M20 8 L26 8 C34.836 8 42 15.163 42 24 C42 32.836 34.836 40 26 40 L20 40"
      class="dnbx-curve"
    ></path>
    <rect x="24" y="20" width="8" height="8" rx="2.5" class="dnbx-node"></rect>
  </g>
  <text x="56" y="32" class="dnbx-text">
    DNBX
    <tspan class="dnbx-tld">.de</tspan>
  </text>
</svg>
SVG;
?>

<div class="hero-container">
  <div class="hero-spreaded-icons">
    <div class="icon-spreaded-wrapper icon-tailwind">
      <div class="icon-spreaded"></div>
    </div>
    <div class="icon-spreaded-wrapper icon-laravel">
      <div class="icon-spreaded"></div>
    </div>
    <div class="icon-spreaded-wrapper icon-php">
      <div class="icon-spreaded"></div>
    </div>
  </div>

  <?php if ($isEn): ?>
  <div class="introduction">
    <h2>
      Hey there <span class="animated-hand">👋</span
      ><span class="animated-exclamation_mark">!</span>
    </h2>
    <h3 class="hero-title">
      I'm
      <span class="name"
        ><span aria-label="F">F</span><span aria-label="a">a</span
        ><span aria-label="b">b</span><span aria-label="i">i</span
        ><span aria-label="a">a</span><span aria-label="n">n</span>
        <span aria-label="T">T</span><span aria-label="e">e</span
        ><span aria-label="r">r</span><span aria-label="n">n</span
        ><span aria-label="i">i</span
        ><span aria-label="s">s</span></span
      >, a self-taught <span class="location">German</span>
      <span class="designed" id="designed-en">
        webdeveloper
        <span class="designed-handle tl"></span>
        <span class="designed-handle tr"></span>
        <span class="designed-handle bl"></span>
        <span class="designed-handle br"></span>
        <span class="designed-badge">0 × 0</span>
      </span>
      <span class="specialization"
        >specializing in
        <?= $laravelSvg ?>
        &amp;
        <?= $phpSvg ?>
        .</span
      >
      <br><span class="smaller-intro"
        ><span class="buildings"
          >I build Stuff like
          <a
            href="https://dnbx.de?ref=fabianternis.de_hero_build_item"
            target="_blank"
            class="build-item"
            data-hover-image="assets/img/other/hero_hover_build_dnbx.de.png"
            data-hover-title="Domain Box"
            data-hover-subtitle="A private system for managing domains."
          >
            <?= $dnbxSvgInner ?>
          </a></span
        ></span
      >
    </h3>
  </div>
  <?php else: ?>
  <div class="introduction">
    <h2>
      Hallo <span class="animated-hand">👋</span
      ><span class="animated-exclamation_mark">!</span>
    </h2>
    <h3 class="hero-title">
      Ich bin
      <span class="name"
        ><span aria-label="F">F</span><span aria-label="a">a</span
        ><span aria-label="b">b</span><span aria-label="i">i</span
        ><span aria-label="a">a</span><span aria-label="n">n</span>
        <span aria-label="T">T</span><span aria-label="e">e</span
        ><span aria-label="r">r</span><span aria-label="n">n</span
        ><span aria-label="i">i</span
        ><span aria-label="s">s</span></span
      >.<br>Ein selbsterlernter
      <span class="designed" id="designed-de">
        Webentwickler
        <span class="designed-handle tl"></span>
        <span class="designed-handle tr"></span>
        <span class="designed-handle bl"></span>
        <span class="designed-handle br"></span>
        <span class="designed-badge">0 × 0</span>
      </span>
      aus <span class="location">Rheinland-Pfalz</span>, der sich auf
      <span class="specialization"
        ><?= $laravelSvg ?>
        &amp;
        <?= $phpSvg ?>
        spezialisiert hat.</span
      >
      <br><span class="smaller-intro"
        ><span class="buildings"
          >Ich baue Dinge wie
          <a
            href="https://dnbx.de?ref=fabianternis.de_hero_build_item"
            target="_blank"
            class="build-item"
            data-hover-image="assets/img/other/hero_hover_build_dnbx.de.png"
            data-hover-title="Domain Box"
            data-hover-subtitle="Ein privates System zur Domainverwaltung."
          >
            <?= $dnbxSvgInner ?>
          </a></span
        ></span
      >
    </h3>
  </div>
  <?php endif; ?>
</div>

<div class="hero-stats">
  <div class="hero-stat">
    <span class="hero-stat-number" data-target="111" data-suffix="+"
      >0+</span
    >
    <span class="hero-stat-label">
      <?= $isEn ? 'Domains owned' : 'Domains besessen' ?>
    </span>
  </div>
  <div class="hero-stat-divider"></div>
  <div class="hero-stat">
    <span class="hero-stat-number" data-target="8" data-suffix="+"
      >0+</span
    >
    <span class="hero-stat-label">
      <?= $isEn ? 'Projects live' : 'Projekte live' ?>
    </span>
  </div>
  <div class="hero-stat-divider"></div>
  <div class="hero-stat">
    <span class="hero-stat-number" data-target="7" data-suffix="+"
      >0+</span
    >
    <span class="hero-stat-label">
      <?= $isEn ? 'MTEX services' : 'MTEX Dienste' ?>
    </span>
  </div>
</div>

<div class="site-info HIDDEN">
  <h2><?= $isEn ? 'What is this site for?' : 'Wofür ist diese Seite?' ?></h2>
  <p>
    <?php if ($isEn): ?>
      This website is for presenting my Webdevelopment-skills in a
      <span class="cursor-animated text-animated">playful</span> way.
    <?php else: ?>
      Diese Seite ist für das
      <span class="cursor-animated text-animated">spielvolle</span>
      präsentieren meines Webentwicklungs-könnens.
    <?php endif; ?>
  </p>
</div>
