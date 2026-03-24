const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("languageSwitch");
const htmlElement = document.documentElement;
const body = document.body;

export const getStoredTheme = () => localStorage.getItem("theme") || "auto";
export const getStoredLang  = () => localStorage.getItem("lang")  || "en";

export const applyTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
};

export const executeWithTransition = (callback) => {
    body.classList.add("content-reload");
    setTimeout(() => {
        callback();
        setTimeout(() => body.classList.remove("content-reload"), 100);
    }, 400);
};

export const applyLanguage = (lang, initNameAnimationsFn) => {
    htmlElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    if (initNameAnimationsFn) initNameAnimationsFn();
    langToggle.innerHTML = `<img src="assets/img/flags/${lang}.png" class="flag">`;
};

themeToggle.addEventListener("click", () => {
    const themes = ["auto", "light", "dark"];
    const nextTheme = themes[(themes.indexOf(getStoredTheme()) + 1) % themes.length];
    applyTheme(nextTheme);
});
