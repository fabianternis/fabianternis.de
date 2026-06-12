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
                const description = project.querySelector('.project-description')?.textContent.trim() || '';
                const techTags = Array.from(project.querySelectorAll('.technology-tag'))
                    .map(tag => tag.textContent.trim())
                    .filter(t => t.length > 0)
                    .join(', ');

                let context = description.substring(0, 80) + '...';
                if (techTags) {
                    context += ` [Technologies: ${techTags}]`;
                }

                items.push({
                    type: 'Project',
                    title: title,
                    url: `#my-work`, // Since it's vertical now, maybe just jump to section
                    context: context
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

    let selectedIndex = -1;

    const performSearch = (query) => {
        selectedIndex = -1;
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
        searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                updateSelection(index);
            });
            item.addEventListener('click', () => {
                closeSearch();
            });
        });

        updateSelection(0);
    };

    const updateSelection = (index) => {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        items.forEach(item => item.classList.remove('selected'));

        if (index >= items.length) index = 0;
        if (index < 0) index = items.length - 1;

        selectedIndex = index;
        items[selectedIndex].classList.add('selected');
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
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
            
            // Navigate results with arrows
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                updateSelection(selectedIndex + 1);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                updateSelection(selectedIndex - 1);
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                const items = searchResults.querySelectorAll('.search-result-item');
                if (items.length > 0 && selectedIndex >= 0) {
                    items[selectedIndex].click();
                }
            }
        }
    });
}
