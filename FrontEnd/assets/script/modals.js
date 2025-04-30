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

//Fonction permettant l'ajout des projets à la modale sous forme de miniatures.
export async function displayProjectsInModal() {
  modalProjects.innerHTML = ''
  const projects = await getWorks()

  projects.forEach((projects) => {
    // Ajout d'une div pour contenir les miniatures et la corbeille.
    const modalThumbnailsTrash = document.createElement('div')
    modalThumbnailsTrash.classList.add('modal-thumbnails-trash')

    const modalElementImg = document.createElement('img')
    modalElementImg.src = projects.imageUrl
    modalElementImg.classList.add('modal-thumbnails')

    const modalTrash = document.createElement('i')
    modalTrash.classList.add('fa-solid', 'fa-trash-can')

    modalTrash.id = projects.id

    // Ajout des éléments dans la div "modalThumbnailsTrash"
    modalThumbnailsTrash.appendChild(modalElementImg)
    modalThumbnailsTrash.appendChild(modalTrash)

    // Ajout de la div "modalThumbnailsTrash" 
    modalProjects.appendChild(modalThumbnailsTrash)
  })
  deleteTrash()
}

export async function deleteProject(projectId) {
  const urlDelete = `http://localhost:5678/api/works/${projectId}`
  const response = await fetch(urlDelete, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  console.log('deleteResponse', response)
  console.log(token)

  if (response.ok) {
    console.log('Projet supprimé avec succès')
    // Mise à jour de la galerie
    gallery.innerHTML = ' '
    await projectsRecovery()

    // mise à jour de la modale
    modalProjects.innerHTML = ''
    await displayProjectsInModal()
  } else {
    console.log('Erreur lors de la suppression du projet')
  }
}
 

export function deleteTrash() {
  const modalTrash = document.querySelectorAll('.fa-trash-can')
  const modalTrashArray = Array.from(modalTrash)
  console.log('test corbeilles 1', modalTrashArray)

  modalTrash.forEach((modalTrash) => {
    modalTrash.addEventListener('click', () => {
      console.log(' je clique sur la corbeille')
      deleteProject(modalTrash.id)
      console.log('id des corbeilles', modalTrash.id)
    })
  })
}

// prévisualisation du projet ajouté
export function previewPicture(event) { 
  if (event.target.files && event.target.files[0]) {
    // L'objet filereader
    const reader = new FileReader() 
    // Ajout un écouteur d'événement pour le chargement du fichier
    reader.onload = function (event) { 
      imgPreview.src = event.target.result
 
      imgPreview.style.display = 'block'
      imgPreview.style.margin = 'auto'

      // Masquer les autres éléments
      const modalFirst = document.querySelector('.modal')
      const faImage = document.querySelector('.fa-image')
      const modalPicturesLabel = document.querySelector('#modalPictures-label')
      const uploadInput = document.querySelector('#uploadInput')
      const modalPicturesText = document.querySelector('.modalpictures-text')

      if (faImage) faImage.style.display = 'none'
      if (modalPicturesLabel) modalPicturesLabel.style.opacity = '0'
      if (modalPicturesText) modalPicturesText.style.display = 'none'
    }
    //Lecture du fichier d'image séléctionné
    reader.readAsDataURL(event.target.files[0])
  }
}

// Fonction pour afficher la modale d'ajout de projet
export async function categoriesModales() {
  // Récupération des catégories depuis l'API
  const url = 'http://localhost:5678/api/categories'
  fetch(url)
    .then((resp) => resp.json())
    .then((categories) => {
      const elementSelect = document.querySelector('#categorie-select')

      // Création d'une option par catégorie
      categories.forEach((category) => {
        const optionElement = document.createElement('option')
        optionElement.value = category.id
        optionElement.text = category.name
        elementSelect.appendChild(optionElement)
      })
    })
}

// ajout de projet
export async function addProject() {
  const elementTitle = document.querySelector('#form-title').value
  const elementCategory = document.querySelector('#categorie-select').value
  const elementFile = document.querySelector('#uploadInput').files[0]
  console.log(
    'récupérations des valeurs des champs :',
    elementTitle,
    elementCategory,
    elementFile
  )

  const formData = new FormData()
  formData.append('title', elementTitle)
  formData.append('category', elementCategory)
  formData.append('image', elementFile)

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Projet ajouté avec succès', data)
      projectsRecovery()
      displayProjectsInModal()
    } else {
      console.error(
        "Échec de l'ajout du projet. Statut HTTP :",
        response.status
      )
      // Afficher le message d'erreur si disponible
      const errorData = await response.json().catch(() => null)
      if (errorData) {
        console.error("Message d'erreur :", errorData.message || errorData)
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête :", error)
  }
}

export function btnValidateProject() {
  console.log('je rentre dans la fonction')
  const btnValidate = document.querySelector('#modalPictures-sub')
  const elementTitle = document.querySelector('#form-title')
  const elementFile = document.querySelector('#uploadInput')
  console.log('voilà mes éléments :', btnValidate, elementTitle, elementFile)

  // Réinitialiser la couleur à chaque appel de la fonction
  btnValidate.style.backgroundColor = '#b3b3b3'
  //champ requis pour la validation
  // et si le fichier est sélectionné
  if (
    elementTitle.value !== '' &&
    (elementFile.files.length > 0 || elementFile.value !== '')
  ) {
    console.log('changement btn valider')
    btnValidate.style.backgroundColor = '#1d6154' 
     // Changer la couleur du bouton
  } else {
    btnValidate.style.backgroundColor = '#b3b3b3'
  }
}
