export const initModals = () => {
    const imprintModal = document.getElementById('imprintModal');
    const privacyModal = document.getElementById('privacyModal');
    const resumeModal  = document.getElementById('resumeModal');

    if (!imprintModal || !privacyModal) return;

    let activeModal = null;

    const drawEmails = () => {
        const canvases = document.querySelectorAll('.email-canvas');
        if (!canvases.length) return;

        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color').trim() || '#000';
        const fontSize  = getComputedStyle(document.body).fontSize || '16px';
        const fontFam   = getComputedStyle(document.body).fontFamily || 'sans-serif';

        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const e1  = canvas.getAttribute('data-e1');
            const e2  = canvas.getAttribute('data-e2');

            if (e1 && e2) {
                const text = `${e1}@${e2}`;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle   = textColor;
                ctx.font        = `${fontSize} ${fontFam}`;
                ctx.textBaseline = 'middle';
                ctx.fillText(text, 0, canvas.height / 2);
            }
        });
    };

    const openModal = (modal) => {
        if (activeModal) closeModal(activeModal);
        activeModal = modal;
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
        if (modal === imprintModal) drawEmails();
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            if (activeModal === modal) {
                document.body.style.overflow = '';
                activeModal = null;
            }
        }, 300);
    };

    // ── Event delegation: catches trigger links in BOTH locale wrappers ──────

    document.addEventListener('click', (e) => {
        // Imprint links: id="imprint-link" (both locale footers share same id prefix)
        if (e.target.closest('[id^="imprint-link"]')) {
            e.preventDefault();
            openModal(imprintModal);
            return;
        }
        // Privacy links
        if (e.target.closest('[id^="privacy-link"]')) {
            e.preventDefault();
            openModal(privacyModal);
            return;
        }
        // Resume open button
        if (e.target.closest('[id^="openResumeModalBtn"]') && resumeModal) {
            e.preventDefault();
            openModal(resumeModal);
            return;
        }
    });

    // ── Close buttons (inside modals — only rendered once) ───────────────────

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) closeModal(activeModal);
    });

    // Redraw emails on theme change (delegation covers both locale nav buttons)
    document.addEventListener('click', (e) => {
        if (e.target.closest("[id^='themeToggle']") && activeModal === imprintModal) {
            setTimeout(drawEmails, 50);
        }
    });
};
