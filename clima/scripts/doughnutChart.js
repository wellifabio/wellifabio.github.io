/**
 * Este arquivo necessita que os arquivos a seguir sejam chamados no documento HTML
 * ./node_modules/chart.js/dist/chart.js
 * ./data.js
 * Ex:
 * <script src="./node_modules/chart.js/dist/chart.js"></script>
 * <script src="./scripts/data.js"></script>
 */

 const ctx6 = document.getElementById('doughnut-chart');
 const chart6 = new Chart(ctx6, {
     type: 'doughnut',
     data: {
         labels: dados.dias,
         datasets: [{
             label: "Maximas Cº",
             data: dados.minimas,
             backgroundColor: dados.cores
         }],
     },
     options: {
         responsive: true,
         plugins: {
             title: {
                 display: true,
                 text: 'Jaguariúna mínimas diárias de temperatura'
             },
         }
     }
 });