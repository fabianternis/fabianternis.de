/**
 * _navigation.js
 *
 * Handles nav-link active state, scroll spy, and hamburger menu.
 *
 * Because there are two locale wrappers (EN + DE), each with their own <nav>,
 * we query inside the currently visible wrapper wherever needed, and use event
 * delegation for the hamburger so it works in whichever nav is visible.
 */

/** Returns the currently visible locale wrapper, or document as fallback. */
const getActiveWrapper = () =>
    document.querySelector(`[data-body-locale="${document.body.dataset.locale || 'en'}"]`) || document;

export const initNavigation = () => {
    // ── Scroll spy ─────────────────────────────────────────────────────────

    const updateActiveLink = () => {
        const wrapper  = getActiveWrapper();
        const navLinks = wrapper.querySelectorAll(".nav-link");
        // Sections can live in either wrapper; querySelectorAll finds all
        const sections = document.querySelectorAll("section[id], div[id]");
        const scrollPosition = window.scrollY + 150;
        let currentId = "";

        sections.forEach((section) => {
            const sectionTop    = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.querySelector("a")?.getAttribute("href");
            if (href === `#${currentId}` || (currentId === "" && href === "#")) {
                link.classList.add("active");
            }
        });
    };

    // Smooth-scroll nav link clicks — delegated so it catches both locale navs
    document.addEventListener("click", (e) => {
        const navLinkEl = e.target.closest(".nav-link a");
        if (!navLinkEl) return;
        const href = navLinkEl.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
            e.preventDefault();
            const wrapper  = getActiveWrapper();
            const navLinks = wrapper.querySelectorAll(".nav-link");
            navLinks.forEach(l => l.classList.remove("active"));
            navLinkEl.closest(".nav-link")?.classList.add("active");
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
            }
        }
    });

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // ── Hamburger menu — delegated so it works for both locale navs ─────────
    document.addEventListener("click", (e) => {
        const hamburger = e.target.closest(".hamburger-menu");
        if (!hamburger) return;

        // Find the nav-links-container WITHIN THE SAME locale wrapper
        const localeWrapper = hamburger.closest("[data-body-locale]");
        const container = localeWrapper
            ? localeWrapper.querySelector(".nav-links-container")
            : document.querySelector(".nav-links-container");

        if (!container) return;

        hamburger.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", hamburger.classList.contains("open"));
        container.classList.toggle("mobile-open");
    });

    // Close hamburger when a mobile nav link is clicked — delegated
    document.addEventListener("click", (e) => {
        const mobileLink = e.target.closest(".nav-links-container .nav-link a");
        if (!mobileLink) return;

        const localeWrapper = mobileLink.closest("[data-body-locale]");
        const hamburger = localeWrapper
            ? localeWrapper.querySelector(".hamburger-menu")
            : document.querySelector(".hamburger-menu");
        const container = localeWrapper
            ? localeWrapper.querySelector(".nav-links-container")
            : document.querySelector(".nav-links-container");

        if (hamburger) {
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        }
        if (container) {
            container.classList.remove("mobile-open");
        }
    });
};
