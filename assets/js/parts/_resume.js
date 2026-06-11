export async function initResume() {
    const resumeContainer = document.getElementById('resume-content');
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
    } catch (error) {
        console.error('Failed to fetch resume:', error);
        resumeContainer.innerHTML = '<p>Failed to load resume content. Please try again later.</p>';
    }
}
