const postits = window.localStorage.getItem("postits") == null ? [] : JSON.parse(window.localStorage.getItem("postits"));
const params = {
    onde: undefined,
    cor: 0,
    corHexa: ["#f7e388", "#f8b3b3", "#88eaf7"],
    postit: ["../assets/postit.png", "../assets/postitred.png", "../assets/postitblue.png"],
    orientacoes: [
        "Aqui, devem ser relacionadas quais as outras empresas serão parceiras do negócio. Geralmente, são serviços necessários para o funcionamento do empreendimento e os fornecedores.",
        "Relacione aqui as ações necessárias para a realização da proposta de valor.",
        "Relacione aqui os recursos necessários para realizar a proposta de valor, para fazer o negócio funcionar.",
        "Defina o produto ou serviço e o valor para os clientes. O valor, a razão ou o motivo pelo qual os clientes se interessam e adquirem os produtos e serviços.",
        "Defina aqui como fazer para conquistar e manter uma boa relação com os clientes.",
        "Defina de que forma os produtos serão conhecidos, como chegarão aos clientes e como os clientes irão interagir com o negócio.",
        "Defina quem são os clientes que se pretende atender. Eles têm um perfil específico? Como estão agrupados? Onde estão localizados? Há uma necessidade comum?",
        "Levante o que vai ser gasto para realizar a proposta de valor.",
        "Defina aqui como e quanto se pagará pelos produtos."
    ]
}

document.getElementById("titulo").addEventListener("keyup", () => {
    window.localStorage.setItem("titulo", document.getElementById("titulo").value);
});

const load = () => {
    postits.forEach((e, i) => {
        let g = Math.floor(Math.random() * 6) - 2;
        let onde = document.querySelector(`#p${e.where}`);
        let ftSize = e.texto.length > 80 ? 14 : 20;
        onde.innerHTML +=
            `<figure class="ptitfull"><img src="${params.postit[e.cor]}" style="transform: rotate(${g}deg);" onclick="updte('${i}')"><figcaption style = "font-size:${ftSize}px;cursor:pointer;" onclick="updte('${i}')">${e.texto}</figcaption></figure>`;
    });
    document.getElementById("titulo").value = window.localStorage.getItem("titulo");
    document.querySelector("#tit").innerHTML = "Projeto: " + document.getElementById("titulo").value
}

const addPostit = (where) => {
    document.querySelector("#rodape").classList.toggle("modal");
    document.querySelector("#orientacao").innerHTML = params.orientacoes[parseInt(where)];
    params.onde = where;
}

const updte = (i) => {
    document.querySelector("#rodape").classList.toggle("modal");
    document.querySelector("#orientacao").innerHTML = params.orientacoes[postits[i].where];
    document.querySelector("#texto").value = postits[i].texto;
    document.querySelector("#acao").innerHTML = "Atualizar";
    document.querySelector("#acao").setAttribute("onclick", `update('${i}')`);
    document.querySelector(".rodape").innerHTML += `<button onclick="del('${i}')"><img src="./assets/lixo.png" width="20px" alt="Del"></button>`;
    cor(postits[i].cor);
    params.onde = postits[i].where;
}

const add = () => {
    let postit = {
        cor: params.cor,
        texto: document.querySelector("#texto").value,
        where: params.onde
    }
    postits.push(postit);
    window.localStorage.setItem("postits", JSON.stringify(postits));
    window.location.reload();
}

const update = (i) => {
    let postit = {
        cor: params.cor,
        texto: document.querySelector("#texto").value,
        where: params.onde
    }
    postits[i] = postit;
    window.localStorage.setItem("postits", JSON.stringify(postits));
    window.location.reload();
}

const del = (i) => {
    postits.splice(i, 1);
    window.localStorage.setItem("postits", JSON.stringify(postits));
    window.location.reload();
}

const cor = (i) => {
    params.cor = i;
    document.querySelector("#novo").setAttribute("style", `background-color: ${params.corHexa[i]};`)
}

const view = () => {
    if (document.querySelector("#style").href.split("/")[4] == "print.css") {
        window.location.reload();
    } else {
        document.querySelector("#style").setAttribute("href", "print.css");
        document.querySelector("#btLimpar").setAttribute("style", "display:none;");
        document.querySelector("#header").innerHTML += `<button onclick="window.print();">Imprimir PDF</button>`;
    }
}

const salvar = () => {
    if (postits.length > 0) {
        let a = document.createElement("a");
        a.href = "data:," + JSON.stringify(postits);
        a.download = "canvas.json";
        a.click();
        alert("Canvas salvo na pasta padrão de downloads do seu computador");
    } else {
        alert("Não há dados serem salvos.");
    }
}

document.getElementById("abrir").addEventListener("change", (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        window.localStorage.setItem("postits", reader.result);
        window.location.reload();
    };
});
