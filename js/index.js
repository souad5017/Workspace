// photo
let url; 
const photo = document.getElementById("photo");
const photoPersonel = document.querySelector(".photoPersonel");

photo.addEventListener("change", () => {
    const fichier = photo.files[0];
    url = URL.createObjectURL(fichier);      // kadiir lien moa9at limg
    photoPersonel.src = url ; 
});


// Ajouter un nouvel employé

const modals = document.getElementById("modals");
const annuler = document.getElementById("annuler");
const enregisstrer = document.getElementById("Enregisstrer");
const btnAjt = document.getElementById("btnAjt");
const employés = document.getElementById("employés");

const nom = document.getElementById("nom");
const role = document.getElementById("role");
const email = document.getElementById("email");
const tele = document.getElementById("tele");
const company = document.getElementById("company");
const experienceRole = document.getElementById("experienceRole");
const from = document.getElementById("from");
const to = document.getElementById("to");


btnAjt.addEventListener("click" ,  () => {
    modals.style.display = "flex";
});

annuler.addEventListener("click" , () => {
    modals.style.display = "none";
});

enregisstrer.addEventListener("click" , ()=> {

    const newEmployé = document.createElement("div");
    const employéInformation = document.createElement("div");
    const employéPhoto = document.createElement("img");
    const employéName = document.createElement("h3");
    const employéRole = document.createElement("p");
    const fichier = photo.files[0];

    employéPhoto.src = url;
    



});



