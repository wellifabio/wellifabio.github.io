const modal = document.getElementById("modal");
const gantt = document.getElementById("gantt");
const prazo = document.getElementById("prazo");
const titulo = document.getElementById("titulo");
const atividade = document.getElementById("atividade");
const recurso = document.getElementById("recurso");
const inicio = document.getElementById("inicio");
const duracao = document.getElementById("duracao");
const status = document.getElementById("status");
var tipo = "Days";
var colunas = 1;

//Função que abre o modal com solicitando as informações iniciais
function getInicialConfig() {
    modal.setAttribute("style", "display:flex;")
}

//Função que cria a estrutura básica do crinograma
function criarCronograma() {
    if (prazo.value !== '' && prazo.value > 0) {
        if (prazo.value > 31) {
            tipo = 'Weeks';
            colunas = parseInt(prazo.value / 7);
            if (colunas > 40) {
                tipo = 'Months';
                colunas = parseInt(prazo.value / 30);
            }
        } else {
            colunas = prazo.value;
        }
        tit = document.createElement("h3");
        table = document.createElement("table");
        thead = document.createElement("thead");
        tr1 = document.createElement("tr");
        tit.innerHTML = titulo.value;
        tr1.innerHTML = "<th rowspan='2'>Activities</th><th rowspan='2'>Resources</th><th rowspan='2'>Ini.</th><th rowspan='2'>Dur.</th><th rowspan='2'>Stat.</th><th colspan='" + colunas + "'>" + tipo + "</th>";
        tr2 = document.createElement("tr");
        for (i = 1; i <= colunas; i++) {
            tr2.innerHTML += "<th>" + i + "</th>";
        }
        tr2.innerHTML += "<th><label>Actions</label></th>";
        tbody = document.createElement("tbody");
        tbody.setAttribute("id", "corpo");
        btFaixa = document.createElement("div");
        btFaixa.setAttribute("class","faixa");
        btSalvar = document.createElement("button");
        btSalvar.setAttribute("onclick", "salvarCSV()");
        btSalvar.innerHTML = "Save in CSV";
        btPrint = document.createElement("button");
        btPrint.setAttribute("onclick", "imprimir()");
        btPrint.innerHTML = "Print";
        btReset = document.createElement("button");
        btReset.setAttribute("onclick", "document.location.reload(true);");
        btReset.innerHTML = "Reload";
        btFaixa.appendChild(btSalvar);
        btFaixa.appendChild(btPrint);
        btFaixa.appendChild(btReset);
        thead.appendChild(tr1);
        thead.appendChild(tr2);
        table.appendChild(thead);
        table.appendChild(tbody);
        gantt.appendChild(tit);
        gantt.appendChild(table);
        gantt.appendChild(btFaixa);
        duracao.setAttribute("placeholder", tipo);
        switch (tipo) {
            case "Days": inicio.setAttribute("placeholder", "Day"); break;
            case "Weeks": inicio.setAttribute("placeholder", "Week"); break;
            default: inicio.setAttribute("placeholder", "Month"); break;
        }
        modal.setAttribute("style", "display:none;");
    } else {
        alert("Preencha os campos tipo e prazo do projeto.");
    }
}

//Funcão que adiciona atividades ao projeto
function adicionar() {
    const corpo = document.getElementById("corpo");
    if (atividade.value != '' && recurso.value != '' && inicio.value != '' && duracao.value != '') {
        let duracaoMaxima = colunas - parseInt(inicio.value) + 1;
        if (inicio.value > 0 && duracao.value > 0 && parseInt(inicio.value) <= colunas && parseInt(duracao.value) <= duracaoMaxima) {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${atividade.value}</td><td>${recurso.value}</td><td>${inicio.value}</td><td>${duracao.value}</td><td>${status.value}</td>`;
            for (i = 1; i <= colunas; i++) {
                if (i >= parseInt(inicio.value) && i <= parseInt(inicio.value) + parseInt(duracao.value) - 1) {
                    tr.innerHTML += "<td class='" + status.value + "'></td>";
                } else {
                    tr.innerHTML += "<td class='tdbranco'></td>";
                }
            }
            tr.innerHTML += "<td class='acoes'><input type='button' value=' * ' onclick='editar(this)'><input type='button' value=' - ' onclick='excluir(this)'></td>";
            corpo.appendChild(tr);
        } else {
            alert("O início da atividade a a duração devem estar dentro do cronograma.");
        }
    } else {
        alert("Preencha todos os campos obrigatórios.");
    }
}

//Função que imprime o gráfico em PDF
function imprimir() {
    if (true) {
        window.print();
        //https://tableless.com.br/dicas-de-css-para-impressao/
    } else {
        alert("Preencha todos os campos obrigatórios.");
    }
}

//Função que faz download dos dados em um arquivo CDV separado por ";"
function salvarCSV() {
    if (corpo.getElementsByTagName("tr").length > 0) {
        let a = document.createElement("a");
        a.href = "data:," + tbodyToCSV(corpo);
        a.download = "gantt.csv";
        a.click();
    } else {
        alert("Não há dados na tabela para serem salvos.");
    }
}

//Função que percorre o corpo da tabela e converte o resultado em CSV
function tbodyToCSV(tbody) {
    let csv = prazo.value + ";"+titulo.value+"\r\n";
    let linhas = tbody.getElementsByTagName("tr");
    if (linhas.length > 0) {
        for (let lin = 0; lin < linhas.length; lin++) {
            let colunas = linhas[lin].getElementsByTagName("td");
            for (let col = 0; col < colunas.length - 1; col++) {
                //Remove células vazias
                if (colunas[col].textContent != '') csv += colunas[col].textContent + ";";
            }
            csv += "\r\n";
        }
    }
    return csv;
}

//Função que carrega um arquivo de texto
function carregarCSV() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let arquivo = document.getElementById("abrir");
        if(arquivo.value != ''){
            let arquivoLido = new FileReader(); //Leitor de arquivo
            arquivoLido.onload = function(fileLoadedEvent){
                let text = fileLoadedEvent.target.result;
                let row = text.split("\r\n");
                prazo.value = row[0].split(";")[0];
                titulo.value = row[0].split(";")[1];
                criarCronograma();
                //Preenche o gráfico linha por linha
                for(i = 1; i < row.length; i++){
                    let tr = document.createElement("tr");
                    let col = row[i].split(";");
                    tr.innerHTML = `<td>${col[0]}</td><td>${col[1]}</td><td>${col[2]}</td><td>${col[3]}</td><td>${col[4]}</td>`;
                    for (j = 1; j <= colunas; j++) {
                        if (j >= parseInt(col[2]) && j <= parseInt(col[2]) + parseInt(col[3]) - 1) {
                            tr.innerHTML += "<td class='" + col[4] + "'></td>";
                        } else {
                            tr.innerHTML += "<td class='tdbranco'></td>";
                        }
                    }
                    tr.innerHTML += "<td class='acoes'><input type='button' value=' * ' onclick='editar(this)'><input type='button' value=' - ' onclick='excluir(this)'></td>";
                    corpo.appendChild(tr); 
                }
            }
            arquivoLido.readAsText(arquivo.files[0], "UTF-8");
        } else {
            alert("Selecione o arquivo CSV.");
        }
    } else {
        alert("Arquivo(s) não suportado(s)");
    }
}

//Função que exclui elementos da tabela
function excluir(e){
    e.parentNode.parentNode.remove();
}

//Função que edita as linhas da tabela
function editar(e){
    atividade.value = e.parentNode.parentNode.cells[0].innerHTML;
    recurso.value = e.parentNode.parentNode.cells[1].innerHTML;
    inicio.value = e.parentNode.parentNode.cells[2].innerHTML;
    duracao.value = e.parentNode.parentNode.cells[3].innerHTML;
    status.value = e.parentNode.parentNode.cells[4].innerHTML;
    e.parentNode.parentNode.remove();
}