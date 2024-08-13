    document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal");
    const modalWorks = document.getElementById("modal-works");
    const modalEdit = document.getElementById("modal-edit");
    const closeModalButtons = document.querySelectorAll(".modal-close, #button, #arrow-return");
    const openModalButton = document.getElementById("edit-button");
    const addPhotoBtn = document.getElementById("modal-edit-add");
    const thumbnailGallery = document.querySelector(".modal-content");
    const form = document.getElementById("modal-edit-new-photo");
    const fileInput = document.getElementById("form-image");
    const titleInput = document.getElementById("form-title");
    const modal = document.getElementById('modal');
    const categorySelect = document.getElementById("form-category");

    const token = localStorage.getItem("authToken");

    //Fonction pour afficher la modale 
    function showModal() {
        modalOverlay.classList.remove("hide");
        modalOverlay.style.display = "flex";
        modalWorks.classList.remove("hide");
        console.log("Modal ouverte");
        loadThumbnails();
        loadCategories();
    }

    //Fonction pour cacher la modale 
    function hideModal() {
        modalOverlay.classList.add("hide");
        modalOverlay.style.display = "none";
        modalWorks.classList.add("hide");
        modalEdit.classList.add("hide");
        console.log("Modal fermée");
    }

//Ouvrir la modale 
if (openModalButton) {
    openModalButton.addEventListener("click", showModal);
} else {
    console.error("bouton ouverture modale introuvable");
}

    // Fermer la modal
    closeModalButtons.forEach(button => {
        button.addEventListener("click", hideModal);
    });

    // Passer à la modal d'ajout de photo
    addPhotoBtn.addEventListener("click", () => {
        modalWorks.classList.add("hide");
        modalEdit.classList.remove("hide");
    });

    // Charger les catégories dans le formulaire d'ajout
    async function loadCategories() {
        try {
            const response = await fetch("http://localhost:5678/api/categories");
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const categories = await response.json();
            categorySelect.innerHTML = ""; // Vider les catégories précédentes
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    }


    // Charger les miniatures dans la modal
    async function loadThumbnails() {
        try {
            const response = await fetch("http://localhost:5678/api/works");
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const works = await response.json();
            thumbnailGallery.innerHTML = ""; // Vider la galerie précédente
            works.forEach(work => {
                const img = document.createElement("img");
                img.src = work.imageUrl;
                img.alt = work.title;
                img.classList.add("thumbnail");
    
                img.addEventListener("click", () => {
                    if (confirm("Voulez-vous vraiment supprimer cette photo ?")) {
                        deleteWork(work.id);
                    }
                });
    
                thumbnailGallery.appendChild(img);
            });
        } catch (error) {
            console.error("Erreur lors du chargement des miniatures :", error);
        }
    }

    // Gérer l'ajout d'une nouvelle photo
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);
        formData.append("title", titleInput.value);
        formData.append("categoryId", categorySelect.value);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Photo ajoutée avec succès !");
                loadThumbnails(); // Recharger les miniatures après ajout
                modalWorks.classList.remove("hide");
                modalEdit.classList.add("hide");
            } else {
                console.error("Erreur lors de l'ajout de la photo.");
            }
        })
        .catch(error => console.error("Erreur:", error));
    });

    // Supprimer une photo
    function deleteWork(id) {
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                loadThumbnails(); // Recharger les miniatures après suppression
            } else {
                console.error("Erreur lors de la suppression de l'image.");
            }
        });
    }
})