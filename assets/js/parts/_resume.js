export async function initResume() {
    const resumeContainer = document.getElementById('resume-content');
    const resumeRaw = document.getElementById('resume-raw');
    const resumeControls = document.getElementById('resume-controls');
    const toggleBtns = document.querySelectorAll('.resume-toggle-btn');

    if (!resumeContainer) return;

    try {
        const response = await fetch('https://raw.githubusercontent.com/fabianternis/fabianternis/refs/heads/main/RESUME.md');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();

        // Ensure marked is available
        if (typeof marked !== 'undefined') {
            resumeContainer.innerHTML = marked.parse(text);
        } else {
            resumeContainer.innerHTML = '<p>Error: Markdown parser not loaded.</p>';
        }

        if (resumeRaw) {
            resumeRaw.textContent = text;
        }

        if (resumeControls) {
            resumeControls.style.display = 'flex';
        }

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');

                // Update active state
                toggleBtns.forEach(b => {
                    // Only remove active from buttons that don't have a language attribute,
                    // or match the current language if they do, to avoid removing active
                    // from the hidden translated button.
                    if (b.getAttribute('data-view') !== view) {
                        b.classList.remove('active');
                    } else {
                        b.classList.add('active');
                    }
                });

                // Toggle visibility
                if (view === 'formatted') {
                    resumeContainer.style.display = 'block';
                    if (resumeRaw) resumeRaw.style.display = 'none';
                } else if (view === 'raw') {
                    resumeContainer.style.display = 'none';
                    if (resumeRaw) resumeRaw.style.display = 'block';
                }
            });
        });

    } catch (error) {
        console.error('Failed to fetch resume:', error);
        resumeContainer.innerHTML = '<p>Failed to load resume content. Please try again later.</p>';
    }
}
