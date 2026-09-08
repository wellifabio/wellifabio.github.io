/**
 * Este arquivo necessita que os arquivos a seguir sejam chamados no documento HTML
 * ./node_modules/chart.js/dist/chart.js
 * ./data.js
 * Ex:
 * <script src="./node_modules/chart.js/dist/chart.js"></script>
 * <script src="./scripts/data.js"></script>
 */

const ctx2 = document.getElementById('line-chart-2');
const chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: dados.dias,
        datasets: [{
            label: "Maximas Cº",
            data: dados.maximas,
            borderColor: 'rgba(250,50,0,100)',
            borderWidth: 2,
            tension: 0.4,
            backgroundColor: 'rgba(250,50,0,0.5)',
            fill: true
        },
        {
            label: "Mínimas Cº",
            data: dados.minimas,
            borderColor: 'rgba(100,100,200,100)',
            borderWidth: 2,
            tension: 0.5,
            backgroundColor: 'rgba(100,100,200,0.5)',
            fill: true
        }],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Jaguariúna médias diárias de temperatura'
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});