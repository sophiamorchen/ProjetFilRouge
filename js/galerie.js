const galerieImages = document.getElementById('allImages')

// récupérer les informations des images
let titre = ''
let imgSource = ""
let monImage = getImage(titre, imgSource)

galerieImages.innerHTML = monImage

function getImage(titre, urlImage) {
    titre = sanitizeHtml(titre)
    urlImage = sanitizeHtml(urlImage)
    return `
    <div class="col p-3">
        <div class="image-card text-white">
            <img src="${urlImage}" class="w-100 rounded" alt="portion de lasagne sur assiette">
            <p class="titre-image">t${titre}</p>
            <div class="action-image-buttons" data-show="admin">
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#editionPhotoModal"><i
                        class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#deletePhotoModal"><i
                        class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
    `
}