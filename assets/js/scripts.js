import { getStoredTheme, getStoredLang, applyTheme, applyLanguage, executeWithTransition } from './parts/_theme.js';
import { initNavigation } from './parts/_navigation.js';
import { initNameAnimations, /*trackProjectScroll,*/ initCounters, initDomainsAPI, initLightbox, initHeroTooltips, initHeroIconMovement, initWorkScroll, initProjectModals } from './parts/_animations.js';
import { initModals } from './parts/_modals.js';
import { initStatusAPI } from './parts/_status.js';
import { initSearch } from './parts/_search.js';
import { initResume } from './parts/_resume.js';

const langToggle = document.getElementById("languageSwitch");

langToggle.addEventListener("click", () => {
    const nextLang = document.documentElement.getAttribute("lang") === "en" ? "de" : "en";
    executeWithTransition(() => applyLanguage(nextLang, () => {
        initNameAnimations();
        initHeroIconMovement();
        initWorkScroll();
        initProjectModals();
    }));
});

applyTheme(getStoredTheme());
applyLanguage(getStoredLang(), () => {
    initNameAnimations();
    initHeroIconMovement();
    initWorkScroll();
    initProjectModals();
});

document.addEventListener("DOMContentLoaded", () => {
    /*trackProjectScroll();*/
    initNavigation();
    initCounters();
    initDomainsAPI();
    initLightbox();
    initHeroTooltips();
    initHeroIconMovement();
    initWorkScroll();
    initProjectModals();
    initModals();
    initStatusAPI();
    /*initWorkScroll();*/
    initSearch();
    initResume();
});
