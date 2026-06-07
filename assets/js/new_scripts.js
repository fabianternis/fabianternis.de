import { getStoredTheme, getStoredLang, applyTheme, applyLanguage, executeWithTransition } from './parts/_theme.js';
import { initNavigation } from './parts/_navigation.js';
import { initNameAnimations, trackProjectScroll, initCounters, initDomainsAPI, initLightbox } from './parts/_animations.js';

const langToggle = document.getElementById("languageSwitch");

langToggle.addEventListener("click", () => {
    const nextLang = document.documentElement.getAttribute("lang") === "en" ? "de" : "en";
    executeWithTransition(() => applyLanguage(nextLang, initNameAnimations));
});

applyTheme(getStoredTheme());
applyLanguage(getStoredLang(), initNameAnimations);

document.addEventListener("DOMContentLoaded", () => {
    trackProjectScroll();
    initNavigation();
    initCounters();
    initDomainsAPI();
    initLightbox();
});
