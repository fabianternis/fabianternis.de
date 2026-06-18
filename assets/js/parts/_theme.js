/**
 * _theme.js
 *
 * Theme + language switching.
 *
 * Language strategy (PHP-partials dual-locale approach):
 *   - PHP renders two `[data-body-locale]` wrappers (en + de) inside one <body>.
 *   - CSS shows/hides them via `body[data-locale]` — a single attribute.
 *   - `applyLanguage()` just flips that one attribute; no per-element toggling.
 */

const htmlElement = document.documentElement;
const body        = document.body;

export const getStoredTheme = () => localStorage.getItem("theme") || "auto";
export const getStoredLang  = () => localStorage.getItem("lang")  || "en";

// ─── Theme ────────────────────────────────────────────────────────────────────

export const applyTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
};

// Theme toggle — delegated so it works for buttons in either locale wrapper
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[id^='themeToggle']");
    if (!btn) return;
    const themes    = ["auto", "light", "dark"];
    const nextTheme = themes[(themes.indexOf(getStoredTheme()) + 1) % themes.length];
    applyTheme(nextTheme);
});

// ─── Language ─────────────────────────────────────────────────────────────────

/**
 * Returns the currently visible locale wrapper element.
 * @returns {Element|null}
 */
export const getActiveLocaleWrapper = () =>
    document.querySelector(`[data-body-locale="${body.dataset.locale}"]`);

/**
 * Swap language by flipping `body[data-locale]` and updating html[lang].
 * The CSS in index.php handles visibility — no JS per-element toggling needed.
 *
 * @param {string}        lang                - 'en' or 'de'
 * @param {Function|null} initNameAnimationsFn - optional callback after swap
 */
export const applyLanguage = (lang, initNameAnimationsFn) => {
    htmlElement.setAttribute("lang", lang);
    body.setAttribute("data-locale", lang);
    localStorage.setItem("lang", lang);

    // Update all language-switch flag buttons (one per locale wrapper)
    document.querySelectorAll("[id^='languageSwitch']").forEach(btn => {
        btn.classList.add("flag-flip");
        setTimeout(() => {
            btn.innerHTML = `<img src="assets/img/flags/${lang}.png" class="flag">`;
            btn.classList.remove("flag-flip");
        }, 150);
    });

    if (initNameAnimationsFn) initNameAnimationsFn();
};

/**
 * Wraps a language-swap callback in a brief fade-out/in transition.
 * Targets the currently visible [data-body-locale] wrapper.
 *
 * @param {Function} callback - the language-swap function to call mid-transition
 */
export const executeWithTransition = (callback) => {
    const currentWrapper = getActiveLocaleWrapper();
    const targets = currentWrapper ? [currentWrapper] : [];

    targets.forEach(el => {
        el.style.transition = "opacity 0.18s ease, transform 0.18s ease";
        el.style.opacity    = "0";
        el.style.transform  = "translateY(6px)";
    });

    setTimeout(() => {
        callback();

        const newWrapper = getActiveLocaleWrapper();
        const updated = newWrapper ? [newWrapper] : [];

        updated.forEach(el => {
            el.style.opacity   = "0";
            el.style.transform = "translateY(-6px)";
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                updated.forEach(el => {
                    el.style.opacity   = "";
                    el.style.transform = "";
                });
            });
        });
    }, 200);
};
