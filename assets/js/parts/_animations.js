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
    // This function can now handle generic entrance animations if needed
    const items = document.querySelectorAll(".project-item");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-active");
            } else {
                entry.target.classList.remove("is-active");
            }
        });
    }, { threshold: 0.1 });

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

export const initDomainsAPI = () => {
    const counterEl = document.getElementById("domainsCounter");
    const gridEl = document.getElementById("domainsGrid");
    const tldGridEl = document.getElementById("tldGrid");
    const searchInput = document.getElementById("domainSearch");
    
    if (!gridEl || !tldGridEl) return;

    let allDomains = [];
    let currentTldFilter = null;

    const renderDomains = (domains) => {
        if (!domains || domains.length === 0) {
            gridEl.innerHTML = '<div class="domains-empty-state">No domains found matching your criteria.</div>';
            return;
        }

        const html = domains.map(d => {
            const url = d.url || `https://${d.name}.${d.tld}`;
            const isMuted = d.status !== 'active';
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="domain-chip ${isMuted ? 'domain-chip--muted' : ''}" title="${d.name}.${d.tld} (${d.status})">${d.name}.${d.tld}</a>`;
        }).join('');

        gridEl.innerHTML = html;
    };

    const filterDomains = () => {
        const query = (searchInput?.value || "").toLowerCase().trim();
        let filtered = allDomains;

        if (currentTldFilter) {
            filtered = filtered.filter(d => d.tld === currentTldFilter);
        }

        if (query) {
            filtered = filtered.filter(d => `${d.name}.${d.tld}`.toLowerCase().includes(query));
        }

        renderDomains(filtered.slice(0, 30));
    };

    fetch("https://dnbx.de/api/stats")
        .then(res => res.json())
        .then(data => {
            if (data?.status === "success" && data.data?.total_managed && counterEl) {
                counterEl.dataset.target = data.data.total_managed;
                initCounters();
            }
        })
        .catch(err => console.error("Error fetching DNBX stats:", err));

    fetch("https://dnbx.de/api/tlds")
        .then(res => res.json())
        .then(data => {
            if (data?.status === "success" && data.data) {
                const tlds = Object.keys(data.data).sort((a, b) => data.data[b].total - data.data[a].total);
                
                const html = tlds.map(tld => {
                    const count = data.data[tld].total;
                    return `<span class="domains-tld" data-tld="${tld}">.${tld} <span style="opacity:0.5;font-size:0.8em">(${count})</span></span>`;
                }).join('');
                
                tldGridEl.innerHTML = html;

                tldGridEl.querySelectorAll('.domains-tld').forEach(el => {
                    el.addEventListener('click', () => {
                        const tld = el.dataset.tld;
                        if (currentTldFilter === tld) {
                            currentTldFilter = null;
                            tldGridEl.querySelectorAll('.domains-tld').forEach(t => t.style.borderColor = '');
                        } else {
                            currentTldFilter = tld;
                            tldGridEl.querySelectorAll('.domains-tld').forEach(t => t.style.borderColor = '');
                            el.style.borderColor = 'var(--accent-color)';
                        }
                        filterDomains();
                    });
                    el.style.cursor = 'pointer';
                });
            }
        })
        .catch(err => console.error("Error fetching DNBX TLDs:", err));

    fetch("https://dnbx.de/api/domains?limit=1000")
        .then(res => res.json())
        .then(data => {
            if (data?.status === "success" && data.data) {
                allDomains = data.data;
                allDomains.sort((a, b) => {
                   if (a.status === 'active' && b.status !== 'active') return -1;
                   if (a.status !== 'active' && b.status === 'active') return 1;
                   return Math.random() - 0.5;
                });
                filterDomains();
            } else {
                 gridEl.innerHTML = '<div class="domains-empty-state">Failed to load domains.</div>';
            }
        })
        .catch(err => {
            console.error("Error fetching DNBX domains:", err);
            gridEl.innerHTML = '<div class="domains-empty-state">Could not connect to domain service.</div>';
        });

    if (searchInput) {
        searchInput.addEventListener('input', filterDomains);
    }
};

export const initLightbox = () => {
    const images = Array.from(document.querySelectorAll('.photography-item img'));
    const lightbox = document.getElementById('photographyLightbox');
    
    if (!lightbox || images.length === 0) return;

    const lbImage = lightbox.querySelector('.lightbox-image');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    let isLightboxOpen = false;

    const updateLightbox = (index) => {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;

        const imgEl = images[currentIndex];
        lbImage.src = imgEl.src;
        
        const lang = document.documentElement.getAttribute("lang") || "en";
        const caption = lang === 'de' && imgEl.dataset.altDe ? imgEl.dataset.altDe : imgEl.alt;
        lbCaption.textContent = caption || '';
    };

    const openLightbox = (index) => {
        isLightboxOpen = true;
        updateLightbox(index);
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        isLightboxOpen = false;
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    };

    images.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => updateLightbox(currentIndex - 1));
    lbNext.addEventListener('click', () => updateLightbox(currentIndex + 1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!isLightboxOpen) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
        if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
    });
};

export const initWorkScroll = () => {
    const projectItems = document.querySelectorAll('.project-item');
    if (projectItems.length === 0) return;

    const handleScroll = () => {
        const viewHeight = window.innerHeight;

        projectItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const bar = item.querySelector('.project-progress-bar');
            if (!bar) return;

            // Calculate how much of the item is scrolled through
            // The item starts affecting progress when its top enters the viewport
            // and finishes when its bottom leaves the viewport.
            // However, since info is sticky, we want progress based on the image column scroll.
            
            const start = rect.top;
            const height = item.offsetHeight;
            
            // Progress should be 0 when top is at 'top' of viewport (or sticky position)
            // and 100 when bottom is at 'top' of viewport.
            let progress = 0;
            if (start <= 100) { // approx sticky start
                progress = Math.abs(start - 100) / (height - viewHeight + 100);
            }
            
            const clampedProgress = Math.max(0, Math.min(100, progress * 100));
            bar.style.width = `${clampedProgress}%`;
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
};
