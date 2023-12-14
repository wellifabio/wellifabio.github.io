const aluno = JSON.parse(window.localStorage.getItem('aluno'));
const container = document.querySelector('.container');

if (!aluno) {
    window.location.href = 'index.html';
} else {

    const nome = document.querySelector('#aluno');
    nome.innerHTML = aluno[0].nome;
    console.log(aluno[0]);
    montarCards();
}

function montarCards() {
    let componente = '';
    let media = 0;
    aluno[0].notas.forEach(nota => {
        const cardBody = document.createElement('div');
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `
        <p class="card-text">Avaliacao: ${nota.avaliacao}</p>
        <p class="card-text">Nota: ${nota.nota}</p>
        <p class="card-text">Peso: ${nota.peso}</p>`;
        if (componente != nota.componente) {
            media = nota.nota * nota.peso / 100;
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h5 class="card-title">${nota.componente} [Média:<label></label>]</h5>
                <div class="card-body ${nota.nota < 50?'card-bad':''}">
                    <p class="card-text">Avaliacao: ${nota.avaliacao}</p>
                    <p class="card-text">Nota: ${nota.nota}</p>
                    <p class="card-text">Peso: ${nota.peso}</p>
                </div>
            `;
            container.appendChild(card);
        } else {
            const card = container.lastChild;
            card.appendChild(cardBody);
            media += nota.nota * nota.peso / 100;
            container.lastChild.querySelector('label').innerHTML = media;
        }
        componente = nota.componente;
    });
}