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

    // Entrance animation
    items.forEach((item) => {
        item.style.transform = "translateY(40px)";
        item.style.opacity = "0";
        item.style.transition = "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease";
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.transform = "translateY(0)";
                entry.target.style.opacity = "1";
            }
        });
    }, { threshold: 0.1 });

    items.forEach((item) => observer.observe(item));

    // Active state tracking
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-active");
            } else {
                entry.target.classList.remove("is-active");
            }
        });
    }, { threshold: 0.25 });

    items.forEach((item) => activeObserver.observe(item));

    // Automatic Image Scrolling linked to Page Scroll
    const syncInternalScroll = () => {
        if (window.innerWidth < 1000) return; // Only on desktop

        items.forEach((item) => {
            const wrapper = item.querySelector(".image-wrapper");
            const img = item.querySelector(".project-image");
            if (!wrapper || !img) return;

            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only update if item is visible
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate progress: 0 when item enters from bottom, 1 when it leaves at top
                // We use a slightly tighter range for better "magic" feel
                const start = windowHeight;
                const end = -rect.height;
                let progress = (rect.top - start) / (end - start);
                
                // Clamp progress
                progress = Math.max(0, Math.min(1, progress));

                const scrollRange = img.scrollHeight - wrapper.clientHeight;
                // Smoothly set scrollTop (using direct assignment for performance, CSS can handle smooth transitions if needed)
                wrapper.scrollTop = progress * scrollRange;
            }
        });
    };

    window.addEventListener("scroll", syncInternalScroll, { passive: true });
    window.addEventListener("resize", syncInternalScroll);
    syncInternalScroll(); // Initial call
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
