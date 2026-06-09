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
        servicesGrid.querySelectorAll('.status-service-card').forEach(card => {
            card.addEventListener('click', () => {
                openServiceModal(card.dataset.slug, card.dataset.name, card.dataset.group);
            });
        });
    }

    let activeChart = null;

    async function openServiceModal(slug, name, group) {
        const modal = document.getElementById('statusModal');
        const title = document.getElementById('statusModalTitle');
        const desc = document.getElementById('statusModalDesc');
        const statusBar = document.getElementById('serviceStatusBar');
        const canvas = document.getElementById('latencyChart');

        if (!modal) return;

        title.textContent = name;
        desc.textContent = `Loading history for ${group}...`;
        statusBar.innerHTML = '';

        if (activeChart) {
            activeChart.destroy(); // assuming Chart.js, but since we use raw canvas, we handle it below
            activeChart = null;
        }

        // Basic raw canvas clear
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Open Modal visually
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';

        try {
            const res = await fetch(`https://status.xpsystems.eu/api/history/${slug}`);
            const data = await res.json();

            desc.textContent = `${group} - Last 90 days. Avg Latency: ${data.stats.avg_latency_ms}ms, Uptime: ${data.stats.uptime_pct}%`;

            // Build Status Bar
            statusBar.innerHTML = data.by_day.map(day => {
                let statusClass = 'operational';
                if (day.had_outage) statusClass = 'down';
                else if (day.had_degraded) statusClass = 'degraded';
                else if (day.total_checks === 0) statusClass = 'unknown'; // no data

                return `<div class="timebar-day status-${statusClass}" title="${day.date}: ${day.uptime_pct !== null ? day.uptime_pct + '%' : 'No Data'}" style="flex: 1; border-radius: 2px;"></div>`;
            }).join('');

            // Draw Simple Line Chart for Latency
            drawLatencyChart(canvas, data.by_day);

        } catch(e) {
            desc.textContent = "Failed to load history data.";
            console.error(e);
        }
    }

    function drawLatencyChart(canvas, byDay) {
        // Fix canvas resolution
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        const ctx = canvas.getContext('2d');

        // Filter out nulls
        const validDays = byDay.filter(d => d.avg_latency_ms !== null);
        if (validDays.length === 0) {
            ctx.fillStyle = '#888';
            ctx.font = '14px sans-serif';
            ctx.fillText('No latency data available', 10, canvas.height / 2);
            return;
        }

        const maxLatency = Math.max(...validDays.map(d => d.avg_latency_ms)) || 100; // avoid div by 0
        const minLatency = 0;

        const padding = 20;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw axes
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height + padding);
        ctx.lineTo(width + padding, height + padding);
        ctx.stroke();

        // Draw Line
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent-color').trim() || '#3b82f6';
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const stepX = width / (byDay.length - 1 || 1);

        let firstMoved = false;
        byDay.forEach((day, index) => {
            if (day.avg_latency_ms === null) return;
            const x = padding + (index * stepX);
            const y = padding + height - ((day.avg_latency_ms / maxLatency) * height);

            if (!firstMoved) {
                ctx.moveTo(x, y);
                firstMoved = true;
            } else {
                ctx.lineTo(x, y);
            }

            // Draw small point
            ctx.fillStyle = accentColor;
            ctx.fillRect(x - 2, y - 2, 4, 4);
        });

        ctx.stroke();
    }

    function updateHistory(history) {
        if (!historyContainer || !history.entries) return;

        // Determine how many days to show based on width
        const width = window.innerWidth;
        const daysToShow = width < 600 ? 30 : 60;
        
        // Use all available entries to find out the date range
        // Since api/history returns limited entries currently, we project backwards from the most recent or today
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
