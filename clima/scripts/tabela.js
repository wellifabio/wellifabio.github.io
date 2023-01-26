/**
 * Este arquivo necessita que o arquivo "data.js" seja instanciado no documento HTML
 * ./data.js
 * Ex:
  * <script src="./scripts/data.js"></script>
 */
const tabela = document.getElementById('tabela');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
let col1 = document.createElement('th');
let col2 = document.createElement('th');
let col3 = document.createElement('th');

col1.innerHTML = "Data";
col2.innerHTML = "Máxima Cº";
col3.innerHTML = "Mínima Cº";
thead.appendChild(col1);
thead.appendChild(col2);
thead.appendChild(col3);

for (i = 0; i < dados.dias.length; i++) {
    let linha = document.createElement('tr');
    let coluna1 = document.createElement('td');
    let coluna2 = document.createElement('td');
    let coluna3 = document.createElement('td');
    coluna1.innerHTML = dados.dias[i];
    coluna2.innerHTML = dados.maximas[i];
    coluna3.innerHTML = dados.minimas[i];
    linha.appendChild(coluna1);
    linha.appendChild(coluna2);
    linha.appendChild(coluna3);
    tbody.appendChild(linha);
}

tabela.appendChild(thead);
tabela.appendChild(tbody);