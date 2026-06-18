<?php $isEn = ($lang === 'en'); ?>
<footer>
  <div class="footer-content">
    <ul>
      <li>
        <a href="#" id="imprint-link"><?= $isEn ? 'Imprint' : 'Impressum' ?></a>
      </li>
      <li>
        <a href="#" id="privacy-link"><?= $isEn ? 'Privacy' : 'Datenschutz' ?></a>
      </li>
      <li>
        <a href="#"><?= $isEn ? 'Contact' : 'Kontakt' ?></a>
      </li>
    </ul>
  </div>
</footer>
