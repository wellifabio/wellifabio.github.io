function getCDI() {
    const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados?formato=json";
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    const json = JSON.parse(request.responseText);
    return json;
}

const mediaUltimos12Meses = (json) => {
    let soma = 0;
    for (let i = 0; i < 12; i++) {
        soma += Number(json[json.length - 1 - i].valor);
    }
    return soma / 12;
}

document.querySelector("#taxa").value = mediaUltimos12Meses(getCDI()).toFixed(2);

const meses = document.querySelector("#meses");
meses.addEventListener("keyup", () => {
    const valor = document.querySelector("#valor").value;
    const resultado = document.querySelector("#result1");
    resultado.value = (valor * meses.value).toFixed(2);
});

const calcular = () => {
    const taxa = Number(document.querySelector("#taxa").value);
    const valor = document.querySelector("#valor");
    const n = document.querySelector("#meses").value;
    const body = document.querySelector("#tbody");
    body.innerHTML = "";
    let v = 0;
    const taxaPorcento = taxa / 100;
    let j = 0;
    let va = 0;
    for (let i = 0; i < n; i++) {
        let linha = document.createElement("tr");
        let c1 = document.createElement("td");
        let c2 = document.createElement("td");
        let c3 = document.createElement("td");
        let c4 = document.createElement("td");
        v = va + Number(valor.value);
        j = v * taxaPorcento;
        va = v + j;
        c1.innerHTML = i + 1;
        c2.innerHTML = 'R$ ' + v.toFixed(2);
        c3.innerHTML = 'R$ ' + j.toFixed(2);
        c4.innerHTML = 'R$ ' + va.toFixed(2);
        linha.appendChild(c1);
        linha.appendChild(c2);
        linha.appendChild(c3);
        linha.appendChild(c4);
        body.appendChild(linha);
    }
    const resultado = document.querySelector("#result2");
    resultado.value = va.toFixed(2);
    alert('O retorno acumulado será de R$ ' + va.toFixed(2)+'\nGanho real de R$ '+(va - valor.value * n).toFixed(2)+'\nConfira mês a mês na tabela')
};


