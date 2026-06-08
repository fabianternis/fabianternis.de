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
    const historyContainer = statusContainer.querySelector('.status-history');

    let allServices = [];
    let currentFilter = 'all';

    async function fetchStatus() {
        try {
            const [statusRes, servicesRes, historyRes] = await Promise.all([
                fetch('https://status.xpsystems.eu/api/status'),
                fetch('https://status.xpsystems.eu/api/services'),
                fetch('https://status.xpsystems.eu/api/history')
            ]);

            const statusData = await statusRes.json();
            const servicesData = await servicesRes.json();
            const historyData = await historyRes.json();

            allServices = servicesData.services;
            updateUI(statusData, allServices);
            updateFilters(allServices);
            updateHistory(historyData);
        } catch (error) {
            console.error('Failed to fetch system status:', error);
            renderError();
        }
    }

    function updateFilters(services) {
        if (!filterContainer) return;
        
        const groups = ['all', ...new Set(services.map(s => s.group))];
        
        // Only re-render if groups changed or empty
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
                <div class="status-service-card status-${service.status}" data-group="${service.group}">
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
    }

    function updateHistory(history) {
        if (!historyContainer || !history.entries) return;

        // Take last 7 entries for a compact view
        const recentHistory = history.entries.slice(-7).reverse();

        historyContainer.innerHTML = `
            <h3 class="status-history-title">
                <span data-language="en">Incidents & Maintenance</span>
                <span data-language="de">Vorfälle & Wartung</span>
            </h3>
            <div class="status-history-timeline">
                ${recentHistory.map(entry => {
                    const date = new Date(entry.ts * 1000);
                    const dateStr = date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
                    
                    // Simple check: if any service in entry is down
                    const isDown = Object.values(entry.services).some(s => s.status === 'down');
                    const isDegraded = Object.values(entry.services).some(s => s.status === 'degraded');
                    const statusClass = isDown ? 'down' : (isDegraded ? 'degraded' : 'operational');

                    return `
                        <div class="status-history-item status-${statusClass}">
                            <div class="history-date">${dateStr}</div>
                            <div class="history-marker"></div>
                            <div class="history-content">
                                <span class="history-status-text">
                                    ${statusClass === 'operational' ? 
                                        '<span data-language="en">No incidents reported</span><span data-language="de">Keine Vorfälle gemeldet</span>' : 
                                        (statusClass === 'down' ? 
                                            '<span data-language="en">Service Outage</span><span data-language="de">Serviceausfall</span>' : 
                                            '<span data-language="en">Degraded Performance</span><span data-language="de">Eingeschränkte Leistung</span>')}
                                </span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    function updateUI(status, services) {
        // Update Overall Status
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

        // Update Last Checked
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
