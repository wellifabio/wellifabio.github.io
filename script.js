const aulas = [
	{
		href: "./chat",
		target: "_blank",
		text: "Chatroom / Sala de Bate papo (pt - br)"
	},
	{
		href: "https://expressjs-mongoose-production-0d7e.up.railway.app/",
		target: "_blank",
		text: "Cookbook blog (Blog de Receitas) (pt - br)"
	},
	{
		href: "./timeline",
		target: "_blank",
		text: "JavaScript - Gantt chart generator"
	},
	{
		href: "./clima",
		target: "_blank",
		text: "JavaScript - Learning ChartJS"
	},
	{
		href: "./delivery/delivery.html",
		target: "_blank",
		text: "JavaScript - Delivery Manager (pt-br)"
	},
	{
		href: "./memoria",
		target: "_blank",
		text: "JavaScript - Memory Game (pt - br)"
	},
	{
		href: "./sena/bilhete.html",
		target: "_blank",
		text: "Brazil lottery game generator Sena (pt - br)"
	},
	{
		href: "./loto/bilhete.html",
		target: "_blank",
		text: "Brazil lottery game generator Loto<br (pt - br)"
	},
	{
		href: "./hash",
		target: "_blank",
		text: "JavaScript - Hash Game"
	},
	{
		href: "https://github.com/wellifabio/senai2022/blob/master/outros/old_1des/fpoo/aula25/PetsLogin/doc/prototipo.pdf",
		target: "_blank",
		text: "Java Desktop - PetShop Solution example<br (pt - br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/ProjetoHortelino/doc/prototipo.pdf",
		target: "_blank",
		text: "Java Desktop - Inventory and sales management<br (pt - br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/Estacionamento/docs/prototipo.pdf",
		target: "_blank",
		text: "Java Desktop - Park Solution example<br (pt - br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/Mapeador/docs/prototipo.pdf",
		target: "_blank",
		text: "Java Desktop - Small Nets Solution example<br (pt - br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/Money/docs/prototipo.pdf",
		target: "_blank",
		text: "Counting money - Solution example<br (pt - br)"
	}
];

const projetos = [
	{
		href: "https://wellifabio.000webhostapp.com/",
		target: "_blank",
		text: "Web Site - Old<br (pt - br)"
	},
	{
		href: "https://openacova.000webhostapp.com/sinventario/view/",
		target: "_blank",
		text: "PHP MySQL Inventory Manager < br(pt - br)"
	},
	{
		href: "https://openacova.000webhostapp.com/maoamiga/",
		target: "_blank",
		text: "PHP MySQL Funeral (Helping	Hand) (pt - br)"
	},
	{
		href: "https://wellifabio.000webhostapp.com/view/files/projetos/diversos",
		target: "_blank",
		text: "Projects AutoCad 3D modelling"
	},
	{
		href: "https://wellifabio.000webhostapp.com/view/files/projetos/academia/",
		target: "_blank",
		text: "My architect CAD hobby"
	},
	{
		href: "https://wellifabio.000webhostapp.com/view/files/projetos/minhacasa/",
		target: "_blank",
		text: "My building hobby"
	},
]

const als = document.querySelector("#aulas");
const prjts = document.querySelector("#projetos");

const load = () => {
	aulas.forEach(aula => {
		als.innerHTML += `<a href="${aula.href}" target="${aula.target}" class="postit">${aula.text}</a>`;
	});
	projetos.forEach(projeto => {
		prjts.innerHTML += `<a href="${projeto.href}" target="${projeto.target}" class="postitred">${projeto.text}</a>`;
	});
}