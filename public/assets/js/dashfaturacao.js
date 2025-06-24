// Initialize Lucide icons
lucide.createIcons();

// Chart data
const revenueData = [
    { name: 'Jan', valor: 120000 },
    { name: 'Fev', valor: 150000 },
    { name: 'Mar', valor: 180000 },
    { name: 'Abr', valor: 170000 },
    { name: 'Mai', valor: 190000 },
    { name: 'Jun', valor: 210000 },
];

const clientData = [
    { name: 'Empresas', value: 65 },
    { name: 'Individuais', value: 35 }
];

const invoiceData = [
    { name: 'Jan', pagas: 45, pendentes: 12 },
    { name: 'Fev', pagas: 52, pendentes: 15 },
    { name: 'Mar', pagas: 58, pendentes: 10 },
    { name: 'Abr', pagas: 62, pendentes: 8 },
    { name: 'Mai', pagas: 70, pendentes: 14 },
    { name: 'Jun', pagas: 65, pendentes: 11 },
];

// Revenue Chart (Line Chart)
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: revenueData.map(d => d.name),
        datasets: [{
            label: 'Faturação',
            data: revenueData.map(d => d.valor),
            borderColor: '#3366CC',
            backgroundColor: 'rgba(51, 102, 204, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3366CC',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.parsed.y.toLocaleString() + ' KZ';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    callback: function(value) {
                        return (value / 1000) + 'K';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// Client Chart (Pie Chart)
const clientCtx = document.getElementById('clientChart').getContext('2d');
new Chart(clientCtx, {
    type: 'doughnut',
    data: {
        labels: clientData.map(d => d.name),
        datasets: [{
            data: clientData.map(d => d.value),
            backgroundColor: ['#0088FE', '#00C49F'],
            borderWidth: 0,
            cutout: '60%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + '%';
                    }
                }
            }
        }
    }
});

// Invoice Chart (Stacked Bar Chart)
const invoiceCtx = document.getElementById('invoiceChart').getContext('2d');
new Chart(invoiceCtx, {
    type: 'bar',
    data: {
        labels: invoiceData.map(d => d.name),
        datasets: [
            {
                label: 'Pagas',
                data: invoiceData.map(d => d.pagas),
                backgroundColor: '#28a745',
                borderRadius: 4
            },
            {
                label: 'Pendentes',
                data: invoiceData.map(d => d.pendentes),
                backgroundColor: '#ffc107',
                borderRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                }
            },
            y: {
                stacked: true,
                grid: {
                    display: true,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    padding: 15
                }
            }
        }
    }
});

// Add click handlers for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Nova')) {
            console.log('Ação:', this.textContent.trim());
            // Aqui você pode adicionar a lógica de navegação
        }
    });
});