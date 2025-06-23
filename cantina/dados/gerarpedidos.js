    const pedidos = [];
    for (i = 0; i < 200; i++) {
        pedidos.push({
            id: i + 1,
            dataPedido: new Date(Date.now() - (200 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            idCliente: i < 160 ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 5) + 1,
            idProduto: i < 160 ? Math.floor(Math.random() * 11) + 1: Math.floor(Math.random() * 8) + 1 ,
            quantidade: Math.floor(Math.random() * 5) + 1,
            dataPagamento: i < 160 ? new Date(Date.now() - (200 - i) * 24 * 60 * 60 * 1000 + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString() : "Pendente"
        });
    }
    console.log(JSON.stringify(pedidos));