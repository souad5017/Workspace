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
const btnAjoute = document.querySelector(".btn-ajoute");
const btnDelet = document.querySelector(".btn-delete");
const contenur = document.getElementById("experiencesContainer");

const nom = document.getElementById("nom");
const role = document.getElementById("role");
const email = document.getElementById("email");
const tele = document.getElementById("tele");
const company = document.getElementById("company");
const experienceRole = document.getElementById("experienceRole");
const from = document.getElementById("from");
const to = document.getElementById("to");
const addExperiences = document.querySelector(".experiences");


let storedData = [];
const newUser = {};
let experiences = 0;

btnAjt.addEventListener("click", () => {
    // clear form
    nom.value = "";
    role.value = "";
    email.value = "";
    tele.value = "";

    contenur.innerHTML = ""; 
    experiences = 0;  

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
                            <div></div>
                            <button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                            <div class="information">
                                   <div>
                                    <label for="company">Company</label>
                                    <input id="company${experiences}" type="text" placeholder="Enter company">
                                </div>
                                <div>
                                    <label for="role">Role</label>
                                    <input id="experienceRole${experiences}" type="text" placeholder="Enter rôle">
                                </div>
                                <div>
                                    <label for="from">From</label>
                                    <input id="from${experiences}" type="date">
                                </div>
                                <div>
                                    <label for="to">To</label>
                                    <input id="to${experiences}" type="date">
                                </div>

                            </div>
                        </div>`

    contenur.appendChild(newExprience);

    newExprience.querySelector(".btn-delete").addEventListener("click", () => {
        newExprience.remove();
    });


});


enregisstrer.addEventListener("click", () => {

    if (nom.value.trim() === "" || role.value.trim() === "" || email.value.trim() === "") {
        alert("Veuillez remplir le nom, le rôle et l'adresse e-mail");
    } else {
        const exps = []

        for (let i = 1; i <= experiences; i++) {

            const companyValue = document.getElementById(`company${i}`)?.value || "";
            const roleValue = document.getElementById(`experienceRole${i}`)?.value || "";
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
            experiences: exps,
            zone: null,
        };

        storedData.push(newUser);

        renderWorkers();


        modals.style.display = "none";
      
    }

});

function renderWorkers() {

    employés.innerHTML = "";
    storedData.forEach((newUser) => {


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
            storedData = storedData.filter(emp => emp !== newUser);
        });

        function listEmp(worker) {
            if (worker.zone != null) {
                newEmployé.remove();
            }
        }

        listEmp(newUser);


    });
}




const zones = {
    conference: document.getElementById("conference"),
    reception: document.getElementById("reception"),
    serveurs: document.getElementById("serveurs"),
    securite: document.getElementById("securite"),
    personnel: document.getElementById("personnel"),
    archives: document.getElementById("archives"),
};

const buttons = {
    conference: document.getElementById("btnConference"),
    reception: document.getElementById("btnReception"),
    serveurs: document.getElementById("btnServeurs"),
    securite: document.getElementById("btnSecurite"),
    personnel: document.getElementById("btnPersonnel"),
    archives: document.getElementById("btnArchives"),
};

function canAccessZone(worker, zoneId) {
    const r = worker.role;
    const zonesRest = {
        reception: ["Réceptionniste", "Manager"],
        serveurs: ["Technicien IT", "Manager"],
        securite: ["Agent de sécurité", "Manager"],
        archives: ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité"],
    };
    if (zoneId in zonesRest) return zonesRest[zoneId].includes(r);
    return true;
}


function openAssignPopup(zoneId) {
    const zoneDiv = zones[zoneId];

    const popup = document.createElement("div");
    popup.className = "popupAssign";
    popup.innerHTML = `
        <div class="box">
            <h3>Choisir un employé</h3>
            <div class="list"></div>
            <button class="closeBtn">Annuler</button>
        </div>
    `;

    document.body.appendChild(popup);

    const listContainer = popup.querySelector(".list");

    // lister tous les employés non assignés avec restriction
    const availableEmployees = storedData.filter(emp => emp.zone === null && canAccessZone(emp, zoneId));

    if (availableEmployees.length === 0) {
        listContainer.innerHTML = `<p style="color:red">Aucun employé éligible pour cette zone</p>`;
    } else {
        availableEmployees.forEach(emp => {
            const item = document.createElement("div");
            item.className = "assignItem";
            item.innerHTML = `
                <img src= '${emp.photo || "../img/istockphoto-1495088043-612x612.jpg"}' alt="Photo" class="usrPhoto">
                <span>${emp.name} - ${emp.role}</span>
                <button class="assignBtn">Assign</button>
            `;

            item.querySelector(".assignBtn").addEventListener("click", () => {
                assignEmployeeToZone(emp, zoneId);
                popup.remove();
            });

            listContainer.appendChild(item);
        });
    }

    popup.querySelector(".closeBtn").addEventListener("click", () => popup.remove());
}

// assign employee
function assignEmployeeToZone(emp, zoneId) {
    emp.zone = zoneId;

    renderWorkers();

    const zoneDiv = zones[zoneId];

    const elem = document.createElement("div");
    elem.className = "workerZone";
    elem.innerHTML = `
        <div class="workerInZone">
        <div>
        <img src= '${emp.photo || "../img/istockphoto-1495088043-612x612.jpg"}' alt="Photo" class="usrPhoto">
        <span>${emp.name}</span>
        </div>
        <button class="removeBtn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
    `;

    elem.querySelector(".removeBtn").addEventListener("click", () => {
        emp.zone = null;
        elem.remove();
        renderWorkers();
    });

    zoneDiv.appendChild(elem);
}

buttons.conference.addEventListener("click", () => openAssignPopup("conference"));
buttons.reception.addEventListener("click", () => openAssignPopup("reception"));
buttons.serveurs.addEventListener("click", () => openAssignPopup("serveurs"));
buttons.securite.addEventListener("click", () => openAssignPopup("securite"));
buttons.personnel.addEventListener("click", () => openAssignPopup("personnel"));
buttons.archives.addEventListener("click", () => openAssignPopup("archives"));


