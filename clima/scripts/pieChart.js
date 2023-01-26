/**
 * Este arquivo necessita que os arquivos a seguir sejam chamados no documento HTML
 * ./node_modules/chart.js/dist/chart.js
 * ./data.js
 * Ex:
 * <script src="./node_modules/chart.js/dist/chart.js"></script>
 * <script src="./scripts/data.js"></script>
 */

const ctx5 = document.getElementById('pie-chart');
const chart5 = new Chart(ctx5, {
    type: 'pie',
    data: {
        labels: dados.dias,
        datasets: [{
            label: "Maximas Cº",
            data: dados.maximas,
            backgroundColor: dados.cores
        }],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Jaguariúna máximas diárias de temperatura'
            },
        }
    }
});