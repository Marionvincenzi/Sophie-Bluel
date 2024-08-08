const worksUrl = "http://localhost:5678/api/works";
const urlCategories ="http://localhost:5678/api/categories";
const filters = document.querySelector(".filters");

//Fonctipon pour récupérer les travaux 
async function getWorks() {
    try {
        const response = await fetch(worksUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  
        }
        const dataWorks = await response.json();
        console.log(dataWorks);
        return dataWorks;
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux", error);
        return [];
        
    }
}

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
        figcaption.innerText = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

//Fonction pour récupérer les catégories 
async function getCategories() {
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
    title.insertBefore(divBtn, subTitle);

    const gallery = document.querySelector(".gallery")
    const btnAll = document.createElement("button");
    btnAll.classList.add("filterButton","btnAll");
    btnAll.classList.add("active");
    btnAll.innerText = "TOUS";
    btnAll.addEventListener("click", () => {
        gallery.innerHTML = "";
        getWorks().then(displayWorks);
    });
    divBtn.appendChild(btnAll);

    function handleFilterButton(button) {
        document.querySelectorAll(".filterButotn").forEach(btn => btn.classList.remove("active"));
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



//Fonction principale pour récupérer les données et les afficher
async function main() {
    const works = await getWorks();
    const categories = await getCategories();

    if (works.length > 0 && categories.length > 0) {
        console.log("Récupération des travaux et des catégories avec succès !");
        displayWorks(works);
        displayfilters(categories);
    } else {
        console.error("Une erreur s'est produite lors de la récupération des travaux er des catégories");
    }
}



/*****Création des bouton dynamiquement******/
/*Boucle for pour creer les bouton par catégorie*/
function createAllButtons() {
    getCategories().then((data) => {
      // console.log(data);
      data.forEach((category) => {
        createButton(category);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const addPhotoSection = document.getElementById("modal-edit");

    
    if (token) {
        
        addPhotoSection.style.display ="block";
    } else {
        addPhotoSection.style.display ="none";
        }
  });
//Appel à la fonction principale 
main();

