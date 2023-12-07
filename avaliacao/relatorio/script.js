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
    console.table(avaliacao.alunos);
    console.table(avaliacao.criterios);
    console.table(avaliacao.matriz);
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
        td.innerHTML = aluno.aluno;
        alunos.appendChild(td);
    });
}

function criteriosMatriz() {
    const criTecnicos = document.getElementById("criteriosTecnicos");
    const criGestao = document.getElementById("criteriosGestao");
    avaliacao.criterios.forEach(cri => {
        let tr = document.createElement("tr");
        let fund = document.createElement("td");
        let crit = document.createElement("td");
        if(cri.criticidade == 1) crit.classList.add("critico");
        else crit.classList.add("desejavel");
        fund.innerHTML = cri.fundamento;
        crit.innerHTML = cri.criterio;
        tr.appendChild(fund);
        tr.appendChild(crit);
        if (cri.tg == "T") {
            criTecnicos.appendChild(tr);
        } else {
            criGestao.appendChild(tr);
        }
    });
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
        criteriosMatriz();
    }
}