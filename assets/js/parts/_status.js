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

        // Determine how many days to show based on width
        const width = window.innerWidth;
        const daysToShow = width < 600 ? 30 : 60;
        
        // Group entries by day
        const dailyStatus = {};
        const now = new Date();
        
        for (let i = 0; i < daysToShow; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            dailyStatus[key] = 'operational'; // Default
        }

        history.entries.forEach(entry => {
            const dateStr = new Date(entry.ts * 1000).toISOString().split('T')[0];
            if (dailyStatus.hasOwnProperty(dateStr)) {
                // If any service is down/degraded, upgrade the day's severity
                const isDown = Object.values(entry.services).some(s => s.status === 'down');
                const isDegraded = Object.values(entry.services).some(s => s.status === 'degraded');
                
                if (isDown) {
                    dailyStatus[dateStr] = 'down';
                } else if (isDegraded && dailyStatus[dateStr] !== 'down') {
                    dailyStatus[dateStr] = 'degraded';
                }
            }
        });

        const sortedKeys = Object.keys(dailyStatus).sort().reverse();
        const displayKeys = sortedKeys.slice(0, daysToShow).reverse();

        historyContainer.innerHTML = `
            <div class="status-history-header">
                <h3 class="status-history-title">
                    <span data-language="en">Availability</span>
                    <span data-language="de">Verfügbarkeit</span>
                </h3>
                <div class="status-history-legend">
                    <span class="legend-item"><span class="dot status-operational"></span> Operational</span>
                    <span class="legend-item"><span class="dot status-degraded"></span> Degraded</span>
                    <span class="legend-item"><span class="dot status-down"></span> Down</span>
                </div>
            </div>
            <div class="status-timebar">
                ${displayKeys.map(key => {
                    const status = dailyStatus[key];
                    const date = new Date(key);
                    const formattedDate = date.toLocaleDateString([], { day: '2-digit', month: 'short' });
                    
                    let statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
                    if (document.documentElement.getAttribute('lang') === 'de') {
                        statusLabel = status === 'operational' ? 'Betriebsbereit' : (status === 'down' ? 'Ausfall' : 'Eingeschränkt');
                    }

                    return `
                        <div class="timebar-day status-${status}" title="${formattedDate}: ${statusLabel}"></div>
                    `;
                }).join('')}
            </div>
            <div class="status-timebar-labels">
                <span>${daysToShow} days ago</span>
                <span>Today</span>
            </div>
        `;
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
    
    // Handle responsive timebar resize
    window.addEventListener('resize', () => {
        // Redraw history if container exists
        if (historyContainer.innerHTML.trim() !== "") {
            fetchStatus(); // Re-fetch or just re-render from cache if we stored it
        }
    });
}
