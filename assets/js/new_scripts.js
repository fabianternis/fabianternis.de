const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("languageSwitch");
const htmlElement = document.documentElement;
const body = document.body;

const getStoredTheme = () => localStorage.getItem("theme") || "auto";
const getStoredLang = () => localStorage.getItem("lang") || "en";

const applyTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
};

const executeWithTransition = (callback) => {
    body.classList.add("content-reload");

    setTimeout(() => {
        callback();
        
        setTimeout(() => {
            body.classList.remove("content-reload");
        }, 100); 
    }, 400);
};

const applyLanguage = (lang) => {
    htmlElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    initNameAnimations();
    langToggle.innerHTML = `<img src="assets/img/flags/${lang}.png" class="flag">`;
};

const initNameAnimations = () => {
    const lang = htmlElement.getAttribute("lang");
    const activeIntroduction = document.querySelector(
        `.introduction[data-language="${lang}"]`
    );

    if (!activeIntroduction) return;

    const nameContainer = activeIntroduction.querySelector(".name");
    if (!nameContainer) return;

    const characters = nameContainer.querySelectorAll("span[aria-label]");
    const cursorUrl = "url('/assets/svg/arrowhead-rounded-outline.svg'), auto";

    characters.forEach((char) => {
        char.style.cursor = cursorUrl;
        let startTime;

        char.addEventListener("mouseenter", () => {
            startTime = Date.now();
            char.classList.add("bounce");
            char.classList.remove("after-bounce");
        });

        char.addEventListener("mouseleave", () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 400 - elapsedTime);

            setTimeout(() => {
                char.classList.remove("bounce");
                char.classList.add("after-bounce");
            }, remainingTime);
        });
    });
};

themeToggle.addEventListener("click", () => {
    const themes = ["auto", "light", "dark"];
    const nextTheme = themes[(themes.indexOf(getStoredTheme()) + 1) % themes.length];
    
    //executeWithTransition(() => applyTheme(nextTheme));
    applyTheme(nextTheme);
});

langToggle.addEventListener("click", () => {
    const nextLang = htmlElement.getAttribute("lang") === "en" ? "de" : "en";
    
    executeWithTransition(() => applyLanguage(nextLang));
});

applyTheme(getStoredTheme());
applyLanguage(getStoredLang());