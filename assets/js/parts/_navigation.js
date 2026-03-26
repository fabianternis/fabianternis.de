export const initNavigation = () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id], div[id]");

    const updateActiveLink = () => {
        let currentId = "";
        const scrollPosition = window.scrollY + 150;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.querySelector("a").getAttribute("href");
            if (href === `#${currentId}` || (currentId === "" && href === "#")) {
                link.classList.add("active");
            }
        });
    };

    navLinks.forEach((link) => {
        const anchor = link.querySelector("a");
        anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            if (href.startsWith("#") && href.length > 1) {
                e.preventDefault();
                // Immediately reflect active state on click
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
                }
            }
        });
    });

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
};
