//Obtendo as DIVs (áreas da tela de destino dos Cards de Pedido)
const producao = document.querySelector(".producao")
const entrega = document.querySelector(".entrega")
//Criando um objeto "Modelo" que conterá os dados do pedido
//Provisóriamente iniciando com id = 0
//Porém este Id seria obtido de uma API (BackEnd)
var pedido = {
    id: 0
}
//Variavel para acumular todos os pedidos concluídos e servir de download com as estatísticas
var csv = ""

function lancarPedido() {
    let dh = new Date();//Obtendo a data e hora do sistema
    //Configura o objeto com os dados do formulário e do sistema
    pedido.id++
    pedido.cliente = document.querySelector("#cliente").value
    pedido.endereco = document.querySelector("#endereco").value
    pedido.produto = document.querySelector("#produto").value
    pedido.data = dh.getDate() + "/" + (dh.getMonth() + 1) + "/" + dh.getFullYear()
    pedido.horaPedido = dh.getHours() + ":" + dh.getMinutes()
    pedido.horaEntrega = ""
    pedido.horaFim = ""
    console.log(JSON.stringify(pedido))
    criaCard(pedido)
}

function criaCard(obj) {
    //Cria o CARD na div Pedidos
    let card = document.createElement("div")
    let dados = document.createElement("div")
    let botao = document.createElement("button")
    card.className = "card"
    dados.className = "dados"
    dados.innerHTML = `<p>Id: ${obj.id} Cliente: ${obj.cliente}</p><p>Produto: ${obj.produto}</p><p>Endereço: ${obj.endereco}</p><p>Data:${obj.data}</p><p>Horario:${obj.horaPedido}</p>`
    botao.innerHTML = "<img width='50px' src='./assets/icon-check.png'>Enviar Entrega"
    botao.setAttribute("onClick", "iniciaEntrega(this,'"+JSON.stringify(obj)+"')");
    card.appendChild(dados)
    card.appendChild(botao)
    producao.appendChild(card)
}

function iniciaEntrega(e,p) {
    let dh = new Date();//Obtendo a data e hora do sistema
    entrega.appendChild(e.parentNode)
    e.parentNode.children[0].innerHTML += "<br/>Entrega:" + dh.getHours() + ":" + dh.getMinutes() //Adiciona ao Card
    p = JSON.parse(p)
    p.horaEntrega = dh.getHours() + ":" + dh.getMinutes() //Adiciona ao JSON
    console.log(JSON.stringify(p))
    e.innerHTML = "<img width='50px' src='./assets/icon-motoboy.png'>Pedido entregue";
    e.setAttribute("onClick", "finalizaEntrega(this,'"+JSON.stringify(p)+"')");
}

function finalizaEntrega(e,p) {
    let dh = new Date(); //Obtendo a data e hora do sistema
    p = JSON.parse(p)
    p.horaFim = dh.getHours() + ":" + dh.getMinutes() //Adiciona ao JSON
    console.log(JSON.stringify(p))
    e.parentNode.remove();
    csv += p.id +";"+p.cliente+";"+p.endereco+";"+p.produto+";"+p.data+";"+p.horaPedido+";"+p.horaEntrega+";"+p.horaFim+"\r\n"
    let aCaminho = document.querySelector(".entrega")
    if(aCaminho.innerHTML.length < 50){
        let botao = document.createElement("button")
        botao.innerHTML = "Download de todos os pedidos concluídos"
        botao.setAttribute("onClick", "downloadCSV(this)");
        aCaminho.children[0].appendChild(botao)
    }
}

function downloadCSV(e){
    let a = document.createElement("a");
    a.href = "data:," + csv;
    a.download = "pedidos.csv";
    a.click();
    e.remove();
}