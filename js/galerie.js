const galerieImages = document.getElementById('allImages')

const images = [
    { titre: "Lasagnes à la bolognese", url: "/img/lasagnes.jpg" },
    { titre: "Pasta pesto", url: "/img/pastaPesto.jpg" },
    { titre: "Saumon grillé", url: "/img/saumon.png" },
    { titre: "Feuilleté framboise, creme vannille", url: "/img/feuilleteDessert.jpg" },
    { titre: "Tartare de poulpe", url: "/img/tartare.jpg" },
    { titre: "Plat végé", url: "/img/veggieBowl.jpg" },

]

function sanitizeHtml(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function getImage(titre, urlImage) {
    titre = sanitizeHtml(titre)
    urlImage = sanitizeHtml(urlImage)
    return `
    <div class="col p-3">
        <div class="image-card text-white">
            <img src="${urlImage}" class="w-100 rounded" alt="Image: ${titre}">
            <p class="titre-image">${titre}</p>
            <div class="action-image-buttons" data-show="admin">
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#editionPhotoModal" data-image-title="${titre}" data-image-url="${urlImage}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#deletePhotoModal" data-image-title="${titre}" data-image-url="${urlImage}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
    `
}

galerieImages.innerHTML = images.map(img => getImage(img.titre, img.url)).join('')

const editionModal = document.getElementById('editionPhotoModal')
editionModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const titre = button.getAttribute('data-image-title')
    editionModal.querySelector('#namePhotoInput').value = titre
})

const deleteModal = document.getElementById('deletePhotoModal')
deleteModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const titre = button.getAttribute('data-image-title')
    const url = button.getAttribute('data-image-url')

    deleteModal.querySelector('#namePhotoInput').value = titre
    deleteModal.querySelector('img').src = url
    deleteModal.querySelector('img').alt = `Image: ${titre}`
})
