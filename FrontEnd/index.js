 async function getWorks() {
        const works = await fetch("http://localhost:5678/api/works")
        const worksJson = await works.json()
        console.log(worksJson)
        return worksJson
    }
    getWorks()    


async function displayWorks() {
    const arrayWorks = await getWorks
    arrayWorks.forEach((work) => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        img.src = work.images
        figcaption.textContent = work.title
        figure.classList.add("gallery")

        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    })
    
}

displayWorks()




