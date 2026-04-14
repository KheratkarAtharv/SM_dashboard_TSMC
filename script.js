// Tab Switching Function
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show the selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Smooth scroll to the tab section
    document.getElementById('esg-tabs').scrollIntoView({ behavior: 'smooth' });
}

// Switch Tab from Navigation
function switchTabFromNav(event, tabName) {
    event.preventDefault();
    switchTab(tabName);
}

// Scroll to Section from Navigation
function scrollToSection(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle Card Details
function toggleCard(card) {
    const details = card.querySelector('.card-details');
    if (details) {
        if (details.style.display === 'none') {
            details.style.display = 'block';
            card.style.backgroundColor = '#f0f7ff';
        } else {
            details.style.display = 'none';
            card.style.backgroundColor = 'white';
        }
    }
}

// Animate Statistics on Click
function animateStat(element) {
    element.classList.add('animated');
    setTimeout(() => {
        element.classList.remove('animated');
    }, 500);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = '1';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.opacity = '0.7';
            link.style.textDecoration = 'underline';
        } else {
            link.style.textDecoration = 'none';
        }
    });
});

// Intersection Observer for Card Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Smooth Scroll to Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation for Statistics
function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();

    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };

    updateCount();
}

// Initialize stat cards with observer
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add hover effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeftColor = '#00A86B';
    });
    card.addEventListener('mouseleave', function() {
        this.style.borderLeftColor = '#0052CC';
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open card details
        document.querySelectorAll('.card-details').forEach(detail => {
            if (detail.style.display !== 'none') {
                detail.style.display = 'none';
                detail.closest('.card').style.backgroundColor = 'white';
            }
        });
    }
});

// Mobile Menu Toggle (if needed for smaller screens)
function handleWindowResize() {
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (window.innerWidth <= 768) {
        // Mobile optimizations
        document.querySelectorAll('.card').forEach(card => {
            card.style.minHeight = '200px';
        });
    } else {
        // Desktop
        document.querySelectorAll('.card').forEach(card => {
            card.style.minHeight = 'auto';
        });
    }
}

window.addEventListener('resize', handleWindowResize);
handleWindowResize();

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.innerHeight > 0) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add active state to tab buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set the first tab as active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }

    // Ensure first tab content is visible
    const firstContent = document.querySelector('.tab-content');
    if (firstContent) {
        firstContent.classList.add('active');
    }

    // Create pieChart visualization
    createPieChart();
});

// Create Pie Chart
function createPieChart() {
    const pieChart = document.getElementById('pieChart');
    if (!pieChart) return;

    // Already styled with CSS conic-gradient, but this enhances it
    pieChart.innerHTML = '<span style="position: relative; z-index: 1;">75% Male<br>25% Female</span>';
}

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set the first tab as active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }

    // Ensure first tab content is visible
    const firstContent = document.querySelector('.tab-content');
    if (firstContent) {
        firstContent.classList.add('active');
    }

    // Create pieChart visualization
    createPieChart();

    // Initialize all charts
    initializeCharts();
});

// Initialize all Chart.js charts
function initializeCharts() {
    // Chart 1: Annual Emissions Trend
    const emissionsCtx = document.getElementById('emissionsChart');
    if (emissionsCtx) {
        new Chart(emissionsCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'CO₂ Emissions (Million MT)',
                    data: [8.5, 8.2, 7.8, 7.2, 6.8, 6.3, 5.9],
                    borderColor: '#0052CC',
                    backgroundColor: 'rgba(0, 82, 204, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#0052CC',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 9,
                        ticks: { font: { size: 11 } }
                    }
                }
            }
        });
    }

    // Chart 2: Renewable Energy Growth
    const renewableCtx = document.getElementById('renewableChart');
    if (renewableCtx) {
        new Chart(renewableCtx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'Renewable Energy %',
                    data: [8, 12, 18, 24, 28, 31, 33],
                    backgroundColor: [
                        '#00A86B',
                        '#00B878',
                        '#00C884',
                        '#00D890',
                        '#00E89C',
                        '#00F8A8',
                        '#00FF00'
                    ],
                    borderRadius: 5,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { font: { size: 11 }, callback: function(value) { return value + '%'; } }
                    }
                }
            }
        });
    }

    // Chart 3: ESG Score Breakdown
    const esgScoreCtx = document.getElementById('esgScoreChart');
    if (esgScoreCtx) {
        new Chart(esgScoreCtx, {
            type: 'radar',
            data: {
                labels: ['Carbon Reduction', 'Renewable Energy', 'Water Management', 'Waste Reduction', 'Employee Welfare', 'Diversity', 'Governance', 'Ethics'],
                datasets: [{
                    label: 'ESG Performance Score',
                    data: [88, 85, 90, 92, 87, 80, 89, 91],
                    borderColor: '#0052CC',
                    backgroundColor: 'rgba(0, 82, 204, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#0052CC',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { font: { size: 10 } }
                    }
                }
            }
        });
    }

    // Chart 4: Water Usage Reduction
    const waterCtx = document.getElementById('waterChart');
    if (waterCtx) {
        new Chart(waterCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'Water Recycling Rate (%)',
                    data: [55, 58, 62, 65, 68, 69, 70],
                    borderColor: '#1E90FF',
                    backgroundColor: 'rgba(30, 144, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#1E90FF',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { font: { size: 11 }, callback: function(value) { return value + '%'; } }
                    }
                }
            }
        });
    }

    // Chart 5: Workforce Diversity Trend
    const diversityCtx = document.getElementById('diversityChart');
    if (diversityCtx) {
        new Chart(diversityCtx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [
                    {
                        label: 'Women in Workforce (%)',
                        data: [18, 19, 20, 22, 23, 24, 25],
                        backgroundColor: '#FF6B6B',
                        borderRadius: 5,
                        borderSkipped: false
                    },
                    {
                        label: 'Women in Management (%)',
                        data: [10, 11, 12, 14, 16, 17, 18],
                        backgroundColor: '#FFA07A',
                        borderRadius: 5,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: { font: { size: 11 }, callback: function(value) { return value + '%'; } }
                    }
                }
            }
        });
    }

    // Chart 6: Investment Allocation
    const investmentCtx = document.getElementById('investmentChart');
    if (investmentCtx) {
        new Chart(investmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Renewable Energy', 'Water & Waste', 'Employee Programs', 'R&D ESG', 'Community', 'Other'],
                datasets: [{
                    data: [1100, 600, 500, 400, 150, 50],
                    backgroundColor: [
                        '#00A86B',
                        '#1E90FF',
                        '#FFD700',
                        '#FF6B6B',
                        '#9370DB',
                        '#4CAF50'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                }
            }
        });
    }

    // Chart 7: Waste Management Performance
    const wasteCtx = document.getElementById('wasteChart');
    if (wasteCtx) {
        new Chart(wasteCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [
                    {
                        label: 'Waste Recycled (%)',
                        data: [96.5, 97.2, 97.8, 98.3, 98.8, 99.0, 99.2],
                        borderColor: '#00A86B',
                        backgroundColor: 'rgba(0, 168, 107, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#00A86B',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 95,
                        max: 100,
                        ticks: { font: { size: 11 }, callback: function(value) { return value + '%'; } }
                    }
                }
            }
        });
    }

    // Chart 8: Energy Efficiency Improvement
    const efficiencyCtx = document.getElementById('efficiencyChart');
    if (efficiencyCtx) {
        new Chart(efficiencyCtx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'Energy Efficiency Improvement Index',
                    data: [100, 97, 94, 91, 88, 85, 82],
                    backgroundColor: [
                        '#FF6B6B',
                        '#FF7878',
                        '#FF8585',
                        '#FF9292',
                        '#FF9F9F',
                        '#FFACAC',
                        '#FFB9B9'
                    ],
                    borderRadius: 5,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 75,
                        max: 105,
                        ticks: { font: { size: 11 } }
                    }
                }
            }
        });
    }

    // Chart 9: SDG Alignment
    const sdgCtx = document.getElementById('sdgChart');
    if (sdgCtx) {
        new Chart(sdgCtx, {
            type: 'bar',
            data: {
                labels: [
                    'SDG 3: Good Health',
                    'SDG 5: Gender Equality',
                    'SDG 6: Clean Water',
                    'SDG 7: Affordable Energy',
                    'SDG 8: Decent Work',
                    'SDG 9: Innovation',
                    'SDG 12: Responsible Consumption',
                    'SDG 13: Climate Action',
                    'SDG 16: Peace & Justice',
                    'SDG 17: Partnerships'
                ],
                datasets: [{
                    label: 'Impact Score (0-100)',
                    data: [85, 78, 92, 95, 88, 96, 90, 98, 82, 87],
                    backgroundColor: [
                        '#E74C3C', // Goal 3
                        '#E74C3C', // Goal 5
                        '#3498DB', // Goal 6
                        '#F1C40F', // Goal 7
                        '#E67E22', // Goal 8
                        '#9B59B6', // Goal 9
                        '#1ABC9C', // Goal 12
                        '#27AE60', // Goal 13
                        '#2980B9', // Goal 16
                        '#34495E'  // Goal 17
                    ],
                    borderRadius: 5,
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { font: { size: 12, weight: 'bold' } }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { font: { size: 11 }, callback: function(value) { return value; } }
                    }
                }
            }
        });
    }
}

// Add interactive tooltips
document.querySelectorAll('.metric').forEach(metric => {
    metric.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 4px 15px rgba(0, 82, 204, 0.2)';
    });
    metric.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Enhanced Card Interaction
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('animated');
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.id = 'scrollTop';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #0052CC;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 99;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseover', () => {
    scrollTopButton.style.transform = 'translateY(-5px)';
    scrollTopButton.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
});

scrollTopButton.addEventListener('mouseout', () => {
    scrollTopButton.style.transform = 'translateY(0)';
    scrollTopButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});

// Add performance logging
console.log('TSMC ESG Website - Interactive Features Loaded Successfully');
console.log('Scroll to explore different ESG sections');
console.log('Click on cards to view more details');
