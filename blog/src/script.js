const user = JSON.parse(window.localStorage.getItem('user'));

if (!user) {
    document.querySelector('#del').style.display = 'none';
    document.querySelector('#btNovo').style.display = 'none';
    document.querySelector('#btSair').style.display = 'none';
}else{
    document.querySelector('#btLogin').style.display = 'none';
    console.log(user.usuario);
}

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

const back = () => {
    if (i == 0)
        i = conts.length - 1;
    else
        i--;
    render();
}

const sair = () => {
    window.localStorage.removeItem('user');
    window.location.reload();
}
