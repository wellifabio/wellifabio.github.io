//Array ou Vetor com todas as imagens das frentes
var frentes = [
    "background-image: url('./assets/cravo.png');",
    "background-image: url('./assets/cravo.png');",
    "background-image: url('./assets/orquidea.png');",
    "background-image: url('./assets/orquidea.png');",
    "background-image: url('./assets/rosas.png');",
    "background-image: url('./assets/rosas.png');",
    "background-image: url('./assets/tulipas.png');",
    "background-image: url('./assets/tulipas.png');"
]
frentes = shuffleArray(frentes)//Embaralha o array

//Objeto JavaScript para armazenar todos os botões(cards),
//suas imagens e seus status(frente ou verso)
var cardObj = {
    "bt1": [document.getElementById("bt1"), frentes[0], false],
    "bt2": [document.getElementById("bt2"), frentes[1], false],
    "bt3": [document.getElementById("bt3"), frentes[2], false],
    "bt4": [document.getElementById("bt4"), frentes[3], false],
    "bt5": [document.getElementById("bt5"), frentes[4], false],
    "bt6": [document.getElementById("bt6"), frentes[5], false],
    "bt7": [document.getElementById("bt7"), frentes[6], false],
    "bt8": [document.getElementById("bt8"), frentes[7], false]
}
const verso = "background-image: url('./assets/verso.png');"

//Variavel para armazenar a útima carta clicada
var ultima = ""

//Emelementos para contar erros
var erros = 0
const placar = document.createElement("h3")
placar.setAttribute("class","titulo")
placar.innerHTML = "Erros = "+erros
const head = document.querySelector(".head")
head.appendChild(placar)

function virarCarta(e) {
    if (cardObj[e.id][2]) {
        e.setAttribute("style", verso)
        cardObj[e.id][2] = false
    } else {
        e.setAttribute("style", cardObj[e.id][1])
        cardObj[e.id][2] = true
    }
}

function virarTodas() {
    for (i = 1; i <= 8; i++)
        virarCarta(cardObj["bt" + i][0])
}

function jogar(e) {
    if (ultima === "") {
        virarCarta(e)
        e.removeAttribute("onclick")
        ultima = e.id
    } else {
        virarCarta(e)
        if (cardObj[e.id][1] == cardObj[ultima][1]) {
            e.removeAttribute("onclick")
            ultima = ""
        } else {
            espere()
            erros++
            placar.innerHTML = "Erros = "+erros
            setTimeout(() => {
                virarCarta(e)
                virarCarta(cardObj[ultima][0])
                ultima = ""
                deVoltaAoJogo()
            }
                , 1000)
            cardObj[ultima][0].setAttribute("onclick", "jogar(this)")
        }
    }
}

function iniciar(e){
    virarTodas()
    e.innerHTML = "Reiniciar"
    e.setAttribute("onclick","reiniciar()")
}

function reiniciar(){
    window.location.reload()
}

function espere(){
    for (i = 1; i <= 8; i++)
        cardObj["bt" + i][0].removeAttribute("onclick")
}

function deVoltaAoJogo(){
    for (i = 1; i <= 8; i++)
        if(!cardObj["bt" + i][2])
            cardObj["bt" + i][0].setAttribute("onclick", "jogar(this)")
}

// Função para embaralhar array
function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
}

/*
//Exemplo de função para criar um botão
function criarBotao(){
    let bt = document.createElement("button")
    bt.setAttribute("click","virarCarta(this)")
    bt.innerHTML = "Sou um botão criado"
    let local = document.getElementById("teste")
    local.appendChild(bt)
}
*/