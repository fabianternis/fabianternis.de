<?php
// Shared close-button SVG used in every modal
$closeSvg = <<<'SVG'
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  width="24"
  height="24"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18L18 6M6 6l12 12"
 >
</svg>
SVG;
?>

<!-- Modals -->

<!-- Resume Modal -->
<div
  id="resumeModal"
  class="modal-overlay"
  aria-hidden="true"
  style="display: none"
>
  <div class="modal-content">
    <button class="modal-close" aria-label="Close Modal">
      <?= $closeSvg ?>
    </button>
    <div class="modal-body">
      <div
        style="display: flex; ustify-content: flex-end; margin-bottom: 1rem;">
        <a
          href="https://github.com/fabianternis/fabianternis/blob/main/RESUME.md"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          style="font-size: 0.85rem; padding: 0.5rem 1rem"
        >
          <span data-language="en">View on GitHub</span>
          <span data-language="de">Auf GitHub ansehen</span>
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
        </a>
      </div>
      <div class="resume-wrapper">
        <div
          id="resume-controls"
          class="resume-controls"
          style="display: none"
        >
          <button
            class="resume-toggle-btn active"
            data-view="formatted"
            data-language="en"
          >
            Formatted
          </button>
          <button
            class="resume-toggle-btn active"
            data-view="formatted"
            data-language="de"
          >
            Formatiert
          </button>
          <button class="resume-toggle-btn" data-view="raw">
            Raw Markdown
          </button>
        </div>

        <div id="resume-content" class="markdown-viewer">
          <div class="loader-wrapper">
            <div class="loader" aria-hidden="true">
              <span class="loader-spinner"></span>
            </div>
          </div>
        </div>
        <pre
          id="resume-raw"
          class="resume-raw-content"
          style="display: none"
        ></pre>
      </div>
    </div>
  </div>
</div>

<!-- Imprint Modal -->
<div
  id="imprintModal"
  class="modal-overlay"
  aria-hidden="true"
  style="display: none"
>
  <div class="modal-content">
    <button class="modal-close" aria-label="Close Modal">
      <?= $closeSvg ?>
    </button>
    <div class="modal-body">
      <div data-language="de">
        <h2>Impressum</h2>
        <p><strong>Angaben gemäß § 5 TMG:</strong></p>
        <p>
          Fabian Ternis<br>
          Alzeyer Str. 97<br>
          67592 Flörsheim-Dalsheim<br>
          Rheinland-Pfalz, Deutschland
        </p>
        <p><strong>Kontakt:</strong></p>
        <p>
          <canvas
            class="email-canvas"
            data-e1="f.ternis"
            data-e2="xpsystems.eu"
            width="300"
            height="20"
          ></canvas
          ><br>
          <canvas
            class="email-canvas"
            data-e1="fabian"
            data-e2="ternismail.de"
            width="300"
            height="20"
          ></canvas>
        </p>
        <p>
          <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
        </p>
        <p>
          Fabian Ternis<br>
          Alzeyer Str. 97<br>
          67592 Flörsheim-Dalsheim
        </p>
        <p>
          Domain bereitgestellt von dnbx.de ("Domain Box") (dnbx.de ist ein
          Projekt von Fabian Ternis).<br>
          Webdesign und Webentwicklung von ternis-edv.de und xpsystems.eu
          (durch Fabian Ternis).
        </p>
        <p>
          Die Seite wird möglicherweise auf "GitHub Pages" (von Microsoft)
          gehostet.
        </p>
        <p>Wir sammeln KEINE Cookies.</p>
      </div>
      <div data-language="en">
        <h2>Imprint</h2>
        <p><strong>Information pursuant to § 5 TMG:</strong></p>
        <p>
          Fabian Ternis<br>
          Alzeyer Str. 97<br>
          67592 Flörsheim-Dalsheim<br>
          Rhineland-Palatinate, Germany
        </p>
        <p><strong>Contact:</strong></p>
        <p>
          <canvas
            class="email-canvas"
            data-e1="f.ternis"
            data-e2="xpsystems.eu"
            width="300"
            height="20"
          ></canvas
          ><br>
          <canvas
            class="email-canvas"
            data-e1="fabian"
            data-e2="ternismail.de"
            width="300"
            height="20"
          ></canvas>
        </p>
        <p>
          <strong>Responsible for content according to § 55 paragraph 2 RStV:</strong>
        </p>
        <p>
          Fabian Ternis<br>
          Alzeyer Str. 97<br>
          67592 Flörsheim-Dalsheim
        </p>
        <p>
          Domain provided by dnbx.de ("Domain Box") (dnbx.de is a Fabian
          Ternis Project).<br>
          Webdesign and webdevelopment by ternis-edv.de and xpsystems.eu (by
          Fabian Ternis).
        </p>
        <p>The page may be hosted on "GitHub Pages" (by Microsoft).</p>
        <p>We do NOT collect Cookies.</p>
      </div>
    </div>
  </div>
</div>

<!-- Privacy Modal -->
<div
  id="privacyModal"
  class="modal-overlay"
  aria-hidden="true"
  style="display: none"
>
  <div class="modal-content">
    <button class="modal-close" aria-label="Close Modal">
      <?= $closeSvg ?>
    </button>
    <div class="modal-body">
      <div data-language="de">
        <h2>Datenschutzerklärung</h2>
        <h3>1. Datenschutz auf einen Blick</h3>
        <p>
          <strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben
          einen einfachen Überblick darüber, was mit Ihren personenbezogenen
          Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
          Daten sind alle Daten, mit denen Sie persönlich identifiziert
          werden können.
        </p>
        <h3>2. Hosting</h3>
        <p>
          <strong>GitHub Pages:</strong> Diese Website wird möglicherweise
          auf GitHub Pages gehostet, einem Dienst der GitHub Inc., einem
          Tochterunternehmen von Microsoft. Der Anbieter erhebt und
          speichert automatisch Informationen in so genannten
          Server-Log-Dateien, die Ihr Browser automatisch übermittelt.
          Weitere Informationen entnehmen Sie bitte der Datenschutzerklärung
          von GitHub:
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub Privacy Statement</a
          >.
        </p>
        <h3>3. Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Cookies:</strong> Diese Website verwendet KEINE Cookies.
          Wir verzichten auf jegliches Tracking oder die Analyse Ihres
          Nutzerverhaltens. Einzig Ihre gewählten Präferenzen bezüglich des
          Farbschemas ("Dark-Mode") werden im lokalen Speicher
          ("localStorage") Ihres Browsers gespeichert. Hierbei handelt es
          sich nicht um personenbezogene Daten.
        </p>
        <p>
          <strong>Kontaktanfragen:</strong> Wenn Sie uns per E-Mail
          kontaktieren, wird Ihre Anfrage inklusive aller daraus
          hervorgehenden personenbezogenen Daten (Name, Anfrage) zwecks
          Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
          Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
      </div>
      <div data-language="en">
        <h2>Privacy Policy</h2>
        <h3>1. Privacy at a Glance</h3>
        <p>
          <strong>General Information:</strong> The following notes give a
          simple overview of what happens to your personal data when you
          visit this website. Personal data is all data with which you could
          be personally identified.
        </p>
        <h3>2. Hosting</h3>
        <p>
          <strong>GitHub Pages:</strong> This website may be hosted on
          GitHub Pages, a service of GitHub Inc., a subsidiary of Microsoft.
          The provider automatically collects and stores information in
          so-called server log files, which your browser automatically
          transmits. For more information, please refer to the GitHub
          Privacy Statement:
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub Privacy Statement</a
          >.
        </p>
        <h3>3. Data Collection on this Website</h3>
        <p>
          <strong>Cookies:</strong> This website does NOT use cookies. We do
          not track or analyze your user behavior in any way. Only your
          chosen preferences regarding the color scheme ("dark mode") are
          stored in the local storage ("localStorage") of your browser. This
          does not involve personal data.
        </p>
        <p>
          <strong>Contact Inquiries:</strong> If you contact us by email,
          your inquiry, including all resulting personal data (name,
          inquiry), will be stored and processed by us for the purpose of
          processing your request. We do not pass these data on without your
          consent.
        </p>
      </div>
    </div>
  </div>
</div>

<!-- Project Details Modal -->
<div
  id="projectDetailsModal"
  class="modal-overlay"
  aria-hidden="true"
  style="display: none"
>
  <div class="modal-content project-details-modal-content">
    <button class="modal-close" aria-label="Close Modal">
      <?= $closeSvg ?>
    </button>

    <button
      class="project-modal-nav project-modal-prev"
      aria-label="Previous Project"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
       >
      </svg>
    </button>
    <button
      class="project-modal-nav project-modal-next"
      aria-label="Next Project"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
       >
      </svg>
    </button>

    <div class="project-details-body">
      <div class="project-details-info-sidebar">
        <!-- Info injected via JS -->
      </div>
      <div class="project-details-main-content">
        <!-- Images injected via JS -->
      </div>
    </div>
  </div>
</div>
