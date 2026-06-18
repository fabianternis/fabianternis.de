<?php
// $lang is provided by the including file ('en' or 'de')
$isEn = ($lang === 'en');
?>
<nav>
  <!--a class="logo prevent-select" href="/#">fabianternis</a-->
  <a class="logo prevent-select" href="#">fabianternis</a>
  <button
    class="hamburger-menu"
    aria-label="Toggle menu"
    aria-expanded="false"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ul class="nav-links-container">
    <!--li class="nav-link"><a href="#resume">Resume</a></li-->
    <li class="nav-link"><a href="#my-work">Work</a></li>
    <li class="nav-link"><a href="#domains">Domains</a></li>
    <li class="nav-link"><a href="#mtexdotdev">MTEX.dev</a></li>
    <li class="nav-link"><a href="#status">Status</a></li>
  </ul>
  <ul class="nav-links prevent-select">
    <button class="nav-search-btn search-trigger">
      <svg
        class="nav-search-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
       >
      </svg>
      <span>Search</span>
      <span class="nav-search-kbd">⌘K</span>
    </button>
    <div id="themeToggle<?= $isEn ? '' : '-de' ?>">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="dark-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
       >
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="light-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
       >
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="auto-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
       >
      </svg>
    </div>

    <button id="languageSwitch<?= $isEn ? '' : '-de' ?>">
      <img src="assets/img/flags/<?= htmlspecialchars($lang) ?>.png" class="flag">
    </button>
  </ul>
</nav>
