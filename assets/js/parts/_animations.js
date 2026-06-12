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
/*
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
*/
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

export const initHeroTooltips = () => {
    const tooltip = document.getElementById("heroTooltip");
    if (!tooltip) return;

    const tooltipImg = tooltip.querySelector("img");
    const logos = document.querySelectorAll(".header-logo");

    logos.forEach((logo) => {
        const hoverImg = logo.getAttribute("data-hover-image");
        if (!hoverImg) return;

        logo.addEventListener("mouseenter", () => {
            tooltipImg.src = hoverImg;
            tooltip.classList.add("active");
        });

        logo.addEventListener("mousemove", (e) => {
            const x = e.clientX + 20;
            const y = e.clientY + 20;

            // Prevent tooltip from going off-screen
            const rect = tooltip.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width - 20;
            const maxY = window.innerHeight - rect.height - 20;

            tooltip.style.left = `${Math.min(x, maxX)}px`;
            tooltip.style.top = `${Math.min(y, maxY)}px`;
        });

        logo.addEventListener("mouseleave", () => {
            tooltip.classList.remove("active");
        });
    });
};

export const initLightbox = () => {
    const lightbox = document.getElementById('siteLightbox');
    if (!lightbox) return;

    const lbImage = lightbox.querySelector('.lightbox-image');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');

    let currentGallery = [];
    let currentIndex = 0;
    let isLightboxOpen = false;

    const updateLightbox = (index) => {
        if (currentGallery.length === 0) return;
        if (index < 0) index = currentGallery.length - 1;
        if (index >= currentGallery.length) index = 0;
        currentIndex = index;

        const imgEl = currentGallery[currentIndex];
        lbImage.src = imgEl.src;
        
        const lang = document.documentElement.getAttribute("lang") || "en";
        const caption = lang === 'de' && imgEl.dataset.altDe ? imgEl.dataset.altDe : imgEl.alt;
        lbCaption.textContent = caption || '';
        
        // Hide/show arrows if only one image
        if (currentGallery.length <= 1) {
            lbPrev.style.display = 'none';
            lbNext.style.display = 'none';
        } else {
            lbPrev.style.display = 'flex';
            lbNext.style.display = 'flex';
        }
    };

    const openLightbox = (gallery, index) => {
        currentGallery = gallery;
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

    // Initialize Photography
    const triggerImages = Array.from(document.querySelectorAll('.photography-item img'));
    triggerImages.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(triggerImages, idx));
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

export const initProjectModals = () => {
    const modal = document.getElementById('projectDetailsModal');
    if (!modal) return;

    const sidebar = modal.querySelector('.project-details-info-sidebar');
    const mainContent = modal.querySelector('.project-details-main-content');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.project-modal-prev');
    const nextBtn = modal.querySelector('.project-modal-next');
    
    const projectItems = Array.from(document.querySelectorAll('.project-item'));
    let currentProjectIndex = -1;

    const updateModalContent = (index) => {
        if (index < 0 || index >= projectItems.length) return;
        currentProjectIndex = index;
        const projectItem = projectItems[currentProjectIndex];
        
        // Auto-scroll the background page to this project
        projectItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const title = projectItem.querySelector('.project-title').textContent;
        const badge = projectItem.querySelector('.project-badge').outerHTML;
        const description = projectItem.querySelector('.project-description').innerHTML;
        const tags = projectItem.querySelector('.technology-tags').outerHTML;
        const links = projectItem.querySelector('.project-links').outerHTML;
        
        // Find visible image for this project to use as a starting point
        const activeImg = Array.from(projectItem.querySelectorAll('.project-image')).find(img => window.getComputedStyle(img).display !== 'none');

        // Populate Sidebar
        sidebar.innerHTML = `
            <div class="project-details-meta-top">${badge}</div>
            <h2 class="project-details-title">${title}</h2>
            <div class="project-details-description">${description}</div>
            <div class="project-details-tags-wrapper">
                <h4 style="margin-bottom:0.5rem; opacity:0.7;">Technologies</h4>
                ${tags}
            </div>
            <div class="project-details-links-wrapper">
                ${links}
            </div>
        `;

        // Populate Main Content (Images)
        mainContent.innerHTML = `
            <img src="${activeImg ? activeImg.src : ''}" alt="${title}">
            <div style="height: 20vh; display: flex; align-items: center; justify-content: center; background: var(--main-bg-color); line-height: 1.6; padding: 2rem; text-align: center; opacity: 0.5;">
                <p>Scroll down for more views if available<br>(Static mockup for now)</p>
            </div>
        `;
        
        // Reset scroll positions
        sidebar.scrollTop = 0;
        mainContent.scrollTop = 0;
    };

    const openProjectModal = (index) => {
        updateModalContent(index);
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    };

    projectItems.forEach((item, index) => {
        const images = item.querySelectorAll('.project-image');
        images.forEach(img => {
            img.addEventListener('click', () => openProjectModal(index));
        });
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentProjectIndex - 1 + projectItems.length) % projectItems.length;
        updateModalContent(nextIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentProjectIndex + 1) % projectItems.length;
        updateModalContent(nextIndex);
    });

    closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeProjectModal();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
};

export const initHeroIconMovement = () => {
    const trackingArea = document.querySelector("main") || document.body;
    const hero = document.querySelector(".hero-container");
    const icons = document.querySelectorAll(".icon-spreaded-wrapper");
    if (!hero || icons.length === 0) return;

    trackingArea.addEventListener("mousemove", (e) => {
        const { width, height } = trackingArea.getBoundingClientRect();
        const mouseX = e.clientX / width - 0.5;
        const mouseY = e.clientY / height - 0.5;

        icons.forEach((icon, index) => {
            const speed = (index + 1) * 30; // Increased speed for better feel
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            icon.style.setProperty("--parallax-x", `${x}px`);
            icon.style.setProperty("--parallax-y", `${y}px`);
        });
    });

    trackingArea.addEventListener("mouseleave", () => {
        icons.forEach((icon) => {
            icon.style.setProperty("--parallax-x", `0px`);
            icon.style.setProperty("--parallax-y", `0px`);
        });
    });
};
export const initWorkScroll = () => {
    const projectItems = document.querySelectorAll('.project-item');
    if (projectItems.length === 0) return;

    const handleScroll = () => {
        const viewHeight = window.innerHeight;

        projectItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const info = item.querySelector('.project-info-sticky');
            const bar = item.querySelector('.project-progress-bar');
            if (!info || !bar) return;

            const start = rect.top;
            const height = item.offsetHeight;
            const stickyOffset = 100; // approx distance from top where sticky starts
            
            // Calculate progress (0 to 1)
            // Progress starts when the item reaches stickyOffset
            // Progress ends when the bottom of the item reaches (viewport height - sticky element height)
            // For simplicity, we use the item's height minus some offset
            let progress = (stickyOffset - start) / (height - 500); // 500 is a rough estimate for sticky content height + padding
            progress = Math.max(0, Math.min(1, progress));

            // Update Progress Bar
            bar.style.width = `${progress * 100}%`;

            // Seamless Transitions (Opacity & Transform)
            let opacity = 1;
            let translateY = 0;

            if (start > stickyOffset) {
                // Project is coming from below
                const distanceToSticky = start - stickyOffset;
                const fadeRange = 300; // pixels before sticky
                if (distanceToSticky < fadeRange) {
                    const fadeProgress = 1 - (distanceToSticky / fadeRange);
                    opacity = fadeProgress;
                    translateY = (1 - fadeProgress) * 40;
                } else {
                    opacity = 0;
                }
            } else if (progress > 0.8) {
                // Project is finishing
                const fadeOutProgress = (progress - 0.8) / 0.2;
                opacity = 1 - fadeOutProgress;
                translateY = fadeOutProgress * -40;
            }

            info.style.opacity = opacity;
            info.style.transform = `translateY(${translateY}px)`;
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
};

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#just-some-info .tab');

    if (tabs.length === 0) return;

    tabs[0].classList.add('active');

    tabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});