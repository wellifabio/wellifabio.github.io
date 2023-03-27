const body = document.querySelector("#body");
const header = body.childNodes[1];
const main = body.childNodes[3];
const footer = body.childNodes[5];
const modal = body.childNodes[7];
var dados = [];

const carregaArquivo = (json) => {
    fetch(json)
        .then(resp => resp.json())
        .then(
            resp => {
                dados = resp;
                cabecalho();
                principal();
            }
        )
};

const cabecalho = () => {
    header.innerHTML = "Projeto " + dados[0].projeto
}

const principal = () => {
    let tabela = document.createElement("table")
    tabela.appendChild(thead())
    tabela.appendChild(tbody())
    main.appendChild(tabela)
}

const thead = () => {
    let cab = document.createElement("thead")
    let linha = document.createElement("tr")
    for (i = 0; i < dados[0].duracao; i++) {
        let th = document.createElement("th")
        if (i == 0) th.innerHTML = dados[0].projeto
        else th.innerHTML = i
        linha.appendChild(th)
    }
    return cab.appendChild(linha)
}

const tbody = () => {
    let corpo = document.createElement("tbody")
    for (i = 1; i < dados.length; i++) {
        let linha = document.createElement("tr")
        let desc = document.createElement("td")
        let resp = document.createElement("td")
        desc.innerHTML = dados[i].descricao
        resp.innerHTML = dados[i].responsavel
        linha.appendChild(desc)
        linha.appendChild(resp)
        bts(dados[i].inicio, dados[i].duracao, linha)
        corpo.appendChild(linha)
    }
    return corpo
}

const bts = (inicio, duracao, linha) => {
    for (i = 2; i < dados[0].duracao; i++) {
        let td = document.createElement("td")
        td.innerHTML = '*'
        linha.appendChild(td)
    }
}

footer.innerHTML = "Rodapé"
modal.innerHTML = "Modal"
