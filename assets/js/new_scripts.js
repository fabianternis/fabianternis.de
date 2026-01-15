const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("languageSwitch");
const htmlElement = document.documentElement;
const body = document.body;

const getStoredTheme = () => localStorage.getItem("theme") || "auto";
const getStoredLang = () => localStorage.getItem("lang") || "en";
/*
const applyTheme = (theme) => {
    themeToggle.classList.add("is-rotating");
    //body.classList.add("content-reload");

    setTimeout(() => {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        //body.classList.remove("content-reload");
        setTimeout(() => {
            themeToggle.classList.remove("is-rotating");
        }, 300);
    }, 300);
};*/

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
            const remainingTime = Math.max(0, 300 - elapsedTime);

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


const trackProjectScroll = () => {
  const items = document.querySelectorAll(".project-item");

  const observerOptions = {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
  };

  const handleScroll = () => {
    const vh = window.innerHeight;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      
      const distanceFromCenter = itemCenter - vh / 2;
      
      if (rect.top < vh && rect.bottom > 0) {
        let progress = distanceFromCenter / (vh / 2);
        
        progress = Math.min(Math.max(progress, 0), 1);

        const direction = index % 2 === 0 ? 1 : -1;
        const maxMove = 50; 
        const translateX = progress * maxMove * direction;
        const opacity = 1 - (progress * 0.35);

        item.style.transform = `translateX(${translateX}px)`;
        item.style.opacity = opacity;
      }
    });
  };

  window.addEventListener("scroll", () => {
    requestAnimationFrame(handleScroll);
  });
  
  handleScroll();
};

document.addEventListener("DOMContentLoaded", trackProjectScroll);