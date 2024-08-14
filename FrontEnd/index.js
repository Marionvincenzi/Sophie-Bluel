const worksUrl = "http://localhost:5678/api/works";
const urlCategories ="http://localhost:5678/api/categories";
const filters = document.querySelector(".filters");


// async function getWorks() {
//     try {
//         const response = await fetch(worksUrl);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const dataWorks = await response.json();
//         console.log(dataWorks);
//         return dataWorks;
//     } catch (error) {
//         console.error("Erreur lors de la récupération des travaux", error);
//         return [];
        
//     }
// }

function getWorks() {

    return fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayWorks(data);
    })
    .catch(error => {
        console.log(error)
    })
}

getWorks()

//Fonction pour afficher les travaux 
function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        figure.classList.add(`figure-${work.id}`);
        img.src = work.imageUrl;
        img.alt = work.title || "Image";
        figcaption.innerText = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
//Fonction pour récupérer les catégories 
async function getCategories() {
    const works = await getWorks();
    const categories = await getCategories()
    try {
        const response = await fetch(urlCategories);
        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }
        const dataCategories = await response.json();
        console.log(dataCategories);
        return dataCategories
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        return[];
    }
}



//Fonction pour afficher les filtres
function displayfilters(categories) {
    const title = document.querySelector("#portfolio");
    const subTitle = title.children[1];
    const divBtn = document.createElement("div");
    divBtn.classList.add("divBtn");

    const token = localStorage.getItem("authToken")
    title.insertBefore(divBtn, subTitle);

    const gallery = document.querySelector(".gallery")
    const btnAll = document.createElement("button");
    btnAll.classList.add("filterButton","btnAll");
    btnAll.classList.add("active");
    btnAll.innerText = "TOUS";
    btnAll.addEventListener("click", () => {
        gallery.innerHTML = "";
        getWorks().then(displayWorks);
        handleFilterButton("btnAll");
    });
    divBtn.appendChild(btnAll);

    function handleFilterButton(button) {
        document.querySelectorAll(".filterButton").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

    btnAll.addEventListener("click", () => {
        handleFilterButton(btnAll);
        gallery.innerHTML = "";
        getWorks().then(displayWorks);
        })
    }

    

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.classList.add("filterButton");
        btn.innerText = category.name.toUpperCase();
        btn.addEventListener("click", () => {
            gallery.innerHTML = "";
            getWorks().then(works => {
                const filterWorks = works.filter(work => work.categoryId === category.id);
                displayWorks(filterWorks);
            });
        });
        divBtn.appendChild(btn);
    });
}



// Fonction principale pour récupérer les données et les afficher
async function main() {
    const works = await getWorks();
    displayWorks(works);
    const categories = await getCategories();

    if (works.length > 0 && categories.length > 0) {
        console.log("Récupération des travaux et des catégories avec succès !");
        displayWorks(works);
        displayfilters(categories);
    } else {
        console.error("Une erreur s'est produite lors de la récupération des travaux er des catégories");
    }
}

  document.addEventListener("DOMContentLoaded", () => {
      const loginButton = document.getElementById("only-guest");
      const logoutButton = document.getElementById("nav-logout");
      const adminBar = document.getElementById("banner-modifier");
      const editButton = document.getElementById("edit-button");
      const token = localStorage.getItem("authToken");

    if (!loginButton || !logoutButton ||!adminBar ) {
        console.error("Les éléments avec les ID n'ont pas été trouvée");
        return;
    }
    

    if (token) {
        //Utilisateur connecté
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
        adminBar.classList.remove("hidden");
        editButton.style.display ="block";
    } else {
        //Utilisateur non connecté
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
        adminBar.classList.add("hidden");
        editButton.style.display = "none";

    }


    //Gestion du clic sur le bouton login
    loginButton.addEventListener("click", () => {
        window.location.href = "login.html"
    })
    
    

    //Gestion du clic sur le bouton Logout
    logoutButton.addEventListener("click", () =>{
        localStorage.removeItem("authToken");
        window.location.href = "index.html"
    });

    const addPhotoSection = document.getElementById("modal-edit");
    addPhotoSection.style.display = token ? "block" : "none";

    
    // if (token) {
        
    //     addPhotoSection.style.display ="block";
    // } else {
    //     addPhotoSection.style.display ="none";
    //     }
  });

//Appel à la fonction principale 
// main();

/*****Création des bouton dynamiquement******/
/*Boucle for pour creer les bouton par catégorie*/
// function createAllButtons() {
//     getCategories().then((data) => {
//       // console.log(data);
//       data.forEach((category) => {
//         createButton(category);
//       });
//     });
//   }