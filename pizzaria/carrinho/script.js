const btFechar = document.querySelector("#btFechar");
const detalhes = document.querySelector("#detalhes");
const tcorpo = document.querySelector("#tcorpo");

const itens = JSON.parse(window.localStorage.getItem("itens")) || []

btFechar.addEventListener('click', () => {
    detalhes.classList.toggle("oculto");
})

function preecherTabela() {
    itens.forEach((e, i) => {
        const linha = document.createElement("tr");
        const img = document.createElement("td");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const preco = document.createElement("td");
        const quantidade = document.createElement("td");
        const subtotal = document.createElement("td");
        const excluir = document.createElement("td");
        img.innerHTML = `<img alt="logo" src=${e.img}>`
        id.innerHTML = e.id;
        nome.innerHTML = e.nome;
        preco.innerHTML = e.preco;
        quantidade.innerHTML = e.quantidade;
        subtotal.innerHTML = e.quantidade * e.preco;
        excluir.innerHTML = `<button onclick="excluir('${i}')">&nbsp;-&nbsp;</button>`;
        linha.appendChild(img);
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(preco);
        linha.appendChild(quantidade);
        linha.appendChild(subtotal);
        linha.appendChild(excluir);
        tcorpo.appendChild(linha)
    })
}

function excluir(i) {
    itens.splice(i, 1);
    window.localStorage.setItem("itens", JSON.stringify(itens));
    window.location.reload();
}

function limparDados(){
    window.localStorage.removeItem("itens");
    window.location.reload();
}

function switchMenu(){
    document.querySelector("#menu").classList.toggle("oculto");
}