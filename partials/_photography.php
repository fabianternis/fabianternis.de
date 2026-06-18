<?php $isEn = ($lang === 'en'); ?>
<section id="photography">
  <h1 class="section-title">
    <?= $isEn ? 'Photography' : 'Fotografie' ?>
  </h1>

  <div class="photography-grid">
    <div class="photography-item">
      <h2><?= $isEn ? 'Daylily with Raindrops' : 'Taglilie mit Regentropfen' ?></h2>
      <img
        src="assets/img/photography/Daylily with Raindrops.jpg"
        alt="<?= $isEn
          ? 'A detailed close-up shot of an orange and yellow Daylily covered in fresh raindrops. Photographed by Fabian Ternis.'
          : 'Eine detailreiche Nahaufnahme einer orange-gelben Taglilie, die mit frischen Regentropfen übersät ist. Foto von Fabian Ternis.' ?>"
        loading="lazy"
      >
    </div>

    <div class="photography-item">
      <h2><?= $isEn ? 'Pink Speckled Rose' : 'Rosa gesprenkelte Rose' ?></h2>
      <img
        src="assets/img/photography/Pink Speckled Rose.jpg"
        alt="<?= $isEn
          ? 'A top-down close-up of a blooming rose with ruffled white petals and magenta speckles. Photographed by Fabian Ternis.'
          : 'Nahaufnahme einer blühenden Rose mit weiß-pink gesprenkelten Blütenblättern. Foto von Fabian Ternis.' ?>"
        loading="lazy"
      >
    </div>
  </div>
</section>
