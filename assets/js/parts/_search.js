/**
 * CMD + K Search Integration
 */

export function initSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTriggers = document.querySelectorAll('.search-trigger');

    if (!searchModal || !searchInput || !searchResults) return;

    let isSearchOpen = false;

    const openSearch = () => {
        isSearchOpen = true;
        searchModal.style.display = 'flex';
        setTimeout(() => searchModal.classList.add('active'), 10);
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    };

    const closeSearch = () => {
        isSearchOpen = false;
        searchModal.classList.remove('active');
        setTimeout(() => {
            searchModal.style.display = 'none';
            document.body.style.overflow = '';
            searchInput.value = '';
            searchResults.innerHTML = '';
        }, 300);
    };

    const toggleSearch = () => isSearchOpen ? closeSearch() : openSearch();

    // Index site content
    const indexContent = () => {
        const items = [];
        
        // Index Sections
        document.querySelectorAll('section[id]').forEach(section => {
            const title = section.querySelector('.section-title')?.textContent.trim() || section.id;
            items.push({
                type: 'Section',
                title: title,
                url: `#${section.id}`,
                context: section.textContent.substring(0, 100).replace(/\s+/g, ' ') + '...'
            });
        });

        // Index Projects
        document.querySelectorAll('.project-item').forEach(project => {
            const title = project.querySelector('.project-title')?.textContent.trim();
            if (title) {
                items.push({
                    type: 'Project',
                    title: title,
                    url: `#my-work`, // Since it's vertical now, maybe just jump to section
                    context: project.querySelector('.project-description')?.textContent.trim().substring(0, 80) + '...'
                });
            }
        });

        // Index MTEX Cards
        document.querySelectorAll('.mtex-card').forEach(card => {
            const title = card.querySelector('.mtex-card-title')?.textContent.trim();
            if (title) {
                items.push({
                    type: 'MTEX Service',
                    title: title,
                    url: '#mtexdotdev',
                    context: card.querySelector('.mtex-card-domain')?.textContent.trim()
                });
            }
        });

        return items;
    };

    const searchableItems = indexContent();

    const performSearch = (query) => {
        const q = query.toLowerCase().trim();
        if (!q) {
            searchResults.innerHTML = '';
            return;
        }

        const filtered = searchableItems.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.context.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
        ).slice(0, 8);

        if (filtered.length === 0) {
            searchResults.innerHTML = `<div class="search-no-results">No results found for "${query}"</div>`;
            return;
        }

        searchResults.innerHTML = filtered.map((item, index) => `
            <a href="${item.url}" class="search-result-item" data-index="${index}">
                <div class="result-type">${item.type}</div>
                <div class="result-title">${item.title}</div>
                <div class="result-context">${item.context}</div>
            </a>
        `).join('');

        // Handle click on results
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                closeSearch();
            });
        });
    };

    // Event Listeners
    searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
    });

    searchInput.addEventListener('input', (e) => performSearch(e.target.value));

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // CMD/CTRL + K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }

        if (isSearchOpen) {
            if (e.key === 'Escape') closeSearch();
            
            // Navigate results with arrows (simple implementation)
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                // Add more complex navigation if needed
            }
        }
    });
}
