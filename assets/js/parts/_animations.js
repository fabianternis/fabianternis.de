export const initNameAnimations = () => {
    const lang = document.documentElement.getAttribute("lang");
    const activeIntroduction = document.querySelector(`.introduction[data-language="${lang}"]`);
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
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 300 - elapsed);
            setTimeout(() => {
                char.classList.remove("bounce");
                char.classList.add("after-bounce");
            }, remaining);
        });
    });
};

export const trackProjectScroll = () => {
    const items = document.querySelectorAll(".project-item");

    // Set initial off-screen state based on alternating direction
    items.forEach((item, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        item.style.transform = `translateX(${50 * direction}px)`;
        item.style.opacity = "0";
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.transform = "translateX(0)";
                entry.target.style.opacity = "1";
                // Once visible, stop observing so it never resets
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach((item) => observer.observe(item));
};

export const initCounters = () => {
    const counters = document.querySelectorAll("[data-target]");

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((el) => observer.observe(el));
};
