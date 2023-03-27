const body = document.querySelector("#body");
const header = body.childNodes[1];
const main = body.childNodes[3];
const footer = body.childNodes[5];
var dados = [];

const carregaArquivo = (json) => {
    fetch(json)
        .then(resp => resp.json())
        .then(
            resp => {
                dados = resp;
            }
        )
};

header.innerHTML = "Cabeçalho"
main.innerHTML = "Conteúdo"
footer.innerHTML = "Rodapé"
