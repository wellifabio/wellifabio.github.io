const apps = document.querySelector("#apps");
const ports = document.querySelector("#ports");
const projs = document.querySelector("#projs");
const idade = document.querySelector("#idade");

//Função para calcular idade
function calcularIdade(nascimento) {
	var nascimento = new Date(nascimento);
	var diferenca = Date.now() - nascimento.getTime();
	var idade = new Date(diferenca);
	return Math.abs(idade.getUTCFullYear() - 1970);
}

async function getLinks(lista, alvo) {
	await lista.forEach((app) => {
		const div = document.createElement("div");
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


idade.innerHTML = calcularIdade("1980/09/08");