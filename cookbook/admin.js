// Autor: Wellington Fábio de Oliveira Martins
const uri = "https://cookwellifabio.vercel.app/"
const user = JSON.parse(localStorage.getItem("user"))
const cards = document.querySelector("#cards")
const cadastro = document.querySelector("#cadastro")

if (!user) {
    window.location.href = "./index.html"
}

const iniciar = () => {
    fetch(uri + "receita")
        .then(response => response.json())
        .then(data => {
            data.forEach(receita => {
                const card = document.createElement("div")
                let foto = './assets/default.png'
                if (receita.foto) foto = 'data:image/png;base64,' + receita.foto
                card.innerHTML += `
                <div class="card ${receita.tipo}">
                    <div class="card_header">
                        <div>
                            <b>Id:</b>
                            <label>${receita._id}</label>
                            <div style="max-width:120px">
                                <button class="btUpDel" onclick="update('${receita._id}')">*</button>
                                <button class="btUpDel" onclick="excluir('${receita._id}')">-</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form id="${receita._id}">
                            <div>
                                <b>Nome:</b>
                                <input type="text" name="nome" value="${receita.nome}"/>
                            </div>
                            <div>
                                <b>Tipo:</b>
                                <select name="tipo">
                                    <option value="salgado">Salgada</option>
                                    <option value="doce">Doce</option>
                                </select>
                            </div>
                            <div>
                                <b>Ingredientes:</b>
                                <textarea name="ingredientes">${receita.ingredientes}</textarea>
                            </div>
                            <div>
                                <b>Modo de Preparo:</b>
                                <textarea name="modoPreparo">${receita.modoPreparo}</textarea>
                            </div>
                            <div>
                                <label>Imagem:</label>
                                <input type="file" onchange="prevImg('img${receita._id}',this)" accept="image/jpeg, image/png")>
                                <input type="hidden"  name="foto" value="${receita.foto}" id="fileimg${receita._id}">
                            </div>
                            <img class="img" src="${foto}" id="img${receita._id}")>
                        </form>
                    </div>
                </div>`
                cards.appendChild(card)
            })
        })
}

function logout() {
    localStorage.removeItem("user")
    window.location.href = "./index.html"
}

cadastro.addEventListener("submit", e => {
    e.preventDefault()
    const nome = cadastro.nome.value
    const tipo = cadastro.tipo.value
    const ingredientes = cadastro.ingredientes.value
    const modoPreparo = cadastro.modoPreparo.value
    const foto = cadastro.foto.value

    fetch(uri + "receita", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, tipo, ingredientes, modoPreparo, foto })
    })
        .then(data => data.status)
        .then(data => {
            if (data == 201) {
                window.location.reload()
            } else {
                alert("Erro ao registrar receita")
            }
        })
})

function update(id) {
    const alterar = document.getElementById(id)
    const dados = {
        nome: alterar.nome.value,
        tipo: alterar.tipo.value,
        ingredientes: alterar.ingredientes.value,
        modoPreparo: alterar.modoPreparo.value,
        foto: alterar.foto.value
    }
    fetch(uri + "receita/" + alterar.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(data => data.status)
        .then(data => {
            if (data == 202) {
                window.location.reload()
            } else {
                alert("Erro ao alterar receita")
            }
        })
}

function excluir(id) {
    if (confirm("Confirma a exclusão desta receita?"))
        fetch(uri + "receita/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => data.status)
            .then(data => {
                if (data == 204) {
                    window.location.reload()
                } else {
                    alert("Erro ao excluir receita")
                }
            })
}
