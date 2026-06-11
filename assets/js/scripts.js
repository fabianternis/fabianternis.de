import { getStoredTheme, getStoredLang, applyTheme, applyLanguage, executeWithTransition } from './parts/_theme.js';
import { initNavigation } from './parts/_navigation.js';
import { initNameAnimations, /*trackProjectScroll,*/ initCounters, initDomainsAPI, initLightbox, initHeroTooltips, initHeroIconMovement, /*initWorkScroll*/ } from './parts/_animations.js';
import { initModals } from './parts/_modals.js';
import { initStatusAPI } from './parts/_status.js';
import { initSearch } from './parts/_search.js';

const langToggle = document.getElementById("languageSwitch");

langToggle.addEventListener("click", () => {
    const nextLang = document.documentElement.getAttribute("lang") === "en" ? "de" : "en";
    executeWithTransition(() => applyLanguage(nextLang, () => {
        initNameAnimations();
        initHeroIconMovement();
    }));
});

applyTheme(getStoredTheme());
applyLanguage(getStoredLang(), () => {
    initNameAnimations();
    initHeroIconMovement();
});

document.addEventListener("DOMContentLoaded", () => {
    /*trackProjectScroll();*/
    initNavigation();
    initCounters();
    initDomainsAPI();
    initLightbox();
    initHeroTooltips();
    initHeroIconMovement();
    initModals();
    initStatusAPI();
    /*initWorkScroll();*/
    initSearch();
});
