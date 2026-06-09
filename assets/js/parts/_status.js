/**
 * xpsystems Status API Integration
 */

export async function initStatusAPI() {
    const statusContainer = document.getElementById('status-container');
    if (!statusContainer) return;

    const overallElement = statusContainer.querySelector('.status-overall');
    const servicesGrid = statusContainer.querySelector('.status-services-grid');
    const lastUpdateElement = statusContainer.querySelector('.status-last-update');
    const filterContainer = statusContainer.querySelector('.status-filters');

    let allServices = [];
    let currentFilter = 'all';

    async function fetchStatus() {
        try {
            const [statusRes, servicesRes] = await Promise.all([
                fetch('https://status.xpsystems.eu/api/status'),
                fetch('https://status.xpsystems.eu/api/services')
            ]);

            const statusData = await statusRes.json();
            const servicesData = await servicesRes.json();

            allServices = servicesData.services;
            updateUI(statusData, allServices);
            updateFilters(allServices);
        } catch (error) {
            console.error('Failed to fetch system status:', error);
            renderError();
        }
    }

    function updateFilters(services) {
        if (!filterContainer) return;
        
        const groups = ['all', ...new Set(services.map(s => s.group))];
        
        if (filterContainer.children.length > 1 && filterContainer.dataset.groups === groups.join(',')) return;
        filterContainer.dataset.groups = groups.join(',');

        filterContainer.innerHTML = groups.map(group => `
            <button class="status-filter-btn ${group === currentFilter ? 'active' : ''}" data-group="${group}">
                ${group === 'all' ? '<span data-language="en">All</span><span data-language="de">Alle</span>' : group}
            </button>
        `).join('');

        filterContainer.querySelectorAll('.status-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentFilter = btn.dataset.group;
                filterContainer.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderServices();
            });
        });
    }

    function renderServices() {
        if (!servicesGrid) return;
        
        const filtered = currentFilter === 'all' 
            ? allServices.filter(s => s.is_deployed)
            : allServices.filter(s => s.is_deployed && s.group === currentFilter);

        servicesGrid.innerHTML = filtered.map(service => {
            const latencyText = service.latency_ms ? `${service.latency_ms}ms` : '--';
            return `
                <div class="status-service-card status-${service.status}" data-group="${service.group}" data-slug="${service.slug}" data-name="${service.name}">
                    <div class="service-header">
                        <span class="service-name">${service.name}</span>
                        <div class="service-status-dot"></div>
                    </div>
                    <div class="service-details">
                        <span class="service-group">${service.group}</span>
                        <span class="service-latency">${latencyText}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Attach Modal Listeners
    }

    function updateUI(status, services) {
        if (overallElement) {
            const overallStatus = status.overall || 'unknown';
            overallElement.className = `status-overall status-${overallStatus}`;
            
            const statusTextEn = overallStatus === 'operational' ? 'All systems operational' : 
                               overallStatus === 'degraded' ? 'Some systems degraded' :
                               overallStatus === 'down' ? 'Major outage' : 'System status unknown';
            
            const statusTextDe = overallStatus === 'operational' ? 'Alle Systeme sind betriebsbereit' : 
                               overallStatus === 'degraded' ? 'Einige Systeme sind eingeschränkt' :
                               overallStatus === 'down' ? 'Schwerwiegende Störung' : 'Systemstatus unbekannt';

            overallElement.innerHTML = `
                <div class="status-indicator"></div>
                <div class="status-text-stack">
                    <span data-language="en">${statusTextEn}</span>
                    <span data-language="de">${statusTextDe}</span>
                </div>
            `;
        }

        renderServices();

        if (lastUpdateElement) {
            const date = new Date(status.checked_at * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            lastUpdateElement.innerHTML = `
                <span data-language="en">Last checked: ${timeString}</span>
                <span data-language="de">Zuletzt geprüft: ${timeString}</span>
            `;
        }
    }

    function renderError() {
        if (overallElement) {
            overallElement.innerHTML = `
                <span data-language="en">Failed to load system status</span>
                <span data-language="de">Systemstatus konnte nicht geladen werden</span>
            `;
        }
    }

    fetchStatus();
    setInterval(fetchStatus, 60000);
}
