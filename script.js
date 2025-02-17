document.addEventListener("DOMContentLoaded", chargerTaches);

function ajouterTache() {
    let input = document.getElementById("nouvelleTache");
    let tacheTexte = input.value.trim();

    if (tacheTexte === "") {
        alert("Veuillez entrer une tâche !");
        return;
    }

    let liste = document.getElementById("listeTaches");

    let nouvelleTache = document.createElement("li");
    nouvelleTache.innerHTML = `
        <span onclick="completerTache(this)">${tacheTexte}</span>
        <button onclick="supprimerTache(this)">❌</button>
    `;

    liste.appendChild(nouvelleTache);
    sauvegarderTaches();
    input.value = "";
}

function supprimerTache(element) {
    element.parentElement.remove();
    sauvegarderTaches();
}

function completerTache(element) {
    element.classList.toggle("completed");
    sauvegarderTaches();
}

function sauvegarderTaches() {
    let taches = [];
    document.querySelectorAll("#listeTaches li").forEach(li => {
        taches.push({
            texte: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("taches", JSON.stringify(taches));
}

function chargerTaches() {
    let liste = document.getElementById("listeTaches");
    let taches = JSON.parse(localStorage.getItem("taches")) || [];

    taches.forEach(tache => {
        let nouvelleTache = document.createElement("li");
        nouvelleTache.innerHTML = `
            <span onclick="completerTache(this)" class="${tache.completed ? 'completed' : ''}">${tache.texte}</span>
            <button onclick="supprimerTache(this)">❌</button>
        `;
        liste.appendChild(nouvelleTache);
    });
}
