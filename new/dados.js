const aplicacoes = [
	{
		href:"https://wellifabio.github.io/chatbot_gemini_eu_prof_2026/",
		text: "JS: My Bot with Gemini (pt-br)"
	},
	{
		href: "../canvas",
		text: "JS: Canvas Frame Maker (pt-br)"
	},
	{
		href: "../gantt",
		text: "JS: Gantt chart generator (pt-br)"
	},
	{
		href: "https://wellifabio.github.io/techman-web-2025/",
		text: "Techman - Maintenance management - SAEP 2021 - (pt-br)"
	},
	{
		href: "https://escolaprismapug-2023.vercel.app/",
		text: "School Management System, Full-stack, Pug, Vercel, 2024- (pt-br)"
	},
	{
		href: "https://wellifabio.github.io/estacionamento-web-2025/",
		text: "Zé Leitão Park (pt-br)"
	},
	{
		href: "https://wellifabio.github.io/receitas-web-2025/",
		text: "Coockbook CRUD (pt-br)"
	},
	{
		href: "https://wellifabio.github.io/termo/",
		text: "Termo Play TI (By Robson)"
	},
	{
		href: "https://wellifabio.github.io/newswfom/",
		text: "NewsWFOM - Links e Notícias (pt-br)"
	},
	{
		href: "../blog/",
		text: "Firebase Blog (pt-br)"
	},
	{
		href: "../avaliacao",
		text: "JS: SENAI standard assessment generator - MESEP(pt-br)"
	},
	{
		href: "../bitola",
		text: "JS: Cálc. Bitola p/ Cabo de Cobre (pt-br)"
	},
	{
		href: "../siminvest",
		text: "JS: Simulador de Investimentos (pt-br)"
	},
	{
		href: "../gadgets",
		text: "JS - Gadgets"
	},
	{
		href: "../delivery/delivery.html",
		text: "JS - Delivery Manager (pt-br)"
	},
	{
		href: "../memoria",
		text: "JS - Memory Game (pt - br)"
	},
	{
		href: "../clima",
		text: "JS - Learning ChartJS"
	},
	{
		href: "../sena/bilhete.html",
		text: "Brazil lottery game generator Sena (pt - br)"
	},
	{
		href: "../loto/bilhete.html",
		text: "Brazil lottery game generator Loto<br (pt - br)"
	},
	{
		href: "../hash",
		text: "JS - Hash Game"
	},
	{
		href: "../chat",
		text: "Chatroom / Sala de Bate papo (pt - br)"
	},
	{
		href: "../rand",
		text: "Randomizer data/Gerador de dados aleatórios (pt - br)"
	},
	{
		href: "../petshop",
		text: "PetShop App Basic/PetShop, Local files (pt - br)"
	},
	{
		href: "../cantina",
		text: "Cantina UI, To Power BI classes (pt - br)"
	},
	{
		href: "https://github.com/wellifabio/matematica.git",
		text: "Mathematical Expressions with Markdown (pt - br)"
	},
	{
		href: "https://wellifabio.github.io/produtos-cards/",
		text: "Cads with Vanilla-JS Examples (pt - br)"
	},
	{
		href: "https://wellifabio.github.io/produtos-modais/",
		text: "Modais with Vanilla-JS Examples (pt - br)"
	},
	{
		href: "https://wellifabio.github.io/produtos-carrinho/",
		text: "Shopping Cart with Vanilla-JS Examples (pt - br)"
	},
	{
		href: "https://github.com/wellifabio/desafioslogica.git",
		text: "Logic challenges (pt - br)"
	}
];

const portfolios = [
	{ text: "Professor Robson", href: "https://robsonbsouzaa.github.io/", "turma":"Instrutores"},
	{ text: "Matheus Pignata", href: "https://matheuspignata.github.io", "turma":"Instrutores"},
	{ text: "Turma de ChatGPT de 2026", href: "https://wellifabio.github.io/senai_portfolio_fic_chatgpt_2026", "turma":"ChatGPT 2026"},
	{ text: "Beatriz Gabrielle Vizeu de Salles", href: "https://bia-vizeu.github.io/Portifolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Dahra Felix Fagionato", href: "https://dahrafagionato.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Eloá Pereira Florêncio", href: "https://eloapfe.github.io/eloapfe/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Gabriel Zanon", href: "https://gabrielbzanon.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Gabriel Araújo", href: "https://sharaujoo.github.io/portifolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Gabriela Helena Demori", href: "https://gabihdemori.github.io/Portifolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Guilherme Canina", href: "https://guilhermecanina.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Guilherme Stafocher Massucatto", href: "https://guimassucatto.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Lohaine Vitória de Mattos SIlva", href: "https://lohainemattos.github.io/Lohaine-Mattos", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Heloisa Bordini Mendonça", href: "https://heloisa-bm.github.io/Heloisa/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Henrico Ramalho", href: "https://henricoramalho.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Isabelle Cristina de Oliveira Almeida", href: "https://isabellealmeid4.github.io/porftolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "João Lucas Ribeiro Leite	", href: "https://jaolucas1234.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Kauê Henrique Fidelis Cirqueira", href: "https://canalbaltellgrounds.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Laila Casadei Macêdo", href: "https://lailacm.github.io", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Leonardo Fernandes de Oliveira", href: "https://leozin99.github.io/Portifolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Lucas Gonçalves Giachetto", href: "https://lucasggiachetto.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Lucas Hasmann Tavares Gonçalves", href: "https://lucashasmann.github.io/portifoliol7/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Lucas Menegon", href: "https://menegonlucas.github.io/menegonlucas/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Matheus Neves", href: "https://matheus-sneves.github.io/Matheus-SNeves/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Maria Clara Pavan Caleffi", href: "https://mariapcaleffi.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Maria Eduarda Bruna Berto", href: "https://dudaberto.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Maria Eduarda Da Silva Barroso", href: "https://dud4silvaa.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Marcos Vinicius de Oliveira", href: "https://viciousmark.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Milena Felisbelo Da Silva", href: "https://milenafelisbelo.github.io/portifolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Miriam Bordini Mendonça", href: "https://miriambordini.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Nicole Araujo dos Santos", href: "https://nicolesantos0.github.io/" , "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Olavo Marques da Silva", href: "https://olavomarques.github.io/Portifolio/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Pedro Henrique de Lima Batista", href: "https://carecalima.github.io/", "turma":"Tec. Dev. Sistemas 2025"},
	{ text: "Andre Fernandes Izidro", href: "https://aizidro.github.io", "turma":"Tec. Dev. Sistemas 2023"},
	{ text: "Lucas Almeida Camacho", href: "https://lcscamacho.github.io", "turma":"Tec. Dev. Sistemas 2023"},
	{ text: "Vinicius Vieira de Souza", href: "https://vinisouza001.github.io/", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Bruno Otávio da Silva Ramos", href: "https://bruno-otavio.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Carla Carota Mozena", href: "https://carla-coder.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Carlos Henrique de Oliveira Siqueira", href: "https://carloshosiqueira.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Cicero Ruan Soares Barbosa ", href: "https://portfoliocisenai.netlify.app/", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Gabriella Godoi Avila", href: "https://avilagabriella.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Jaqueline Rodrigues", href: "https://JaqueJak.github.io", "turma":"Tec. Dev. Sistemas 2023"},
	{ text: "João Victor Colosso", href: "https://portfoliocolosso.netlify.app", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "João Vitor Castro Viana Marques", href: "https://JMarques12.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Leticia Aparecida Hofman de Souza", href: "https://lehhofman.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Otavio Bassi de freitas", href: "https://freitas7portfolio.netlify.app", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Vinícius Manzano dos Santos", href: "https://vinimanzano.github.io/vinimanzano.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Camilla Piva Da Silva", href: "https://Camispiva.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Maria Fernanda Mattoso Oliveira Rello", href: "https://fefemattoso.github.io", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Richard Matheus Pinesi", href: "https://richardpnsportfolio.netlify.app", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Otavio Bueno", href: "https://buenootavio.github.io/", "turma":"Tec. Dev. Sistemas 2024"},
	{ text: "Bryan Beckham", href: "https://bryanbeckham06.github.io/", "turma":"Tec. Dev. Sistemas 2024"}
];

const projetos = [
	{
		href: "../assets/ieqfg/",
		text: "Projects AutoCad 3D - New IEQ Building"
	},
	{
		href: "../assets/containner/",
		text: "Projects AutoCad 3D - Container Snack Bar"
	},
	{
		href: "../assets/diversos/",
		text: "Projects AutoCad 3D modelling"
	},
	{
		href: "../assets/academia/",
		text: "My architect CAD hobby"
	},
	{
		href: "../assets/minhacasa/",
		text: "My building hobby"
	},
	{
		href: "../assets/diversos/miniold.html",
		text: "Web Site - Old (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/matematica.git",
		text: "Math with Markdown (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/projetofullexemplo.git",
		text: "Full-Stack - ServiFacil - Servies Management (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/escolaprismapug.git",
		text: "School with prism and Pug (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/restaurante3des.git",
		text: "Restaurant deliveries and location (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/senai2022/blob/master/old/1des/fpoo/aula25/PetsLogin/doc/prototipo.pdf",
		text: "Java Desktop - PetShop Solution example (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/ProjetoHortelino/doc/prototipo.pdf",
		text: "Java Desktop - Inventory and sales management (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/Estacionamento/docs/prototipo.pdf",
		text: "Java Desktop - Park Solution example (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/Mapeador/docs/prototipo.pdf",
		text: "Java Desktop - Small Nets Solution example (pt-br)"
	},
	{
		href: "https://github.com/wellifabio/senai2021/blob/master/1des/fpoo/exemplosGUI/Money/docs/prototipo.pdf",
		text: "Java Desktop - Counting money Solution example (pt-br)"
	},
	{
		href: "../cookbook",
		text: "Cookbook - Web Full-stack (pt-br)"
	},
	{
		href: "../assets/fatec_artigopooe.pdf",
		text: "Artigo - Programação Orientada a Objetos em Equipes (pt-br)"
	},
	{
		href: "../assets/fatec_monografiapooe.pdf",
		text: "Monografia - Graduação em Processamento de Dados (pt-br)"
	},
	{
		href: "https://sistemas.jaguariuna.sp.gov.br/portalcidadao",
		text: "Prefeitura Jaguariúna"
	},
	{
		href: "https://portalsaep.senai.br/home",
		text: "Portal SAEP"
	}
]
