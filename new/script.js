
const uri = "../data.json";
const apps = document.querySelector("#apps");
const ports = document.querySelector("#ports");
const projs = document.querySelector("#projs");
const ops = document.querySelector("nav");

async function data() {
	let dados
	await fetch(uri)
		.then(resp => resp.json())
		.then(resp =>
			dados = resp
		)
	return dados;
}

//Exibir os links nos postits
async function getLinks(lista, alvo, classe, aqui) {
	for (const app of lista) {
		const div = document.createElement("div");
		const a = document.createElement("a");
		a.href = app.href;
		if (aqui == undefined) a.target = "_blank";
		if (app.icone != undefined){
			div.classList.add("div_com_img")
			div.innerHTML = `<img src='${app.icone}' alt='${app.text}' onclick='window.location.href="${app.href}"'>`;
		}else{
			div.classList.add("postit")
			div.classList.add(classe)
			div.style.rotate = (Math.floor(Math.random() * 8) - 3) + "deg";
		}
		a.innerText = app.text;
		div.appendChild(a);
		alvo.appendChild(div);
		await new Promise((resolve) => setTimeout(resolve, 25));
	}
}

// Montando as listas ao carregar a página
async function montarLinks() {
	let dados = await data();
	await getLinks(dados.portfolios, ports,"ports", true);
	await getLinks(dados.apps, apps, "apps");
	await getLinks(dados.projetos, projs, "projetos");
}

// Montando os portfolios ao carregar a pagina de portfolios
async function montarPortfolios() {
	const urlParams = new URLSearchParams(window.location.search);
	let dados = await data();
	const turma = dados.portfolios.find(ports => ports.id == urlParams.get('turma'));
	document.querySelector("#titulo").innerHTML = turma.text;
	await getLinks(turma.ports, ports, "ports");
}

//Inclina levemente todos os botões
document.querySelectorAll("button").forEach((op) => {
	op.style.rotate = (Math.floor(Math.random() * 8) - 3) + "deg";
});

function calcularIdade(nascimento) {
	var nascimento = new Date(nascimento);
	var diferenca = Date.now() - nascimento.getTime();
	var idade = new Date(diferenca);
	return Math.abs(idade.getUTCFullYear() - 1970);
}
const idade = document.querySelector("#idade");
if (idade) idade.innerHTML = calcularIdade("1980/09/08");