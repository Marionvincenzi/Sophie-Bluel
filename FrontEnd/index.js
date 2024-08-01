const worksUrl = "http://localhost:5678/api/works";
const urlCategories ="https//localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

async function getWorks() {
     await fetch (worksUrl)
     .then (response => response.json());
     console.log(response);
     .then (dataWorks => {
     const imagesUrl = dataWorks.map (work => work.imagesUrl);
     const title = dataWorks.map (work => work.title);
     gallery.innerHTML = "";
    for (let i = 0; imagesUrl.length; i++); {
    const figureTag = document.createElement("figure");
    const imagesTags = document.createElement("img");
    const figcaptionTitle = document.createElement("figcaption");

    figureTag.classList.add("works");
    imagesTags.src = imagesUrl[i];
    figcaptionTitle.innerText = title[i];

    figureTag.appendChild(imagesTags);
    figureTag.appendChild(figcaptionTitle);
    gallery.appendChild(figureTag);
    console.log(response);
            


        }
    })
    .catch (error => console.error ("erreur récupération des données"));
    };
getWorks();


    async function displayWorks() {
     const arrayWorks = await getWorks
     const gallery = document.querySelector(".gallery")

    function createWorks(work) {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")

         img.src = work.images
        figcaption.textContent = work.title
         figure.classList.add("gallery-item")

         figure.appendChild(img)
         figure.appendChild(figcaption)
         gallery.appendChild(figure)
     }
    
 }

 displayWorks()

 function getCategories(response) {
     const response = fetch ("https//localhost:5678/api/categories");
     console.log(response);
     return response
 }
 getCategories()

 const categoriesButton = async () => {
     const categories = await getCategories()
 }

 categories.forEach(category => {
    const btn = document.createElement("button")
    btn.textContent = category.name.toUpperCase()
    btn.id = category.id
    btn.className = "filtersbutton"
    filters.appendChild(btn)
    
 });







