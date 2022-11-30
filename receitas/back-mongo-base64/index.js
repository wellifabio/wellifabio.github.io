require('dotenv').config();
const PORT = process.env.PORT || 3000
const express = require('express');
const cors = require('cors');

let corsOptions = {
    origin: [
        "https://wellifabio.github.io/receitas/index.html",
        "http://wellifabio.github.io/receitas//index.html",
        "https://wellifabio.github.io/receitas/",
        "http://wellifabio.github.io/receitas/",
        "https://wellifabio.github.io/receitas/*",
        "http://wellifabio.github.io/receitas/*",
        "200.204.33.222:80:5500/index.html"
    ],
    "methods": "GET,PUT,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    limit: '1mb'
};

let reqLimit = {
    limit: '1mb'
}

//Importar dao e rotas
const dao = require('./src/dao/receita.dao');
dao.conecta();
const receita = require('./src/routes/receita.route');

//Iniciar a API
const app = express()
    .use(express.json(corsOptions))
    .use(express.urlencoded(reqLimit))
    .use(cors())
    .use('/', receita);

app.listen(PORT, () => {
    console.log('Servidor em execução na porta' + PORT);
});