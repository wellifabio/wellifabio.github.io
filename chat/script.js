const socket = io("https://chatwfom.herokuapp.com/");
const envia = document.querySelector("#envia");
const recebe = document.querySelector("#recebe");
var nick = null;
var cor = -1;
const cores = {
    0: "vermelho",
    1: "verde",
    2: "azul",
    3: "amarelo",
    4: "preto"
}

const emogis = {
    0: "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/dog-face_1f436.png",
    1: "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/cat-face_1f431.png",
    2: "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/mouse-face_1f42d.png",
    3: "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/panda_1f43c.png",
    4: "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/orangutan_1f9a7.png"
}

function enviar() {
    let msg = {
        nick: nick,
        msg: envia.value,
        cor: cor
    }
    socket.emit("sala01", msg);
    baloes(msg);
}

socket.on("resp", (data) => {
    baloes(data.msg);
});

const baloes = (msg) => {
    let balao = document.createElement("div");
    let quem = document.createElement("label");
    let emogi = document.createElement("img");
    let oque = document.createElement("div");
    emogi.setAttribute("src", emogis[msg.cor]);
    quem.innerHTML += msg.nick;
    oque.innerHTML = msg.msg;
    oque.classList.add(cores[msg.cor]);
    balao.classList.add('balao');
    balao.appendChild(quem);
    balao.appendChild(emogi);
    balao.appendChild(oque);
    recebe.appendChild(balao);
}

const nickname = () => {
    nick = prompt("Digite um nickname/apelido");
    cor = parseInt(Math.random() * 5);
    document.querySelector("#nick").innerHTML = nick;
    document.querySelector("#emogi").src=emogis[cor];
}