<?php
/**
 * index.php — Main entry point
 *
 * Renders the full page using PHP partials.
 * Localization is FRONTEND-BASED: two locale wrappers are rendered
 * (data-body-locale="en" and data-body-locale="de"), and a single
 * `data-locale` attribute on <body> drives which one is visible via CSS.
 * JavaScript only needs to flip that one attribute when the user switches.
 */

// Determine the default locale from localStorage is not possible server-side,
// so we default to 'en'. The JS will immediately correct it on load using
// the stored preference — no flash because <body data-locale> is set here.
$defaultLang = 'en';
?>
<!doctype html>
<html lang="<?= htmlspecialchars($defaultLang) ?>">
<?php include __DIR__ . '/partials/_head.php'; ?>
<style>
  .HIDDEN {
    display: none;
    visibility: hidden;
  }

  /*
   * Locale switching — the single data-locale attribute on <body>
   * controls which locale wrapper is shown. JS flips body[data-locale]
   * on language toggle; no per-element show/hide needed.
   */
  [data-body-locale] { display: none; }
  body[data-locale="en"] [data-body-locale="en"] { display: block; }
  body[data-locale="de"] [data-body-locale="de"] { display: block; }

  /*
   * The modals (imprint, privacy) still use data-language internally
   * because they are shared overlays rendered once outside both locale
   * wrappers. The existing JS for those still works as-is.
   */
  [data-language] { display: none; }
  body[data-locale="en"] [data-language="en"] { display: revert; }
  body[data-locale="de"] [data-language="de"] { display: revert; }

</style>
<body class="scrolled" data-locale="<?= htmlspecialchars($defaultLang) ?>">

  <!-- ═══════════════════════════════════════════════════════════
       LOCALE: English
  ════════════════════════════════════════════════════════════════ -->
  <div data-body-locale="en">
    <div class="top-bg"></div>
    <?php $lang = 'en'; include __DIR__ . '/partials/_nav.php'; ?>
    <main>
      <div class="content-wrapper">
        <?php $lang = 'en'; include __DIR__ . '/partials/_hero.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_socials.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_technologies.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_resume_section.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_my-work.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_mtex.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_status.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_just-some-info.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_photography.php'; ?>
        <?php $lang = 'en'; include __DIR__ . '/partials/_domains.php'; ?>
        <!--section id="custom-video-player">
          <video src="assets/video/example.mp4"></video>
        </section-->
      </div>
    </main>
    <?php $lang = 'en'; include __DIR__ . '/partials/_footer.php'; ?>
  </div>

  <!-- ═══════════════════════════════════════════════════════════
       LOCALE: German
  ════════════════════════════════════════════════════════════════ -->
  <div data-body-locale="de">
    <div class="top-bg"></div>
    <?php $lang = 'de'; include __DIR__ . '/partials/_nav.php'; ?>
    <main>
      <div class="content-wrapper">
        <?php $lang = 'de'; include __DIR__ . '/partials/_hero.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_socials.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_technologies.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_resume_section.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_my-work.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_mtex.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_status.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_just-some-info.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_photography.php'; ?>
        <?php $lang = 'de'; include __DIR__ . '/partials/_domains.php'; ?>
      </div>
    </main>
    <?php $lang = 'de'; include __DIR__ . '/partials/_footer.php'; ?>
  </div>

  <!-- ═══════════════════════════════════════════════════════════
       SHARED OVERLAYS (position: fixed — float above both locales)
       Rendered once; modals/lightbox/search/tooltip are locale-agnostic
       at the structural level (bilingual content inside them uses
       data-language, handled by the body[data-locale] CSS rules above).
  ════════════════════════════════════════════════════════════════ -->
  <?php include __DIR__ . '/partials/_lightbox.php'; ?>
  <?php include __DIR__ . '/partials/_modals.php'; ?>
  <?php include __DIR__ . '/partials/_search.php'; ?>
  <?php include __DIR__ . '/partials/_effects.php'; ?>

  <script type="module" src="assets/js/scripts.js"></script>
</body>
</html>
