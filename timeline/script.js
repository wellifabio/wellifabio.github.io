const body = document.querySelector("#body")
const header = body.childNodes[1]
const main = body.childNodes[3]
const footer = body.childNodes[5]
const task = body.childNodes[7]
const nProj = body.childNodes[9]
const add = document.querySelector("#add")
const set = document.querySelector("#proj")
var dados = window.localStorage.getItem("dados") == null ? [] : JSON.parse(window.localStorage.getItem("dados"))
const total = dados[0].duracao <= 45 ? dados[0].duracao : dados[0].duracao <= 315 ? parseInt(dados[0].duracao / 7) : parseInt(dados[0].duracao / 30)
const grandeza = dados[0].duracao <= 45 ? "Dias" : dados[0].duracao <= 315 ? "Semanas" : "Mêses"

add.childNodes[13].innerHTML = "Duração em " + grandeza

const cores = {
    "Planejado": "rgb(24, 154, 225);",
    "Atrasado": "rgb(238, 190, 0);",
    "Execução": "rgb(202, 52, 32);",
    "Concluído": "rgb(8, 75, 33);",
}

const iniciar = () => {
    if (dados.length == 0) {
        fetch("exemplo.json")
            .then(resp => resp.json())
            .then(
                resp => {
                    dados = resp
                    window.localStorage.setItem("dados", JSON.stringify(dados))
                    window.location.reload()
                }
            )
    } else {
        cabecalho()
        principal()
        rodape()
    }
};

add.addEventListener("submit", (e) => {
    e.preventDefault()
    task.classList.toggle("oculto")
    let tarefa = {}
    tarefa.descricao = add.descricao.value
    tarefa.responsavel = add.responsavel.value
    tarefa.inicio = parseInt(add.inicio.value)
    tarefa.duracao = parseInt(add.duracao.value)
    tarefa.status = add.status.value
    let acao = parseInt(add.action.value)
    if (tarefa.inicio > 0 && tarefa.inicio <= total && tarefa.duracao > 0 && tarefa.inicio + tarefa.duracao <= total + 1) {
        if (acao == 0)
            dados.push(tarefa)
        else
            dados[acao] = tarefa
        window.localStorage.setItem("dados", JSON.stringify(dados))
    } else {
        alert("Data de início inválida")
    }
    window.location.reload()
})

set.addEventListener("submit", (e) => {
    e.preventDefault()
    nProj.classList.toggle("oculto")
    let duracao = parseInt(set.duracao.value)
    if (duracao >= 15 && duracao <= 1350) {
        let projeto = {
            projeto: set.nome.value,
            duracao: duracao,
            inicio: set.inicio.value
        }
        dados = []
        dados.push(projeto)
        window.localStorage.setItem("dados", JSON.stringify(dados))
    } else {
        alert("Este cronograma contempla projetos entre 15 dias a 45 mêses (1350 dias)")
    }
    window.location.reload()
})

const cabecalho = () => {
    header.innerHTML = "<h1>Projeto " + dados[0].projeto + "</h1>"
}

const rodape = () => {
    footer.innerHTML = "<h3>Início do projéto em: </h3> <input type='date' value='" + dados[0].inicio + "'/>"
    footer.innerHTML += `<button onclick="salvar()">Salvar</button>`
    footer.innerHTML += `<input type="file" id="abrir" accept=".json"/>`
    footer.innerHTML += `<button onclick='carregarExemplo()'>Carregar Exemplo</button>`
    footer.innerHTML += `<button onclick='nProj.classList.toggle("oculto");'>Limpar e cria novo</button>`
    footer.innerHTML += `<button onclick='task.classList.toggle("oculto");'> + tarefa</button>`
    document.getElementById("abrir").addEventListener("change", (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            window.localStorage.setItem("dados", reader.result)
            window.location.reload()
        }
    })
}

const principal = async () => {
    main.innerHTML = ""
    let tabela = document.createElement("table")
    tabela.appendChild(thead())
    tabela.appendChild(tbody())
    main.appendChild(tabela)
}

const thead = () => {
    let cab = document.createElement("thead")
    let linha = document.createElement("tr")
    for (i = 0; i <= total + 1; i++) {
        let th = document.createElement("th")
        if (i == 0) th.innerHTML = "Tarefas / " + grandeza
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
        bts(dados[i].inicio, dados[i].duracao, linha, i)
        corpo.appendChild(linha)
    }
    return corpo
}

const bts = (inicio, duracao, l, indice) => {
    for (j = 1; j <= total; j++) {
        let td = document.createElement("td")
        if (j >= inicio && j < inicio + duracao) {
            let bt = document.createElement("button")
            bt.setAttribute("class", "btn")
            bt.setAttribute("onclick", `alt('${indice}')`)
            td.appendChild(bt)
            td.setAttribute("style", "background-color: " + cores[dados[i].status])
        }
        l.appendChild(td)
    }
}

const alt = (i) => {
    let del = document.createElement("button")
    del.setAttribute("onclick", `del('${i}')`)
    del.innerHTML = "Excluir tarefa"
    add.childNodes[3].value = dados[i].descricao
    add.childNodes[7].value = dados[i].responsavel
    add.childNodes[11].value = dados[i].inicio
    add.childNodes[15].value = dados[i].duracao
    add.childNodes[19].value = dados[i].status
    add.childNodes[21].childNodes[3].value = "Atualizar"
    add.childNodes[21].childNodes[5].value = i
    add.childNodes[21].appendChild(del)
    task.classList.toggle("oculto");
}

const del = (indice) => {
    dados.splice(indice, 1)
    window.localStorage.setItem("dados", JSON.stringify(dados))
    window.location.reload()
}
const carregarExemplo = async () => {
    let resp = await fetch("exemplo.json")
    let json = await resp.json()
    dados = json
    window.localStorage.setItem("dados", JSON.stringify(dados))
    window.location.reload()
}

const salvar = () => {
    if (dados.length > 1) {
        let a = document.createElement("a")
        a.href = "data:," + JSON.stringify(dados)
        a.download = "gantt.json"
        a.click();
        alert("Gráfico salvo na pasta padrão de downloads do seu computador")
    } else {
        alert("Não há dados serem salvos.")
    }
}