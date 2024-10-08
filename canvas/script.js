const project = window.localStorage.getItem("project") == null ? { titulo: null, postits: [] } : JSON.parse(window.localStorage.getItem("project"));
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
    project.titulo = document.getElementById("titulo").value;
    window.localStorage.setItem("project", JSON.stringify(project));
});

const load = () => {
    if (project.postits != undefined) {
        project.postits.forEach((e, i) => {
            let g = Math.floor(Math.random() * 6) - 2;
            let onde = document.querySelector(`#p${e.where}`);
            let ftSize = e.texto.length > 80 ? 14 : 20;
            onde.innerHTML +=
                `<figure draggable="true" ondragstart="drag(event,${i})" class="ptitfull">
                    <img src="${params.postit[e.cor]}" style="transform: rotate(${g}deg);" onclick="updte('${i}')">
                    <figcaption style="font-size:${ftSize}px;cursor:pointer;" onclick="updte('${i}')">${e.texto}</figcaption>
                </figure>`;
        });
        document.getElementById("titulo").value = project.titulo;
        document.querySelector("#tit").innerHTML = "Projeto: " + project.titulo;
    }
}

const addPostit = (where) => {
    document.querySelector("#rodape").classList.toggle("modal");
    document.querySelector("#orientacao").innerHTML = params.orientacoes[parseInt(where)];
    params.onde = where;
}

const updte = (i) => {
    document.querySelector("#rodape").classList.toggle("modal");
    document.querySelector("#orientacao").innerHTML = params.orientacoes[project.postits[i].where];
    document.querySelector("#texto").value = project.postits[i].texto;
    document.querySelector("#acao").innerHTML = "Atualizar";
    document.querySelector("#acao").setAttribute("onclick", `update('${i}')`);
    document.querySelector(".rodape").innerHTML += `<button onclick="del('${i}')">&nbsp;<img src="./assets/lixo.png" width="14px" alt="Del">&nbsp;</button>`;
    cor(project.postits[i].cor);
    params.onde = project.postits[i].where;
}

const add = () => {
    let postit = {
        cor: params.cor,
        texto: document.querySelector("#texto").value,
        where: params.onde
    }
    project.postits.push(postit);
    window.localStorage.setItem("project", JSON.stringify(project));
    window.location.reload();
}

const update = (i) => {
    let postit = {
        cor: params.cor,
        texto: document.querySelector("#texto").value,
        where: params.onde
    }
    project.postits[i] = postit;
    window.localStorage.setItem("project", JSON.stringify(project));
    window.location.reload();
}

const del = (i) => {
    project.postits.splice(i, 1);
    window.localStorage.setItem("project", JSON.stringify(project));
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
        document.querySelector("#tit").innerHTML = "Projeto: " + document.getElementById("titulo").value
        document.querySelector("#btEx").remove();
        document.querySelector("#btView").innerHTML = "Cancelar";
        document.querySelector("#header").innerHTML += `<button onclick="window.print();">Imprimir PDF</button>`;
    }
}

const exemplo = async () => {
    let resp = await fetch("exemplo.json")
    let json = await resp.json()
    console.log(json);
    window.localStorage.setItem("project", JSON.stringify(json));
    window.location.reload();
}

const salvar = () => {
    if (project.postits.length > 0) {
        let a = document.createElement("a");
        a.href = "data:," + JSON.stringify(project);
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
        window.localStorage.setItem("project", reader.result);
        window.location.reload();
    };
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, indice) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("indice", indice);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let indice = ev.dataTransfer.getData("indice");
    if(ev.target.id.split("p")[1] !== undefined) project.postits[indice].where = ev.target.id.split("p")[1];
    // alert("indice origem = "+ indice + " Destino: " + project.postits[indice].where);
    window.localStorage.setItem("project", JSON.stringify(project));
    window.location.reload();
}