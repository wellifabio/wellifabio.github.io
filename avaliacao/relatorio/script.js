var avaliacao = {
    titulo: "",
    turma: "",
    instrutor: "",
    componente: "",
    data: "",
    alunos: [],
    criterios: [],
    matriz: []
}

var notas = [], niveis = [], desempenho = [];

const fileAvaliacao = document.getElementById("fileAvaliacao");
const inputAvaliacao = document.getElementById("inputAvaliacao");
const fileAlunos = document.getElementById("fileAlunos");
const inputAlunos = document.getElementById("inputAlunos");
const fileCriterios = document.getElementById("fileCriterios");
const inputCriterios = document.getElementById("inputCriterios");

const local = JSON.parse(localStorage.getItem("avaliacao"));
if (local) {
    avaliacao = local;
    montarAvaliacao();
}

function reiniciar() {
    if (confirm("Deseja realmente iniciar uma nova avaliação?<br>Os dados não salvos serão perdidos.")) {
        localStorage.removeItem("avaliacao");
        location.reload();
    }
}

fileAvaliacao.addEventListener("change", (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        avaliacao = JSON.parse(reader.result);
        inputAvaliacao.classList.add("oculto");
        localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
        montarAvaliacao();
    }
});

fileAlunos.addEventListener("change", (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        avaliacao.alunos = JSON.parse(reader.result);
        inputAlunos.classList.add("oculto");
        localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
        montarAvaliacao();
    }
});

fileCriterios.addEventListener("change", (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        avaliacao.criterios = JSON.parse(reader.result);
        inputCriterios.classList.add("oculto");
        montarMatriz();
        montarAvaliacao();
    }
});

function salvar() {
    if (avaliacao.alunos.length > 0 && avaliacao.criterios.length > 0) {
        let a = document.createElement("a")
        a.href = "data:," + JSON.stringify(avaliacao)
        a.download = avaliacao.turma + "_" + avaliacao.componente + ".json"
        a.click();
        alert("Dados salvos pasta padrão de downloads como [avaliacao.json]")
    } else {
        alert("Não há dados serem salvos.")
    }
}

function novaFormativa() {
    avaliacao.titulo = "INSTRUMENTO DE REGISTRO DE AVALIAÇÃO FORMATIVA";
    obterDadosIniciais();
}
function novaSomativa() {
    avaliacao.titulo = "INSTRUMENTO DE REGISTRO DE AVALIAÇÃO SOMATIVA";
    obterDadosIniciais();
}
function novaAutoavalicao() {
    avaliacao.titulo = "INSTRUMENTO DE REGISTRO DE AUTOAVALIAÇÃO";
    obterDadosIniciais();
}

function obterDadosIniciais() {
    avaliacao.turma = prompt("Digite o nome da turma: ");
    avaliacao.componente = prompt("Digite o componente: ");
    avaliacao.instrutor = prompt("Digite o nome do instrutor: ");
    avaliacao.data = new Date().toLocaleDateString();
    montarAvaliacao();
    localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
}

function montarMatriz() {
    for (let i = 0; i < avaliacao.criterios.length; i++) {
        let linha = [];
        for (let j = 0; j < avaliacao.alunos.length; j++) {
            linha.push(0);
        }
        avaliacao.matriz.push(linha);
    }
    localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
}

function alunosMatriz() {
    const alunos = document.getElementById("alunos");
    avaliacao.alunos.forEach(aluno => {
        let td = document.createElement("td");
        td.classList.add("tv2");
        td.setAttribute("contentEditable", "true");
        td.innerHTML = aluno.aluno;
        alunos.appendChild(td);
    });
}

function criteriosMatriz(tg) {
    const tbody = document.getElementById("tbody");
    let nT = 0;
    let mesclar = 0;
    let competencias = "Competências de Gestão";
    avaliacao.criterios.forEach(cri => {
        if (cri.tg == "T") nT++;
    });
    let nG = avaliacao.criterios.length - nT;
    if (tg == "T") { mesclar = nT; competencias = "Competências Técnicas"; } else mesclar = nG;
    let primeiraLinha = true;
    avaliacao.criterios.forEach((cri, i) => {
        let tr = document.createElement("tr");
        let fundamento = document.createElement("td");
        let criterio = document.createElement("td");
        let notas = document.createElement("td");
        fundamento.classList.add("fundamentos");
        if (cri.criticidade == 1) criterio.classList.add("critico");
        else criterio.classList.add("desejavel");
        fundamento.setAttribute("contentEditable", "true");
        criterio.setAttribute("contentEditable", "true");
        fundamento.innerHTML = cri.fundamento;
        criterio.innerHTML = cri.criterio;
        if (cri.tg == tg) {
            if (primeiraLinha) {
                let lateral = document.createElement("th");
                lateral.classList.add("tv");
                lateral.setAttribute("rowspan", mesclar);
                lateral.innerHTML = competencias;
                tr.appendChild(lateral);
                primeiraLinha = false;
            }
            tr.appendChild(fundamento);
            tr.appendChild(criterio);
            let tabNotas = document.createElement("table");
            tabNotas.classList.add("tabNotas");
            let tabBody = document.createElement("tbody");
            let tabTr = document.createElement("tr");
            tabBody.appendChild(tabTr);
            tabNotas.appendChild(tabBody);
            avaliacao.matriz[i].forEach((linha, j) => {
                let td = document.createElement("td");
                td.setAttribute("style", "height:100%;border-bottom:none;margin:0;padding:0;");
                let inp = document.createElement("input");
                inp.id = i + "_" + j;
                inp.setAttribute("onclick", "nota(this.id)");
                inp.classList.add("nota");
                inp.type = "button";
                inp.value = linha;
                td.appendChild(inp);
                tabTr.appendChild(td);
            });
            notas.setAttribute("style", "margin:0;padding:0;");
            notas.appendChild(tabNotas);
            tr.appendChild(notas);
            tbody.appendChild(tr);
        }
    });
}

function nota(id) {
    let i = parseInt(id.split("_")[0]);
    let j = parseInt(id.split("_")[1]);
    let nota = document.getElementById(id).value;
    if (nota == 0) nota = 1; else nota = 0;
    avaliacao.matriz[i][j] = nota;
    localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
    document.getElementById("tbody").innerHTML = "";
    criteriosMatriz("T");
    criteriosMatriz("G");
}

function montarAvaliacao() {
    document.getElementById("titulo").innerHTML = avaliacao.titulo;
    document.getElementById("turma").innerHTML = "Turma: " + avaliacao.turma;
    document.getElementById("componente").innerHTML = "Componente: " + avaliacao.componente;
    document.getElementById("instrutor").innerHTML = "Instrutor: " + avaliacao.instrutor;
    document.getElementById("data").innerHTML = "Data: " + avaliacao.data.slice(0, 10);
    document.getElementById("formativa").classList.add("oculto");
    document.getElementById("somativa").classList.add("oculto");
    document.getElementById("autoavaliacao").classList.add("oculto");
    document.getElementById("inputAvaliacao").classList.add("oculto");
    document.getElementById("reiniciar").classList.remove("oculto");
    document.getElementById("salvar").classList.remove("oculto");
    if (avaliacao.alunos.length == 0)
        document.getElementById("inputAlunos").classList.remove("oculto");
    else if (avaliacao.criterios.length == 0)
        document.getElementById("inputCriterios").classList.remove("oculto");
    else {
        alunosMatriz();
        criteriosMatriz("T");
        criteriosMatriz("G");
        calculaDesempenho();
    }
}

function calculaDesempenho() {
    let nCriticos = 0;
    let nDesejaveis = 0;
    avaliacao.criterios.forEach(cri => {
        if (cri.criticidade != '1') nDesejaveis++;
        else nCriticos++;
    });
    let decMais50 = Math.floor(50 / nDesejaveis);
    let decMenos50 = Math.floor(50 / nCriticos);
    let not = 100;
    desempenho.push({ "descricao": "Atingiu todos os critérios críticos e desejáveis", "nivel": 1, "nota": not });
    for (let i = 1; i < nDesejaveis; i++) {
        not -= decMais50;
        desempenho.push({ "descricao": `Atingiu todos os critérios críticos e ${nDesejaveis - i} desejáveis`, "nivel": i + 1, "nota": not });
    }
    not=50;
    desempenho.push({ "descricao": "Atingiu todos os critérios críticos", "nivel": nDesejaveis + 1, "nota": not });
    for (let i = 1; i < nCriticos; i++) {
        not -= decMenos50;
        desempenho.push({ "descricao": `Atingiu ${nCriticos - i} critérios críticos`, "nivel": nDesejaveis + i + 1, "nota": not });
    }
    console.table(desempenho);
    console.log(nCriticos);
    console.log(nDesejaveis);
}