const jogo1 = document.getElementById("jogo1");
const jogo2 = document.getElementById("jogo2");
const corpo = document.getElementById("corpo");
const botoes1 = document.getElementById("botoes1");
const botoes2 = document.getElementById("botoes2");
const btPDF1 = document.createElement("button");
const btPDF2 = document.createElement("button");
const btPDF3 = document.createElement("button");
btPDF1.innerHTML = "Download PDF do bilhete (A4 Paisagem)";
btPDF1.setAttribute("onclick", "salvarPDF('a4','l',100,35,true)");
btPDF1.setAttribute("id", "btPDF1");
btPDF1.setAttribute("class", "btAction");
btPDF2.innerHTML = "Download PDF do bilhete (A6 com imagem)";
btPDF2.setAttribute("onclick", "salvarPDF('a6','p',0,0,true)");
btPDF2.setAttribute("id", "btPDF2");
btPDF2.setAttribute("class", "btAction");
btPDF3.innerHTML = "Download PDF do bilhete (A6 sem imagem)";
btPDF3.setAttribute("onclick", "salvarPDF('a6','p',0,0,false)");
btPDF3.setAttribute("id", "btPDF3");
btPDF3.setAttribute("class", "btAction");
var isBtPDF = false;
var jogos = [];
var numeros = [];
var qtdNum = 0;
var bt1 = [];
var bt2 = [];
var temp1 = [];
var temp2 = [];

function gerarBotoes() {
    botoes1.innerHTML = "";
    botoes2.innerHTML = "";
    temp1 = [];
    temp2 = [];
    bt1 = [];
    bt2 = [];
    let id = "";
    for (i = 0; i < 25; i++) {
        bt1[i] = (document.createElement("button"));
        id = "bt1";
        if (i < 10) id += "0" + (i + 1); else id += (i + 1);
        bt1[i].setAttribute("id", id);
        bt1[i].setAttribute("class", "inputNum");
        bt1[i].setAttribute("onclick", "btChecked1(this)");
        bt1[i].innerHTML = (i + 1);
        bt1[i].value = (i + 1);
        botoes1.appendChild(bt1[i]);
    }
    for (i = 0; i < 25; i++) {
        bt2[i] = (document.createElement("button"));
        id = "bt2";
        if (i < 10) id += "0" + (i + 1); else id += (i + 1);
        bt2[i].setAttribute("id", id);
        bt2[i].setAttribute("class", "inputNum");
        bt2[i].setAttribute("onclick", "btChecked2(this)");
        bt2[i].innerHTML = (i + 1);
        bt2[i].value = (i + 1);
        botoes2.appendChild(bt2[i]);
    }
    const btLimpar = document.createElement("button");
    btLimpar.innerHTML = "Limpar";
    btLimpar.setAttribute("onclick", "limparJogos()");
    btLimpar.setAttribute("class", "btAction");
    btLimpar.setAttribute("id", "btLimpar");
    corpo.appendChild(btLimpar);
}

function btChecked1(e) {
    qtdNum = parseInt(document.getElementById("qtdNum").value);
    if (temp1.length < qtdNum) {
        let tt = '';
        if (e.value < 10) tt = "0" + e.value; else tt = e.value;
        if (temp1.indexOf(tt) < 0) {
            temp1.push(tt);
            temp1 = temp1.sort();
            jogo1.value = temp1.toString().replaceAll(",", " ");
            e.setAttribute("class", "inputClicked");
        }
    }
    verificarMinimo();
}

function btChecked2(e) {
    qtdNum = parseInt(document.getElementById("qtdNum").value);
    if (temp2.length < qtdNum) {
        let tt = '';
        if (e.value < 10) tt = "0" + e.value; else tt = e.value;
        if (temp2.indexOf(tt) < 0) {
            temp2.push(tt);
            temp2 = temp2.sort();
            jogo2.value = temp2.toString().replaceAll(",", " ");
            e.setAttribute("class", "inputClicked");
        }
    }
    verificarMinimo();
}

function limparJogos() {
    document.getElementById("btLimpar").remove();
    gerarBotoes();
    jogo1.value = temp1;
    jogo2.value = temp2;
    verificarMinimo();
}

function verificarMinimo() {
    if ((jogo1.value.length > 43 || jogo2.value.length > 43) && !isBtPDF) {
        corpo.appendChild(btPDF1);
        corpo.appendChild(btPDF2);
        corpo.appendChild(btPDF3);
        isBtPDF = true;
    }
    if ((jogo1.value.length < 44 && jogo2.value.length < 44) && isBtPDF) {
        document.getElementById("btPDF1").remove();
        document.getElementById("btPDF2").remove();
        document.getElementById("btPDF3").remove();
        isBtPDF = false;
    }
}

function geraJogos() {
    limparJogos();
    qtdNum = parseInt(document.getElementById("qtdNum").value);
    let nTemp = 0;
    jogos = [];
    numeros = [];
    for (x = 0; x < 2; x++) {
        for (i = 0; i < qtdNum; i++) {
            while (numeros.indexOf(nTemp = Math.floor(Math.random() * 25 + 1)) >= 0);
            numeros[i] = nTemp;
        }
        for (i = 0; i < qtdNum; i++)if (parseInt(numeros[i]) < 10) numeros[i] = "0" + numeros[i];
        numeros = numeros.sort();
        jogos.push(numeros);
        numeros = [];
    }
    temp1 = jogos[0].toString().replaceAll(",", " ");
    temp2 = jogos[1].toString().replaceAll(",", " ");
    jogo1.value = temp1;
    jogo2.value = temp2;
    for (i = 0; i < jogos[0].length; i++){
        bt1[parseInt(jogos[0][i])-1].setAttribute("class", "inputClicked");
        bt2[parseInt(jogos[1][i])-1].setAttribute("class", "inputClicked");    
    }
    verificarMinimo();
}

function salvarPDF(papel,orient,x,y,fundo) {
    jogos = [];
    numeros = jogo1.value.split(" ");
    jogos.push(numeros);
    numeros = jogo2.value.split(" ");
    jogos.push(numeros);
    var doc = new jsPDF({
        format: papel,
        orientation: orient,
    });
    if(fundo) doc.addImage("./bilhete.png", 'PNG', x + 6, y + 6, 75, 125);
    doc.setFillColor('#000');
    let val = 0;
    let xx = 0;
    let yy = 0;
    let yt = y;
    for (i = 0; i < jogos.length; i++) {
        for (j = 0; j < jogos[i].length; j++) {
            val = parseInt(jogos[i][j]);
            if (val < 6) {
                yy = yt + 25.3 + 4.2 * val;
                xx = x + 63;
            } else if (val < 11) {
                yy = yt + 25.3 + 4.2 * (val - 5);
                xx = x + 51.6;
            } else if (val < 16) {
                yy = yt + 25.3 + 4.2 * (val - 10);
                xx = x + 39.4;
            } else if (val < 21) {
                yy = yt + 25.3 + 4.2 * (val - 15);
                xx = x + 27.7;
            } else {
                yy = yt + 25.3 + 4.2 * (val - 20);
                xx = x + 16.2;
            }
            doc.rect(xx, yy, 3.5, 2.6, 'F');
        }
        yt += 23.2;
    }
    yy = y + 76.3;
    xx = x + 3.5 + 11.9 * (jogos[0].length - 14);
    doc.rect(xx, yy, 3.5, 2.4, 'F');
    doc.save('bilhete.pdf');
}

/**
 * Documentação jsPDF e site de testes
 * https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
 * https://rawgit.com/MrRio/jsPDF/master/
 */