const params = {
    onde: undefined,
    cor: 0,
    postit: ["../assets/postit.png", "../assets/postitblue.png", "../assets/postitred.png"],
    orientacoes: [
        "Aqui, devem ser relacionadas quais as outras empresas serão parceiras do negócio. Geralmente, são serviços necessários para o funcionamento do empreendimento e os fornecedores.",
        "Relacione aqui as ações necessárias para a realização da proposta de valor.",
        "Relacione aqui os recursos necessários para realizar a proposta de valor, para fazer o negócio funcionar.",
        "Conectar prestadores de serviço a clientes por uma pequena comissão",
        "Defina aqui como fazer para conquistar e manter uma boa relação com os clientes.",
        "Defina de que forma os produtos serão conhecidos, como chegarão aos clientes e como os clientes irão interagir com o negócio.",
        "Defina quem são os clientes que se pretende atender. Eles têm um perfil específico? Como estão agrupados? Onde estão localizados? Há uma necessidade comum?",
        "Levante o que vai ser gasto para realizar a proposta de valor.",
        "Defina aqui como e quanto se pagará pelos produtos."
    ]
}
const addPostit = (where) => {
    document.querySelector("#rodape").classList.toggle("modal");
    document.querySelector("#orientacao").innerHTML = params.orientacoes[parseInt(where.id.substring(1, 2)) - 1];
    params.onde = where;
}

const add = () => {
    params.onde.innerHTML += `<img src="${params.postit[params.cor]}">`
    document.querySelector("#rodape").classList.toggle("modal");
}