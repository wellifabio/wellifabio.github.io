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
        const img = document.createElement("td");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const preco = document.createElement("td");
        const detalhes = document.createElement("td");
        img.innerHTML = `<img alt="logo" src=${e.img}>`
        id.innerHTML = e.id;
        nome.innerHTML = e.nome;
        preco.innerHTML = e.preco;
        detalhes.innerHTML = `<button onclick="abrirModal('${i}')">Ver<br>detalhes</button>`;
        linha.appendChild(img);
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(preco);
        linha.appendChild(detalhes);
        tcorpo.appendChild(linha)
    })
    console.log(window.localStorage.getItem("itens"))
}

function abrirModal(i) {
    detalhes.classList.toggle("oculto");
    document.querySelector("#id").value = dados[i].id;
    document.querySelector("#nome").value = dados[i].nome;
    document.querySelector("#img").src = dados[i].img;
    document.querySelector("#descricao").value = dados[i].descricao;
    document.querySelector("#nome").value = dados[i].nome;
}

function salvarLocalmente() {
    const item = {
        id: document.querySelector("#id").value,
        nome: document.querySelector("#nome").value
    }

    //Abrir ou iniciar a lista de itens
    const itens = JSON.parse(window.localStorage.getItem("itens")) || []
    //Acrescentar o novo item na lista
    itens.push(item)
    //Salvar a lista no armazenamento local
    window.localStorage.setItem("itens", JSON.stringify(itens))

    //Recarregar a página
    window.location.reload()
}