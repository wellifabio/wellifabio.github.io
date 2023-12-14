const uri = "http://localhost:3000";

const formNotas = document.querySelector('#formNotas');

formNotas.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(uri + '/alunos/' + formNotas.cpf.value)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                window.localStorage.setItem("aluno", JSON.stringify(data))
                window.location.href = 'notas.html';
            } else {
                alert('Aluno não encontrado')
                formNotas.reset();
            }
        });
});
