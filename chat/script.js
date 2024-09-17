const socket = io("https://wellichatback.vercel.app/");//io("http://localhost:3000");
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
    0: "https://editablegifs.com/gifs/gifs/sunglasses-emoji/thumbnail.gif",
    1: "https://cliply.co/wp-content/uploads/2021/07/392107260_SUNGLASSES_EMOJI_400px.gif",
    2: "https://custom-doodle.com/wp-content/uploads/doodle/exploding-head-emoji/exploding-head-emoji-doodle.gif",
    3: "https://www.eventstodayz.com/wp-content/uploads/2020/03/lauging-gif-emoji.gif",
    4: "https://i.pinimg.com/originals/bf/c9/55/bfc95517952d2719d6887175fa7aeb34.gif"
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
    document.querySelector("#emogi").src = emogis[cor];
}