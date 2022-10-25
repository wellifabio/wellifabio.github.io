const uri = 'https://receitaswfom.herokuapp.com/receita';
const receitas = document.querySelector("#receitas");
const card = document.querySelector(".card");
const cadastro = document.querySelector("#cadastro");
var dados = [];
var fotoBase64 = null;

function carregar() {
    const options = { method: 'GET' };
    fetch(uri + "/read", options)
        .then(resp => resp.json())
        .then(resp => {
            dados = resp;
            readCards();
        })
        .catch(err => alert("Erro ao carregar dados do BD:" + err));
}

function readCards() {
    dados.forEach(e => {
        let receita = card.cloneNode(true);
        receita.classList.remove("model");
        receita.querySelector("#id").innerHTML += `<b>${e._id}</b>`;
        receita.querySelector("#btn").setAttribute("onclick", `excluir('${e._id}')`);
        receita.querySelector("#nome").innerHTML += e.nome;
        receita.querySelector("#tipo").innerHTML += e.tipo;
        receita.querySelector("#ingredientes").innerHTML += e.ingredientes;
        receita.querySelector("#modoPreparo").innerHTML += e.modoPreparo;
        receita.querySelector("#img").src = montaImg(e.foto);
        receitas.appendChild(receita);
    });
}

function montaImg(img) {
    if (img != null) {
        return `data:image/png;base64,${img}`;
    } else
        return `./default.png`;
}

cadastro.addEventListener('submit', () => {
    let receita = {
        nome: cadastro.nome.value,
        tipo: cadastro.tipo.value,
        ingredientes: cadastro.ingredientes.innerHTML,
        modoPreparo: cadastro.modoPreparo.innerHTML,
        foto: null
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receita)
    };

    fetch('https://receitaswfom.herokuapp.com/receita/create', options)
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
});

function excluir(id) {
    if (confirm("Confirma a exclusão da receita id: " + id)) {
        const options = {
            method: 'DELETE'
        };
        fetch(uri + '/del/' + id, options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 200) {
                    window.location.reload();
                }
            })
            .catch(err => alert("Erro ao enviar dados, Erro:" + err));
    }
}

const toBase64 = () => {
    let file = document.querySelector("#file")['files'][0];
    let fr = new FileReader();
    fr.onload = function () {
        fotoBase64 = fr.result.replace("data:", "").replace(/^.+,/, "");
        form.imagem.src = `data:image/png;base64,${fotoBase64}`;
    }
    fr.readAsDataURL(file);
}