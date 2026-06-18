<?php $isEn = ($lang === 'en'); ?>
<section id="resume">
  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    "
  >
    <h1 class="section-title" style="margin-bottom: 0">
      <?= $isEn ? 'Resume' : 'Lebenslauf' ?>
    </h1>
    <button
      id="openResumeModalBtn"
      class="button"
      style="font-size: 0.85rem; padding: 0.5rem 1rem"
    >
      <?= $isEn ? 'Open Resume' : 'Lebenslauf öffnen' ?>
      <svg
        style="width: 16px; height: 16px; margin-left: 0.5rem"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
       >
      </svg>
    </button>
  </div>
</section>
