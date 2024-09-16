//Configuração da tela
const img = document.querySelector('#img');
const texto = document.querySelector('#texto');
const del = document.querySelector('#del');

var i = 0;
const conts = []

const render = () => {
    img.src = conts[i].img;
    texto.innerHTML = conts[i].texto;
    del.id= conts[i].id;
}

const next = () => {
    if (i == conts.length - 1)
        i = 0;
    else
        i++;
    render();
}