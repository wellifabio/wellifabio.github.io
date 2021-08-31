/******Funcções específicas para este tema*******/
const produtos = ['X-Burguer', 'X-Egg', 'X-Bacon', 'X-Tudo', 'X-Frango', 'Refrigerante - Lata', 'Refrigerante - 2L']
const xml = carregaXML('./uteis/randomicos.xml');
const rand = {
    nomes: xml.getElementsByTagName("nomes")[0].textContent.substr(1).split("\n"),
    sobrenomes: xml.getElementsByTagName("sobrenomes")[0].textContent.substr(1).split("\n"),
    logradouros: xml.getElementsByTagName("logradouros")[0].textContent.substr(1).split("\n"),
    bairros: xml.getElementsByTagName("bairros")[0].textContent.substr(1).split("\n"),
    cidades: xml.getElementsByTagName("cidades")[0].textContent.substr(1).split("\n")
}
//Remove os últimos itens dos arrays, pois estão em branco
rand.nomes.pop()
rand.sobrenomes.pop()
rand.logradouros.pop()
rand.bairros.pop()
rand.cidades.pop()

function obterAgora() {
    let agora = document.getElementById('agora');
    let data = new Date
    agora.value = "Hoje é = " + data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + " Agora são = " + data.getHours() + ":" + data.getMinutes()
}

function preencherForm() {
    let cliente = document.getElementById('cliente');
    cliente.value = geraNomeCompleto()
    let endereco = document.getElementById('endereco');
    endereco.value = geraEnderecos()
    let produto = document.getElementById('produto');
    produtos.forEach(opcao => {
        produto.innerHTML += "<option>" + opcao + "</option>"
    });
    produto.value = geraProdutos()
}

function geraNomeCompleto() {
    let nome = rand.nomes[Math.floor(Math.random() * rand.nomes.length)]
    let sobrenome = rand.sobrenomes[Math.floor(Math.random() * rand.sobrenomes.length)]
    let sobrenome2 = rand.sobrenomes[Math.floor(Math.random() * rand.sobrenomes.length)]
    if (Math.floor(Math.random() * 2) == 1) {
        return nome + " " + sobrenome + " " + sobrenome2
    } else {
        return nome + " " + sobrenome
    }
}
function geraEnderecos() {
    let logradouro = rand.logradouros[Math.floor(Math.random() * rand.logradouros.length)]
    let bairro = rand.bairros[Math.floor(Math.random() * rand.bairros.length)]
    let cidade = rand.cidades[Math.floor(Math.random() * rand.cidades.length)]
    return logradouro + ", " + bairro + ", " + cidade
}
function geraProdutos() {
    return produtos[Math.floor(Math.random() * produtos.length)]
}

/**************Funções úteis Gerais ***************/
//Lê um arquivo de texto com uma coluna de dados e retorna uma lista
function carregaXML(arquivo) {
    let dados = '<mensagem>File not found</mensagem>'
    let xml = new XMLHttpRequest()
    xml.open("GET", arquivo, false)
    xml.onreadystatechange = function () {
        if (xml.readyState === 4) {
            if (xml.status === 200 || xml.status == 0) {
                dados = xml.responseXML.getElementsByTagName("dados")[0]
            }
        }
    }
    xml.send()
    return dados
}
