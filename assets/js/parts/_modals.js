export const initModals = () => {
    const imprintLink = document.getElementById('imprint-link');
    const privacyLink = document.getElementById('privacy-link');

    const imprintModal = document.getElementById('imprintModal');
    const privacyModal = document.getElementById('privacyModal');
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeModalBtn');

    if (!imprintModal || !privacyModal) return;

    let activeModal = null;

    const drawEmails = () => {
        const canvases = document.querySelectorAll('.email-canvas');
        if (!canvases.length) return;

        // Determine text color based on the computed style for body
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color').trim() || '#000';
        const fontSize = getComputedStyle(document.body).fontSize || '16px';
        const fontFam = getComputedStyle(document.body).fontFamily || 'sans-serif';

        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const e1 = canvas.getAttribute('data-e1');
            const e2 = canvas.getAttribute('data-e2');

            if (e1 && e2) {
                const text = `${e1}@${e2}`;

                // Clear previous drawing
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Set context styling
                ctx.fillStyle = textColor;
                ctx.font = `${fontSize} ${fontFam}`;
                ctx.textBaseline = 'middle';

                // Optional: measure text and adjust canvas width if needed,
                // but we fixed it to 200px width in html as a rough size.
                // It's usually better to just draw it.
                ctx.fillText(text, 0, canvas.height / 2);
            }
        });
    };

    const openModal = (modal) => {
        if (activeModal) closeModal(activeModal);

        activeModal = modal;
        modal.style.display = 'flex';

        // Timeout to allow display:flex to apply before setting opacity for transition
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        if (modal === imprintModal) {
            drawEmails(); // Redraw emails to ensure correct color theme
        }
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
        }, 300); // match CSS transition duration
    };

    if (imprintLink) {
        imprintLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(imprintModal);
        });
    }

    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(privacyModal);
        });
    }

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(resumeModal);
        });
    }

    // Close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });

    // Close on overlay click
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });

    // Listen for theme change to redraw emails in correct color if modal is open
    // We observe body class or dataset for theme changes if any.
    // Usually redraws handle on open, but just in case we can attach to languageSwitch or theme switch
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (activeModal === imprintModal) {
                setTimeout(drawEmails, 50); // slight delay to let css vars update
            }
        });
    }
};
