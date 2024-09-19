// Autor: Wellington Fábio de Oliveira Martins
const uri = "https://cookwellifabio.vercel.app/"
const user = JSON.parse(localStorage.getItem("user"))
const cards = document.querySelector("#cards")
const formLogin = document.querySelector("#formLogin")

if (user) {
    window.location.href = "./admin.html"
}

const iniciar = () => {
    fetch(uri + "receita")
        .then(response => response.json())
        .then(data => {
            data.forEach(receita => {
                const card = document.createElement("div")
                card.innerHTML += `
                <div class="card ${receita.tipo}">
                    <div>
                        <div class="card_header">
                            <b>Id:</b>
                            <label>${receita._id}</label>
                        </div>
                    </div>
                    <div>
                        <b>Nome:</b>
                        <label>${receita.nome}</label>
                    </div>
                    <div>
                        <b>Tipo:</b>
                        <label>${receita.tipo}</label>
                    </div>
                    <div>
                        <b>Ingredientes:</b>
                        <label>${receita.ingredientes}</label>
                    </div>
                    <div>
                        <b>Modo de Fazer:</b>
                        <label>${receita.modoPreparo}</label>
                    </div>
                    <img class="img" src="data:image/png;base64,${receita.foto}">
                </div>`
                cards.appendChild(card)
            })
        })
}

formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = formLogin.email.value
    const senha = formLogin.senha.value

    fetch(uri + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    })
        .then(response => response.status === 200 ? response.json() : null)
        .then(data => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data))
                window.location.href = "./admin.html"
            }else{
                alert("Usuário ou senha inválidos")
            }
        })
})
