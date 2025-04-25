import {
  gallery,
  token,
  imgPreview,
  modalProjects,
  form,
  filters,
} from './variables.js'

import { initEventListeners } from './events.js'
initEventListeners()

/****** Test de récupération des projets******/

// export async function test() {
//   const url = "http://localhost:5678/api/works";
//   fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => console.log(data));
// }
// test();

/******Les Fonctions******/

// Récupération des projets depuis l'API et affichage de ces derniers sans filtrage.
export async function projectsRecovery() {
  gallery.innerHTML = ''
  const url = 'http://localhost:5678/api/works'
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)

      data.forEach((projects) => {
        //Création d'une balise dédié à un projet
        const figureElement = document.createElement('figure')
        // // Création des balises
        const imageElement = document.createElement('img')
        imageElement.src = projects.imageUrl
        const captionElement = document.createElement('figcaption')
        captionElement.innerText = projects.title
        //Rattachement de la balise "figure" à la div "gallery".
        gallery.appendChild(figureElement)
        // Rattachement des balises "img" et "figcaption" à l'élément "figure".
        figureElement.appendChild(imageElement)
        figureElement.appendChild(captionElement)
      })
    })
}

// Création des boutons de filtrage.
export async function categories() {
  // Récupération des catégories depuis l'API
  const url = 'http://localhost:5678/api/categories'
  fetch(url)
    .then((resp) => resp.json())
    .then((category) => {
      category.forEach((projectsFilters) => {
        console.log(projectsFilters)

        // Génération des boutons
        const button = document.createElement('button')
        button.classList.add('btnFilters')
        button.id = projectsFilters.id
        button.innerText = projectsFilters.name
        filters.appendChild(button)
      })
    })
}

export async function getWorks() {
  const requete = await fetch('http://localhost:5678/api/works')
  return requete.json()
}

// Fonction qui crée les projets de façon individuels en fonction de la catégorie.
export function createWork(work) {
  //Récupératiuon de l'élément du DOM qui contiendra les projets
  const gallery = document.querySelector('.gallery')
  //Création d'une balise dédié à un projet
  const figureElement = document.createElement('figure')
  // const projects = data[i]; //Permet de récupérer les projets un a un
  // Création des balises
  const imageElement = document.createElement('img')
  imageElement.src = work.imageUrl
  const captionElement = document.createElement('figcaption')
  captionElement.innerText = work.title
  // Rattachement des balises "img" et "figcaption" à l'élément "figure".
  figureElement.appendChild(imageElement)
  figureElement.appendChild(captionElement)
  //Rattachement de la balise figure à la div "gallery".
  gallery.appendChild(figureElement)
}

// Affichage des éléments de modifications si token correct
export function verifyToken() {
  const isTokenValid = localStorage.getItem('connected') === 'true'
  const elementEditing = document.querySelector('.editing')
  const elementModal = document.querySelector('.btn-Modal-Link')
  const elementBtnFilters = document.querySelector('.filters')
  const loginLink = document.querySelector('#login')
  const logoutLink = document.querySelector('#logout')
  console.log('test des éléments', elementEditing, elementModal, login, logout)
  if (!elementModal) {
    console.error("L'élément modal-link n'a pas été trouvé dans le DOM.")
  }

  console.log('valeur du token', isTokenValid)
  if (isTokenValid) {
    console.log('Token valide, ajout de la classe display-on')
    //Affichage des éléments du mode édition
    elementEditing.style.display = 'flex'
    elementModal.style.display = 'flex'
    //Masque le lien login et affiche le lien logout
    if (loginLink) loginLink.style.display = 'none'
    if (logoutLink) logoutLink.style.display = 'block'
    if (elementBtnFilters) elementBtnFilters.style.visibility = 'hidden'
  } else {
    elementEditing.style.display = 'none'
    elementModal.style.display = 'none'
    // Masque le lien logout et affiche le lien login
    if (loginLink) loginLink.style.display = 'block'
    if (logoutLink) logoutLink.style.display = 'none'
    if (elementBtnFilters) elementBtnFilters.style.visibility = 'visible'
  }

  return isTokenValid
}

//Permet la déconnexion de l'utilisateur
export function logoutUser() {
  console.log('Déconnexion en cours...')
  localStorage.removeItem('authToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('connected')
  console.log('Après suppression authToken:', localStorage.getItem('authToken'))

  // Masquage des éléments du mode édition
  const elementEditing = document.querySelector('.editing')
  const elementModal = document.querySelector('.modal-link')

  if (elementEditing) {
    console.log('Masquer élément editing')
    elementEditing.style.display = 'none'
  }

  if (elementModal) {
    console.log('masquer élément modal-link')
    elementModal.style.display = 'none'
  }
  console.log('Fin de la déconnexion')
}
