

// ==================== PHOTO ====================
let url = null;
const photo = document.getElementById("photo");
const photoPersonel = document.querySelector(".photoPersonel");

photo.addEventListener("change", () => {
    const fichier = photo.files[0];
    url = URL.createObjectURL(fichier);
    photoPersonel.src = url;
});


// ==================== VARIABLES ====================
const modals = document.getElementById("modals");
const annuler = document.getElementById("annuler");
const enregisstrer = document.getElementById("Enregisstrer");
const btnAjt = document.getElementById("btnAjt");
const employés = document.getElementById("employés");
const contenur = document.getElementById("contenur");

const nom = document.getElementById("nom");
const role = document.getElementById("role");
const email = document.getElementById("email");
const tele = document.getElementById("tele");

const btnAjoute = document.querySelector(".btn-ajoute");

let storedData = [];
let experiences = 0;


// ==================== OPEN MODAL ====================
btnAjt.addEventListener("click", () => {

    // reset formulaire
    nom.value = "";
    role.value = "";
    email.value = "";
    tele.value = "";

    // reset experiences
    contenur.innerHTML = "";
    experiences = 0;

    // reset image
    url = null;
    photo.value = "";
    photoPersonel.src = "./images/default.png"; // بدليها بالصورة ديالكم

    modals.style.display = "flex";
});


// ==================== CLOSE MODAL ====================
annuler.addEventListener("click", () => {
    modals.style.display = "none";
});


// ==================== ADD EXPERIENCE ====================
btnAjoute.addEventListener("click", () => {
    experiences++;

    const newExprience = document.createElement("div");
    newExprience.classList.add("experiences");

    newExprience.innerHTML = `
        <div class="Exp">
            <button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>

        <div class="information">
            <div>
                <label>Company</label>
                <input id="company${experiences}" type="text" placeholder="Enter company">
            </div>
            <div>
                <label>Role</label>
                <input id="role${experiences}" type="text" placeholder="Enter role">
            </div>
            <div>
                <label>From</label>
                <input id="from${experiences}" type="date">
            </div>
            <div>
                <label>To</label>
                <input id="to${experiences}" type="date">
            </div>
        </div>
    `;

    contenur.appendChild(newExprience);

    // delete experience
    newExprience.querySelector(".btn-delete").addEventListener("click", () => {
        newExprience.remove();
    });
});


// ==================== SAVE EMPLOYEE ====================
enregisstrer.addEventListener("click", () => {

    const exps = [];

    for (let i = 1; i <= experiences; i++) {

        const companyValue = document.getElementById(`company${i}`)?.value || "";
        const roleValue = document.getElementById(`role${i}`)?.value || "";
        const fromValue = document.getElementById(`from${i}`)?.value || "";
        const toValue = document.getElementById(`to${i}`)?.value || "";

        // only push if something entered
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

    // clear form after saving
    contenur.innerHTML = "";
    experiences = 0;
    modals.style.display = "none";
});


// ==================== RENDER EMPLOYEES ====================
function renderWorkers() {

    employés.innerHTML = "";

    storedData.forEach((newUser, index) => {

        const newEmployé = document.createElement("div");
        const employéInformation = document.createElement("div");
        const employéPhoto = document.createElement("img");
        const employéName = document.createElement("h3");
        const employéRole = document.createElement("p");
        const deleteIcon = document.createElement("button");

        employéPhoto.src = newUser.photo || "./images/default.png";
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
            storedData.splice(index, 1);
            renderWorkers();
        });
    });
}
