const url = 'https://receitaswfom.herokuapp.com';
const cards = document.querySelector("#cards");
const card = document.querySelector(".card");
const form = document.querySelector("#create");

var dados = [];
var fotoBase64 = null;

const carregar = () => {
    const options = { method: 'GET' };
    fetch(url + "/read", options)
        .then(resp => resp.json())
        .then(resp => {
            dados = resp;
            readAll();
        })
        .catch(err => alert("Erro ao carregar dados do BD:" + err));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let receita = {
        nome: form.nome.value,
        tipo: form.tipo.value,
        ingredientes: form.ingredientes.value,
        modoPreparo: form.modoPreparo.value,
        foto: fotoBase64
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receita)
    }
    fetch(url + '/create', options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201)
                window.location.reload();
            else
                alert("Erro ao enviar dados para o servidor, erro: " + resp)
        })
        .catch(err => console.error(err));
});

function readAll() {
    dados.forEach(e => {
        let receita = card.cloneNode(true);
        receita.classList.remove("oculto");
        receita.querySelector("#id").innerHTML += `<b>${e._id}</b>`;
        receita.querySelector("#btn").setAttribute("onclick", `del('${e._id}')`);
        receita.querySelector("#nome").innerHTML += e.nome;
        receita.querySelector("#tipo").innerHTML += e.tipo;
        receita.querySelector("#ingredientes").innerHTML += e.ingredientes;
        receita.querySelector("#modoPreparo").innerHTML += e.modoPreparo;
        receita.querySelector("#img").src = isImgBase64(e.foto);
        cards.appendChild(receita);
    });
}

function del(id) {
    if (confirm("Confirma a exclusão da receita id: " + id)) {
        const options = {
            method: 'DELETE'
        };
        fetch(url + '/del/' + id, options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 200) {
                    window.location.reload();
                }
            })
            .catch(err => alert("Erro ao enviar dados, Erro:" + err));
    }
}

function isImgBase64(img) {
    if (img != null) {
        return `data:image/png;base64,${img}`;
    } else
        return `./assets/default.png`;
}

const toImgBase64 = () => {
    let file = document.querySelector("#file")['files'][0];
    if (file.size < 20000) {
        let fr = new FileReader();
        fr.onload = function () {
            fotoBase64 = fr.result.replace("data:", "").replace(/^.+,/, "");
            form.imagem.src = isImgBase64(fotoBase64);
        }
        fr.readAsDataURL(file);
    }else{
        alert("O arquivo deve ser menor que que 18Kb");
        document.querySelector("#file").value = null;
    }
}