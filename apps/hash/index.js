const x = "./assets/cross.png"
const o = "./assets/circle.png"
var player = false
var turns = 1

//Carrega os botões
function loadButtons(e) {
    let game = document.getElementById(e)
    let bts = []
    for (i = 0; i < 9; i++) {
        bts[i] = document.createElement("button")
        bts[i].setAttribute("onclick", "play(this)")
        game.appendChild(bts[i])
    }
}

function play(e) {
    let img = (player = !player) ? x : o;
    e.innerHTML = "<img src='" + img + "'>"
    e.removeAttribute("onclick")
    turns++
    if (turns > 5) {
        if (isVictory() != "") {
            makeLine(isVictory())
        }
    }
}

//Testa as vitórias
function isVictory() {
    let grid = document.getElementById("game");
    let bts = []
    for (i = 0; i < 9; i++) {
        bts[i] = grid.childNodes[i].innerHTML;
    }
    //Testa as três horizontais
    for (i = 0; i < 9; i += 3) {
        if (bts[i] != "" && bts[i + 1] != "" && bts[i + 2] != "") {
            if (bts[i] == bts[i + 1] && bts[i + 1] == bts[i + 2]) {
                return "h" + i
            }
        }
    }
    //Testa as três verticais
    for (i = 0; i < 3; i++) {
        if (bts[i] != "" && bts[i + 3] != "" && bts[i + 6] != "") {
            if (bts[i] == bts[i + 3] && bts[i + 3] == bts[i + 6]) {
                return "v" + i
            }
        }
    }
    //Testa as duas diagonais
    if (bts[0] != "" && bts[4] != "" && bts[8] != "") {
        if (bts[0] == bts[4] && bts[4] == bts[8]) {
            return "d0"
        }
    }
    if (bts[2] != "" && bts[4] != "" && bts[6] != "") {
        if (bts[2] == bts[4] && bts[4] == bts[6]) {
            return "d1"
        }
    }
    return ""
}

//Desenha as linhas
function makeLine(p) {
    let canvas = document.getElementById("tela")
    canvas.style.display = "inline"
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        ctx.lineWidth = 5
        ctx.strokeStyle = "#900"
        ctx.beginPath()

        if (p.substr(0, 1) == "h") {
            let y = 100 + 75 * parseInt(p.substr(1, 1))
            ctx.moveTo(50, y)
            ctx.lineTo(700, y)
        }

        if (p.substr(0, 1) == "v") {
            let x = 140 + 250 * parseInt(p.substr(1, 1))
            ctx.moveTo(x, 50)
            ctx.lineTo(x, 670)
        }

        if (p.substr(0, 1) == "d") {
            if (p == "d0") {
                ctx.moveTo(0, 0)
                ctx.lineTo(770, 690)
            } else {
                ctx.moveTo(770, 0)
                ctx.lineTo(0, 690)
            }
        }
        ctx.stroke()
    }
}