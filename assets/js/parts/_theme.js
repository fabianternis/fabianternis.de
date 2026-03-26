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
    // Fade-out all language-sensitive elements, swap, then fade back in
    const targets = document.querySelectorAll("[data-language]");
    targets.forEach(el => {
        el.style.transition = "opacity 0.18s ease, transform 0.18s ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(6px)";
    });
    setTimeout(() => {
        callback();
        // After language swap, fade back in
        const updated = document.querySelectorAll("[data-language]");
        updated.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(-6px)";
        });
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                updated.forEach(el => {
                    el.style.opacity = "";
                    el.style.transform = "";
                });
            });
        });
    }, 200);
};

export const applyLanguage = (lang, initNameAnimationsFn) => {
    htmlElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    if (initNameAnimationsFn) initNameAnimationsFn();

    // Flip the flag button
    langToggle.classList.add("flag-flip");
    setTimeout(() => {
        langToggle.innerHTML = `<img src="assets/img/flags/${lang}.png" class="flag">`;
        langToggle.classList.remove("flag-flip");
    }, 150);
};

themeToggle.addEventListener("click", () => {
    const themes = ["auto", "light", "dark"];
    const nextTheme = themes[(themes.indexOf(getStoredTheme()) + 1) % themes.length];
    applyTheme(nextTheme);
});
