const body = document.querySelector("#body");
const header = body.childNodes[1];
const main = body.childNodes[3];
const footer = body.childNodes[5];
const modal = body.childNodes[7];
const add = document.querySelector("#add");

const cores = {
    "Planejado" : "rgb(24, 154, 225);",
    "Atrasado" : "rgb(238, 190, 0);",
    "Execução" : "rgb(202, 52, 32);",
    "Concluído" : "rgb(8, 75, 33);",
}
var dados = [];


const carregaArquivo = (json) => {
    fetch(json)
        .then(resp => resp.json())
        .then(
            resp => {
                dados = resp;
                cabecalho();
                principal();
                rodape();
            }
        )
};

add.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.classList.toggle("oculto");
})

const cabecalho = () => {
    header.innerHTML = "<h1>Projeto " + dados[0].projeto + "</h1>";
}

const rodape = () => {
    footer.innerHTML = "<h3>Início do projéto em: </h3> <input type='date' value='" + dados[0].inicio + "'/>";
    footer.innerHTML += `<button onclick='modal.classList.toggle("oculto");'>Adicionar tarefa</button>`;
}

const principal = async () => {
    let tabela = document.createElement("table")
    tabela.appendChild(thead())
    tabela.appendChild(tbody())
    main.appendChild(tabela)
}

const thead = () => {
    let cab = document.createElement("thead")
    let linha = document.createElement("tr")
    for (i = 0; i <= dados[0].duracao + 1; i++) {
        let th = document.createElement("th")
        if (i == 0) th.innerHTML = "Tarefas"
        else if (i == 1) th.innerHTML = "Recursos"
        else th.innerHTML = i <= 10 ? "0" + (i - 1) : i - 1
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
        resp.setAttribute("style", "text-align: center;")
        desc.innerHTML = dados[i].descricao
        resp.innerHTML = dados[i].responsavel
        linha.appendChild(desc)
        linha.appendChild(resp)
        bts(dados[i].inicio, dados[i].duracao, linha)
        corpo.appendChild(linha)
    }
    return corpo
}

const bts = (inicio, duracao, l) => {
    for (j = 1; j <= dados[0].duracao; j++) {
        let td = document.createElement("td")
        if (j >= inicio && j < inicio + duracao) {
            let bt = document.createElement("button")
            bt.setAttribute("class", "btn")
            bt.setAttribute("onclick", "alert('Tarefa concluída')")
            td.appendChild(bt)
            td.setAttribute("style", "background-color: " + cores[dados[i].status])
        }
        l.appendChild(td)
    }
}