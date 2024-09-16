//Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Iniciar o    Firebase
const app = initializeApp(firebaseConfig);
// Iniciar o firestore
const db = getFirestore(app);

//Listar todos os documentos da coleção "publicacoes"
const getConteudos = async () => {
    const querySnapshot = await getDocs(collection(db, "publicacoes"));
    querySnapshot.forEach((doc) => {
        const d = doc.data();
        d.id = doc.id;
        conts.push(d);
    });
    console.log(conts);
}

//Enviar novo conteúdo para o Firestore, na coleção "publicacoes"
const enviarConteudo = async (conteudo) => {
    await addDoc(collection(db, "publicacoes"), conteudo);
}

//Excluir conteúdo do Firestore
const excluirConteudo = async (id) => {
    const docRef = doc(db, "publicacoes", id);
    await deleteDoc(docRef);
}

//Processar o clique no botão de excluir
const excluir = document.getElementById("del");
excluir.addEventListener("click", async () => {
    await excluirConteudo(excluir.id);
    window.location.reload();
});

//Processar o submit do formulário
const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const conteudo = {
        img: form.img.value,
        texto: form.texto.value
    }
    await enviarConteudo(conteudo);
    window.location.reload();
});

await getConteudos();
render();