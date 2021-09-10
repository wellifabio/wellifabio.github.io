const jogo1 = document.getElementById("jogo1");
const jogo2 = document.getElementById("jogo2");
const corpo = document.getElementById("corpo");
const btPDF = document.createElement("button");
const j1 = document.querySelector(".j1");
const j2 = document.querySelector(".j2");
const j3 = document.querySelector(".j3");
btPDF.innerHTML = "Download do bilhete preechido";
btPDF.setAttribute("onclick", "salvarPDF()");
btPDF.setAttribute("id", "btPDF");
var isBtPDF = false;
var jogos = [];
var numeros = [];
var qtdNum = 0;

function limpar() {
    jogo1.value = "";
    jogo2.value = "";
    preencherCartela();
    if (isBtPDF) {
        document.getElementById("btPDF").remove();
        isBtPDF = false;
    }
}

function geraJogos() {
    qtdNum = parseInt(document.getElementById("qtdNum").value);
    let nTemp = 0;
    jogos = [];
    for (x = 0; x < 2; x++) {
        numeros = [];
        for (i = 0; i < qtdNum; i++) {
            while (numeros.indexOf(nTemp = Math.floor(Math.random() * 59 + 1)) >= 0);
            numeros[i] = nTemp;
        }
        for (i = 0; i < qtdNum; i++)if (parseInt(numeros[i]) < 10) numeros[i] = "0" + numeros[i];
        numeros = numeros.sort();
        jogos.push(numeros);
    }
    jogo1.value = jogos[0].toString().replaceAll(",", " ");
    jogo2.value = jogos[1].toString().replaceAll(",", " ");
    verificarMinimoSeis();
}

function verificarMinimoSeis() {
    preencherCartela();
    if ((jogo1.value.length > 16 || jogo2.value.length > 16) && !isBtPDF) {
        corpo.appendChild(btPDF);
        isBtPDF = true;
    }
    if ((jogo1.value.length < 17 && jogo2.value.length < 17) && isBtPDF) {
        document.getElementById("btPDF").remove();
        isBtPDF = false;
    }
}

function salvarPDF() {
    jogos = [];
    numeros = jogo1.value.split(" ");
    jogos.push(numeros);
    numeros = jogo2.value.split(" ");
    jogos.push(numeros);
    var x = 50;
    var y = 50;
    var doc = new jsPDF();
    doc.addImage("./bilhete.png", 'PNG', x + 6, y + 6, 98, 138);
    doc.setFillColor('#000');
    let val = 0;
    let xx = 0;
    let yy = 0;
    for (i = 0; i < jogos.length; i++) {
        for (j = 0; j < jogos[i].length; j++) {
            val = parseInt(jogos[i][j]);
            if (val < 11) {
                yy = y + 31.2;
                xx = x + 12 + 7.2 * val;
            } else if (val < 21) {
                yy = y + 35;
                xx = x + 12 + 7.2 * (val - 10);
            } else if (val < 31) {
                yy = y + 39.1;
                xx = x + 12 + 7.2 * (val - 20);
            } else if (val < 41) {
                yy = y + 43.2;
                xx = x + 12 + 7.2 * (val - 30);
            } else if (val < 51) {
                yy = y + 46.9;
                xx = x + 12 + 7.2 * (val - 40);
            } else {
                yy = y + 50.2;
                xx = x + 12 + 7.2 * (val - 50);
            }
            doc.rect(xx, yy, 5.2, 2.6, 'F');
        }
        y += 29.5;
    }
    yy = 142.2;
    xx = x + 12 + 7.2 * (jogos[0].length - 5);
    doc.rect(xx, yy, 5.2, 2.6, 'F');
    doc.save('bilhete.pdf');
}

function preencherCartela() {
    j1.innerHTML = "";
    let p;
    for (i = 0; i < 60; i++) {
        p = document.createElement("button");
        p.className = isInJogo(i + 1, true);
        p.value = (i + 1);
        p.setAttribute("onclick", "chekClick(this,1)");
        j1.appendChild(p);
    }
    j2.innerHTML = "";
    for (i = 0; i < 60; i++) {
        p = document.createElement("button");
        p.className = isInJogo(i + 1, false);
        p.value = (i + 1);
        p.setAttribute("onclick", "chekClick(this,2)");
        j2.appendChild(p);
    }
    preencherQuantosNumeros();
}

function preencherQuantosNumeros() {
    j3.innerHTML = "";
    let p;
    let posicao = -125;
    if (jogo1.value.length > 0 && jogo2.value.length > 0) {
        jogos = [];
        numeros = jogo1.value.split(" ");
        outros = jogo2.value.split(" ");
        if (numeros.length >= 6 && numeros.length <= 15 && numeros.length == outros.length) {
            p = document.createElement("div");
            p.className = "cheio";
            posicao += 30 * numeros.length;
            p.setAttribute("style", "margin-left:" + posicao + "px;");
            j3.appendChild(p);
        }
    }
}

function isInJogo(val, j) {
    if (j)
        numeros = jogo1.value.split(" ");
    else
        numeros = jogo2.value.split(" ");
    for (x = 0; x < numeros.length; x++)
        if (numeros[x] == val)
            return "cheio";
    return "vazio";
}

function chekClick(e, j) {
    jogos = [];
    if (e.value < 10) e.value = "0" + e.value;
    numeros = jogo1.value.split(" ");
    if (j == 1)
        if (contem(e.value, numeros))
            numeros.splice(numeros.indexOf(e.value), 1);
        else
            numeros.push(e.value);
    numeros = numeros.sort();
    jogos.push(numeros);
    numeros = jogo2.value.split(" ");
    if (j == 2)
        if (contem(e.value, numeros))
            numeros.splice(numeros.indexOf(e.value), 1);
        else
            numeros.push(e.value);
    numeros = numeros.sort();
    jogos.push(numeros);
    jogo1.value = jogos[0].toString().replaceAll(",", " ");
    jogo2.value = jogos[1].toString().replaceAll(",", " ");
    jogo1.value = limpaEspacos(jogo1.value);
    jogo2.value = limpaEspacos(jogo2.value);
    preencherCartela();
}

function contem(v, vetor) {
    for (x = 0; x < vetor.length; x++)
        if (vetor[x] == v)
            return true;
    return false;
}

function limpaEspacos(c) {
    if (c.substr(0, 1) === " ")
        return c.substr(1);
    else
        return c;
}