const btFechar = document.querySelector("#btFechar");
const detalhes = document.querySelector("#detalhes");
const tcorpo = document.querySelector("#tcorpo");

var dados = [];

function abrirDados(){
    fetch("../mocks/pizzas.js")
    .then(result => result.json())
    .then(result => {
        dados = result;
        preecherTabela();
    })
}

btFechar.addEventListener('click', () => {
    detalhes.classList.toggle("oculto");
})

function preecherTabela() {
    dados.forEach((e, i) => {
        const linha = document.createElement("tr");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const preco = document.createElement("td");
        const detalhes = document.createElement("td");
        id.innerHTML = e.id;
        nome.innerHTML = e.nome;
        preco.innerHTML = e.preco;
        detalhes.innerHTML = `<button onclick="abrirModal('${i}')">Detalhes</button>`;
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(preco);
        linha.appendChild(detalhes);
        tcorpo.appendChild(linha)
    })
}

function abrirModal(i) {
    detalhes.classList.toggle("oculto");
    document.querySelector("#id").value = dados[i].id;
    document.querySelector("#nome").value = dados[i].nome;
}

function cadastarLocal() {
    const item = {
        id: document.querySelector("#id").value,
        nome: document.querySelector("#nome").value
    }

    //Abrir ou iniciar a lista de produtos
    const produtos = JSON.parse(window.localStorage.getItem("produtos")) || []
    //Acrescentar o novo item na lista
    produtos.push(item)
    //Salvar a lista no armazenamento local
    window.localStorage.setItem("produtos", JSON.stringify(produtos))

    //Recarregar a página
    window.location.reload()
}