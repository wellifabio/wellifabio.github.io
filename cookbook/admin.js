// Autor: Wellington Fábio de Oliveira Martins
const uri = "https://cookwellifabio.vercel.app/"
const user = JSON.parse(localStorage.getItem("user"))
const cards = document.querySelector("#cards")

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
                <div class="card ${receita.tipo}" id="${receita._id}">
                    <div>
                        <div>
                            <b>Id:</b><label>${receita._id}</label><button class="btUpDel" onclick="excluir(${receita._id})">-</button>
                        </div>
                    </div>
                    <div>
                        <form>
                            <button class="btUpDel btUpdate" type="submit" onclick="return confirma()">*</button>&nbsp;<label>Atualizar</label>
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
                                <input type="hidden"  name="foto" value=${receita.foto} id="fileimg${receita._id}">

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

//Função para confirmar ação
function confirma() {
    return confirm('Tem certeza desta ação?')
}


