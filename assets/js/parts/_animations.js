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
                const translateX = progress * 50 * direction;
                const opacity = 1 - (progress * 0.35);

                item.style.transform = `translateX(${translateX}px)`;
                item.style.opacity = opacity;
            }
        });
    };

    window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
    handleScroll();
};
