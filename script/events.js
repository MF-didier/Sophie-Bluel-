import {
  gallery,
  token,
  imgPreview,
  modalProjects,
  form,
  filters,
} from './variables.js'

import {
  projectsRecovery,
  categories,
  getWorks,
  createWork,
  verifyToken,
  logoutUser,
} from './app.js'

import {
  displayProjectsInModal,
  deleteProject,
  deleteTrash,
  previewPicture,
  categoriesModales,
  addProject,
  btnValidateProject,
} from './modals.js'

/****** Gestionnaires d'événements******/

export function initEventListeners() {
  //Réinitialisation de la gallerie via le bouton Tous.
  // Mise en place du filtrage des projets via les boutons.
  filters.addEventListener('click', function (event) {
    const idValue = event.target.id

    // Vérification si le bouton "Tous" est cliqué.
    if (idValue === 'all') {
      // Affichage de tous les projets.
      gallery.innerHTML = ''
      projectsRecovery()
    } else {
      //affichage des projets en fonction de la catégorie sélectionnée.
      gallery.innerHTML = ''
      getWorks().then((works) => {
        works.forEach((work) => {
          if (idValue == work.categoryId) {
            createWork(work)
          }
        })
      })
    }
  })

  //Récupération de l'élément du DOM pour le lien "logout"
  const logoutLink = document.getElementById('logout')
  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      console.log('clic sur logout')
      event.preventDefault()
      logoutUser()
      verifyToken()
    })
  }

  // Récupération de l'élément du DOM pour afficher la première modale.
  const modalLink = document.querySelector('.btn-Modal-Link')
  modalLink.addEventListener('click', () => {
    const modalContainer = document.querySelector('.modal-container')
    modalContainer.classList.add('active')
  })

  // Récupération des éléments du DOM pour masquer la première modale
  const modalOverlay = document.querySelector('.modal-overlay')
  const modalClose = document.querySelector('.modal-close')

  modalOverlay.addEventListener('click', () => {
    const modalContainer = document.querySelector('.modal-container')
    modalContainer.classList.remove('active')
  })

  modalClose.addEventListener('click', () => {
    const modalContainer = document.querySelector('.modal-container')
    modalContainer.classList.remove('active')
  })

  // Récupération de l'élément du DOM pour afficher la seconde modale.
  const modalBtn = document.querySelector('.modal-btn')
  modalBtn.addEventListener('click', () => {
    const modalPictures = document.querySelector('.modalPictures')
    modalPictures.style.display = 'flex'
  })

  // Récupération des éléments du DOm pour masquer la seconde modale.
  const modalPicturesClose = document.querySelector('.modalPictures-close')
  modalPicturesClose.addEventListener('click', () => {
    const modalPictures = document.querySelector('.modalPictures')
    modalPictures.style.display = 'none'

    const modalContainer = document.querySelector('.modal-container')
    modalContainer.classList.remove('active')
  })

  // Récupération de l'élément flèche de la seconde modale pour faire un retour sur la première modale.
  const arrow = document.querySelector('.modalPictures-arrow')
  arrow.addEventListener('click', () => {
    const modalPictures = document.querySelector('.modalPictures')
    modalPictures.style.display = 'none'
  })

  // Récupération de l'élément d'entrée de fichier (input type="file")
  const fileInput = document.querySelector('#uploadInput')
  fileInput.addEventListener('change', previewPicture)

  // Gestionnaire d'événement pour l'ajout d'un projet
  console.log('test de form :', form)
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('submit ok')
    addProject()
  })

  // Ecouteurs d'événement sur les différents champs du formualire avant validation

  // Ajouter un gestionnaire d'événement clic à l'image pour la supprimer
  imgPreview.addEventListener('click', function () {
    // Réinitialiser l'élément d'aperçu
    imgPreview.src = ''
    imgPreview.style.display = 'none'

    // Effacer la valeur de l'entrée de fichier
    if (uploadInput) {
      uploadInput.value = ''
    }

    // Afficher à nouveau les éléments masqués
    if (faImage) faImage.style.display = 'block'
    if (modalPicturesLabel) modalPicturesLabel.style.opacity = '1'
    if (modalPicturesText) modalPicturesText.style.display = 'block'

    // Supprimer le gestionnaire d'événement clic de l'image
    imgPreview.removeEventListener('click', clickToRemove)
  })

  // Gestionnaire d'événement pour l'ajout d'un projet
  form.addEventListener('input', () => {
    console.log('input valider')
    btnValidateProject()
  })
}
