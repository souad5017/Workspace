// photo
let url;
const photo = document.getElementById("photo");
const photoPersonel = document.querySelector(".photoPersonel");

photo.addEventListener("change", () => {
    const fichier = photo.files[0];
    url = URL.createObjectURL(fichier);
    photoPersonel.src = url;
});


// Ajouter un nouvel employé
const modals = document.getElementById("modals");
const annuler = document.getElementById("annuler");
const enregisstrer = document.getElementById("Enregisstrer");
const btnAjt = document.getElementById("btnAjt");
const employés = document.getElementById("employés");
const addExperiences = document.querySelector(".experiences");
const btnAjoute = document.querySelector(".btn-ajoute");
const btnDelet = document.querySelector(".btn-delete");
const contenur = document.getElementById("contenur");

const nom = document.getElementById("nom");
const role = document.getElementById("role");
const email = document.getElementById("email");
const tele = document.getElementById("tele");
const company = document.getElementById("company");
const experienceRole = document.getElementById("experienceRole");
const from = document.getElementById("from");
const to = document.getElementById("to");

let storedData = [];
const newUser = {};
let experiences = 0 ;

btnAjt.addEventListener("click", () => {
        // clear form
    nom.value = "";
    role.value = "";
    email.value = "";
    tele.value = "";

    url = null;
    photo.value = "";
    photoPersonel.src = "../img/istockphoto-1495088043-612x612.jpg";
    modals.style.display = "flex";
});

annuler.addEventListener("click", () => {

    modals.style.display = "none";
});

// addExperiences

btnAjoute.addEventListener("click", () => {
     
    const newExprience = document.createElement("div");
    experiences++
    newExprience.innerHTML = `
                        <div class="experiences">
                            <div class="Exp">
                         
                            <button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                            <div class="information">
                                <div>
                                    <label for="company">Company</label>
                                    <input id="company${experiences}" type="text" placeholder="Enter company">
                                </div>
                                <div>
                                    <label for="role">Role</label>
                                    <input id="experienceRole" type="text" placeholder="Enter rôle">
                                </div>
                                <div>
                                    <label for="from">From</label>
                                    <input id="from" type="date">
                                </div>
                                <div>
                                    <label for="to">To</label>
                                    <input id="to" type="date">
                                </div>

                            </div>
                        </div>`

    contenur.appendChild(newExprience);

    newExprience.querySelector(".btn-delete").addEventListener("click", () => {
    newExprience.remove();
    });
});


// Enregistrer un employé
enregisstrer.addEventListener("click", () => {


    const exps = []

    for(let i = 1 ; i <= experiences ; i++){

        const companyValue = document.getElementById(`company${i}`)?.value || "";
        const roleValue = document.getElementById(`role${i}`)?.value || "";
        const fromValue = document.getElementById(`from${i}`)?.value || "";
        const toValue = document.getElementById(`to${i}`)?.value || "";

        if (companyValue.trim() !== "" || roleValue.trim() !== "") {
            exps.push({
                company: companyValue,
                role: roleValue,
                from: fromValue,
                to: toValue
            });
        }

    }

    const newUser = {
        name: nom.value.trim(),
        role: role.value,
        email: email.value.trim(),
        phone: tele.value.trim(),
      
        photo: url,
        experiences :exps ,
        zone: null,
    };

    storedData.push(newUser);

    renderWorkers();


    modals.style.display = "none";

});

function renderWorkers() {

    employés.innerHTML = ""
    storedData.forEach((newUser)=>{


    const newEmployé = document.createElement("div");
    const employéInformation = document.createElement("div");
    const employéPhoto = document.createElement("img");
    const employéName = document.createElement("h3");
    const employéRole = document.createElement("p");
    const deleteIcon = document.createElement("button");

    employéPhoto.src = newUser.photo || "../img/istockphoto-1495088043-612x612.jpg";
    employéName.textContent = newUser.name;
    employéRole.textContent = newUser.role;
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    employés.appendChild(newEmployé);

    newEmployé.style = `
        border: 1.5px solid #00000080;
        padding: 10px;
        display: flex;
        flex-direction: row;
        background-color: #fff;
        color: #0000008f;
        border-radius: 15px;
        gap: 10px;
        align-items: center;
    `;

    newEmployé.appendChild(employéPhoto);
    employéPhoto.style = `
        background-color: #4746461e;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    `;

    newEmployé.appendChild(employéInformation);
    employéInformation.style = `
        display: flex;
        flex-direction: column;
        gap: 5px;
    `;

    employéInformation.appendChild(employéName);
    employéInformation.appendChild(employéRole);

    newEmployé.appendChild(deleteIcon);
    deleteIcon.style = `
        background-color: transparent;
        margin-left: auto;
        font-size: 18px;
        color: #fa2836;
        cursor: pointer;
        border: none;
    `;

    // delete employee
    deleteIcon.addEventListener("click", () => {

        newEmployé.remove();
    });

 });
}
