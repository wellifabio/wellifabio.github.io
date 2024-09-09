
const apps = document.querySelector("#apps");
const ports = document.querySelector("#ports");
const projs = document.querySelector("#projs");
const idade = document.querySelector("#idade");
const ops = document.querySelector("nav");

//Função para calcular idade
function calcularIdade(nascimento) {
	var nascimento = new Date(nascimento);
	var diferenca = Date.now() - nascimento.getTime();
	var idade = new Date(diferenca);
	return Math.abs(idade.getUTCFullYear() - 1970);
}
idade.innerHTML = calcularIdade("1980/09/08");

//Função para mostrar os links nos postits
async function getLinks(lista, alvo) {
	await lista.forEach((app) => {
		const div = document.createElement("div");
		div.style.rotate = (Math.floor(Math.random() * 10) -5) + "deg";
		const a = document.createElement("a");
		a.href = app.href;
		a.target = "_blank";
		a.innerText = app.text;
		div.appendChild(a);
		alvo.appendChild(div);
	});
}

//Os seguintes eventos são disparados quando a pagina for carregada
document.addEventListener("DOMContentLoaded", async function () {
	await getLinks(aplicacoes, apps);
	await getLinks(portfolios, ports);
	await getLinks(projetos, projs);
});

ops.querySelectorAll("button").forEach((op) => {
	op.style.rotate = (Math.floor(Math.random() * 8) -3) + "deg";
});
