var avaliacao = {
    titulo: "",
    turma: "",
    instrutor: "",
    componente: "",
    data: "",
    tipo: "",
    alunos: [],
    criterios: [],
    matriz: []
}

var notas = [], niveis = [], desempenho = [];
var nivelMinimo = 0;
var totNiveis = 0;
var verNotas = true;

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
        let alunos = reader.result.split("\n");
        alunos.forEach(aluno => {
            avaliacao.alunos.push({ "aluno": aluno });
        });
        inputAlunos.classList.add("oculto");
        novosAlunos.classList.add("oculto");
        localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
        montarAvaliacao();
    }
});

fileCriterios.addEventListener("change", (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        let crits = reader.result.split("\n");
        crits.forEach((cri, i) => {
            if (cri.split(";").length == 4 && i > 0) {
                avaliacao.criterios.push({ "tg": cri.split(";")[2], "fundamento": cri.split(";")[0], "criterio": cri.split(";")[1], "criticidade": cri.split(";")[3].slice(0, 1) });
            }
        });
        localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
        inputCriterios.classList.add("oculto");
        novosCriterios.classList.add("oculto");
        montarMatriz();
        window.location.reload();
    }
});

formCriterios.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let i = 0; i < formCriterios.inpTecnico.value; i++) {
        novoCriterio("T", 0);
    }
    for (let i = 0; i < formCriterios.inpGestao.value; i++) {
        novoCriterio("G", 0);
    }
    montarMatriz();
    window.localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
    window.location.reload();
});

function novoCriterio(tg, criticidade) {
    if (tg == "G")
        avaliacao.criterios.push({
            "tg": tg,
            "fundamento": "Copie do plano de curso",
            "criterio": "Descreva os indicadoes de desempenho, conforme a avaliação aplicada",
            "criticidade": criticidade
        });
    else {
        let backup = avaliacao.criterios;
        avaliacao.criterios = [];
        backup.forEach(cri => {
            if (cri.tg == "T") avaliacao.criterios.push(cri);
        });
        avaliacao.criterios.push({
            "tg": tg,
            "fundamento": "Copie do plano de curso",
            "criterio": "Descreva os indicadoes de desempenho, conforme a avaliação aplicada",
            "criticidade": criticidade
        });
        backup.forEach(cri => {
            if (cri.tg == "G") avaliacao.criterios.push(cri);
        });
    }
}

function addCompTec() {
    novoCriterio("T", 0);
    montarMatriz();
    window.location.reload();
}

function addCompGes() {
    novoCriterio("G", 0);
    montarMatriz();
    window.location.reload();
}

formAlunos.addEventListener("submit", (e) => {
    e.preventDefault();
    formAlunos.inpAlunos.value.split("\n").forEach(aluno => {
        avaliacao.alunos.push({ "aluno": aluno });
    });
    window.localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
    window.location.reload();
});

function salvar() {
    avaliacao.titulo = document.getElementById("titulo").innerHTML;
    avaliacao.turma = document.getElementById("turma").innerHTML.split(": ")[1];
    avaliacao.componente = document.getElementById("componente").innerHTML.split(": ")[1];
    avaliacao.instrutor = document.getElementById("instrutor").innerHTML.split(": ")[1];
    avaliacao.data = document.getElementById("data").innerHTML.split(": ")[1];
    let nomes = document.querySelectorAll(".tv2");
    let funds = document.querySelectorAll(".fundamentos");
    let cris = document.querySelectorAll(".criterios");
    for (let i = 0; i < nomes.length; i++) {
        avaliacao.alunos[i].aluno = nomes[i].innerHTML;
    }
    for (let i = 0; i < funds.length; i++) {
        avaliacao.criterios[i].fundamento = funds[i].innerHTML;
        avaliacao.criterios[i].criterio = cris[i].innerHTML;
    }
    window.localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
    window.location.reload();
}

function download() {
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
    avaliacao.tipo = "F";
    obterDadosIniciais();
}
function novaSomativa() {
    avaliacao.titulo = "INSTRUMENTO DE REGISTRO DE AVALIAÇÃO SOMATIVA";
    avaliacao.tipo = "S";
    obterDadosIniciais();
}
function novaAutoavalicao() {
    avaliacao.titulo = "INSTRUMENTO DE REGISTRO DE AUTOAVALIAÇÃO";
    avaliacao.tipo = "A";
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
    avaliacao.matriz = [];
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

function ocultar() {
    let nts = document.querySelectorAll(".nota");
    let nvs = document.querySelectorAll(".nivelFinal");
    let ntf = document.querySelectorAll(".notaFinal");
    let dest = document.querySelectorAll(".destacado");
    if (verNotas) {
        nts.forEach(nt => {
            nt.classList.add("oculto");
        });
        nvs.forEach(nt => {
            nt.innerHTML = "";
        });
        ntf.forEach(nt => {
            nt.innerHTML = "";
        });
        dest.forEach(d => {
            d.classList.remove("destacado");
        });
        document.getElementById("ocultar").innerHTML = "Mostrar notas";
        verNotas = false;
    } else {
        window.location.reload();
    }
}

function criteriosMatriz(tg) {
    const tbody = document.getElementById("tbody");
    let nT = 0;
    let mesclar = 0;
    let competencias = "Competências<br>de Gestão";

    avaliacao.criterios.forEach(cri => {
        if (cri.tg == "T") nT++;
    });

    let nG = avaliacao.criterios.length - nT;

    if (tg == "T") {
        mesclar = nT;
        competencias = "Competências<br>Técnicas";
    } else mesclar = nG;

    let primeiraLinha = true;

    avaliacao.criterios.forEach((cri, i) => {
        let tr = document.createElement("tr");
        let fundamento = document.createElement("td");
        let criterio = document.createElement("td");
        let acoes = document.createElement("td");
        let notas = document.createElement("td");
        fundamento.classList.add("fundamentos");
        criterio.classList.add("criterios");
        acoes.classList.add("acoes");
        acoes.innerHTML = `${avaliacao.tipo}<button type="button" onclick="altCrit(${i})"class="${cri.criticidade == 1 ? 'btcri' : 'btdes'}">&nbsp;</button><button type="button" class="btdel" onclick="del(${i})">X</button>`;
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
            tr.appendChild(acoes);
            let tabNotas = document.createElement("table");
            tabNotas.classList.add("tabNotas");
            let tabBody = document.createElement("tbody");
            let tabTr = document.createElement("tr");
            tabBody.appendChild(tabTr);
            tabNotas.appendChild(tabBody);
            avaliacao.matriz[i].forEach((linha, j) => {
                let td = document.createElement("td");
                let inp = document.createElement("input");
                inp.id = i + "_" + j;
                inp.setAttribute("onclick", "nota(this.id)");
                inp.classList.add("nota");
                inp.type = "button";
                inp.value = linha;
                td.appendChild(inp);
                tabTr.appendChild(td);
            });
            notas.classList.add("notas");
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

function altCrit(i) {
    if (confirm("Deseja realmente alterar a criticidade do critério?")) {
        if (avaliacao.criterios[i].criticidade == 0) avaliacao.criterios[i].criticidade = 1;
        else avaliacao.criterios[i].criticidade = 0;
        salvar();
    }
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
    if (avaliacao.alunos.length == 0) {
        inputAlunos.classList.remove("oculto");
        novosAlunos.classList.remove("oculto");
    } else if (avaliacao.criterios.length == 0) {
        inputCriterios.classList.remove("oculto");
        novosCriterios.classList.remove("oculto");
        alunosMatriz();
    } else {
        alunosMatriz();
        criteriosMatriz("T");
        criteriosMatriz("G");
        calculaDesempenho();
        notasMatriz();
        document.getElementById("salvar").classList.remove("oculto");
        document.getElementById("download").classList.remove("oculto");
        compTec.classList.remove("oculto");
        compGes.classList.remove("oculto");
    }
}

function calculaDesempenho() {
    let nCriticos = 0;
    let nDesejaveis = 0;
    avaliacao.criterios.forEach(cri => {
        if (cri.criticidade != '1') nDesejaveis++;
        else nCriticos++;
    });
    totNiveis = nCriticos + nDesejaveis;
    let decMais50 = Math.floor(50 / nDesejaveis);
    let decMenos50 = Math.floor(50 / nCriticos);
    let not = 100;
    desempenho.push({ "descricao": "Atingiu todos os critérios críticos e desejáveis", "nivel": 1, "nota": not });
    for (let i = 1; i < nDesejaveis; i++) {
        not -= decMais50;
        desempenho.push({ "descricao": `Atingiu todos os critérios críticos e ${nDesejaveis - i} desejáveis`, "nivel": i + 1, "nota": not });
    }
    not = 50;
    nivelMinimo = desempenho.length;
    desempenho.push({ "descricao": "Atingiu todos os critérios críticos", "nivel": nDesejaveis + 1, "nota": not });
    for (let i = 1; i < nCriticos; i++) {
        not -= decMenos50;
        desempenho.push({ "descricao": `Atingiu ${nCriticos - i} critérios críticos`, "nivel": nDesejaveis + i + 1, "nota": not });
    }
    document.getElementById("niveis").classList.remove("oculto");
    document.getElementById("imprimir").classList.remove("oculto");
    document.getElementById("ocultar").classList.remove("oculto");
    for (let i = 0; i < avaliacao.alunos.length; i++) {
        let notaCritica = 0;
        let notaDesejavel = 0;
        avaliacao.matriz.forEach((linha, j) => {
            if (avaliacao.criterios[j].criticidade == 1) notaCritica += linha[i];
            else notaDesejavel += linha[i];
        });
        if (notaCritica < nCriticos) notaCritica = notas.push(notaCritica);
        else notas.push(notaCritica + notaDesejavel);
    }
}

function notasMatriz() {
    const nivel = document.getElementById("nivel");
    const nota = document.getElementById("nota");

    let tabNiveis = document.createElement("table");
    tabNiveis.classList.add("tabNiveis");
    let tabTr = document.createElement("tr");
    tabNiveis.appendChild(tabTr);

    let tabNotas = document.createElement("table");
    tabNotas.classList.add("tabNiveis");
    let tabTrn = document.createElement("tr");
    tabNotas.appendChild(tabTrn);

    notas.forEach((linha, i) => {
        let td1 = document.createElement("td");
        td1.classList.add("nivelFinal");
        td1.innerHTML = linha;
        tabTr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.classList.add("notaFinal");
        let nt = totNiveis - linha == totNiveis ? 0 : desempenho[totNiveis - linha].nota;
        if (nt < 50) {
            td1.classList.add("destacado");
            td2.classList.add("destacado");
            document.getElementById("alunos").childNodes[i].classList.add("destacado");
        }
        td2.innerHTML = nt;
        tabTrn.appendChild(td2);
    });

    nivel.setAttribute("style", "margin:0;padding:0;");
    nivel.appendChild(tabNiveis);

    nota.setAttribute("style", "margin:0;padding:0;");
    nota.appendChild(tabNotas);
}

function mostrarNiveis() {
    document.getElementById("modalNiveis").classList.remove("oculto");
    document.getElementById("bodyNiveis").innerHTML = "";
    desempenho.forEach(nivel => {
        let tr = document.createElement("tr");
        if (nivel.nivel == nivelMinimo + 1) tr.classList.add("nivelMinimo");
        let td = document.createElement("td");
        td.innerHTML = nivel.descricao;
        tr.appendChild(td);
        td = document.createElement("td");
        td.setAttribute("style", "text-align:center;");
        td.innerHTML = nivel.nivel;
        tr.appendChild(td);
        td = document.createElement("td");
        td.setAttribute("style", "text-align:center;");
        td.innerHTML = nivel.nota;
        tr.appendChild(td);
        document.getElementById("bodyNiveis").appendChild(tr);
    });
    document.getElementById("nivelMinimo").innerHTML = desempenho[nivelMinimo].nivel;
}

function del(i) {
    if (confirm("Deseja realmente excluir o critério?")) {
        avaliacao.criterios.splice(i, 1);
        montarMatriz();
        window.localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
        window.location.reload();
    }
}