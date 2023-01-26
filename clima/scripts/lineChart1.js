/**
 * Este arquivo necessita que os arquivos a seguir sejam chamados no documento HTML
 * ./node_modules/chart.js/dist/chart.js
 * ./data.js
 * Ex:
 * <script src="./node_modules/chart.js/dist/chart.js"></script>
 * <script src="./scripts/data.js"></script>
 */

const ctx1 = document.getElementById('line-chart-1');
const chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: dados.dias,
        datasets: [{
            label: "Maximas Cº",
            data: dados.maximas,
            borderColor: 'rgba(250,50,0,100)',
            borderWidth: 3,
        },
        {
            label: "Mínimas Cº",
            data: dados.minimas,
            borderColor: 'rgba(100,100,200,100)',
            borderWidth: 3
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