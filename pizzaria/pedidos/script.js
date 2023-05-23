const btFechar = document.querySelector("#btFechar");
const detalhes = document.querySelector("#detalhes");
const corpo = document.querySelector("#corpo");

const pedidos = JSON.parse(window.localStorage.getItem("pedidos")) || []

function switchMenu() {
    document.querySelector("#menuh").classList.toggle("oculto");
}

function preecherTabela() {
    pedidos.forEach((e, i) => {
        const div = document.createElement("div");
        const data = document.createElement("h3");
        const valor = document.createElement("h3");
        const itens = document.createElement("table");
        data.innerHTML = `Data: ${e.data.split('T')[0]}, Hora: ${e.data.split('T')[1].split('.')[0]}`;
        let tot = 0;
        itens.innerHTML = `<tr><th>Id</th><th>Produto</th><th>Qtd</th><th>Preço</th><th>SubTotal</th></tr>`;
        e.itens.forEach((item) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            td1.innerHTML = item.id;
            td2.innerHTML = item.nome;
            td3.innerHTML = item.quantidade;
            td4.innerHTML = item.preco;
            td5.innerHTML = item.preco * item.quantidade;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            itens.appendChild(tr);
            tot += item.quantidade * item.preco;
        });
        valor.innerHTML = `Valor total: R$ ${tot.toFixed(2)}`;
        valor.setAttribute("style", "background-color: #ccc; text-align: right; padding: 5px; border-bottom: 1px solid #000;");
        div.appendChild(data);
        div.appendChild(itens);
        div.appendChild(valor);
        div.classList.add("pedido");
        corpo.appendChild(div)
    })
}

function abrirModal(i) {
    detalhes.classList.toggle("oculto");
    document.querySelector("#id").value = dados[i].id;
    document.querySelector("#nome").value = dados[i].nome;
}

function limparDados() {
    window.localStorage.removeItem("pedidos");
    window.location.reload();
}