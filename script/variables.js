//Récupération de l'élément du DOM qui contiendra les projets
export const gallery = document.querySelector('.gallery')

// Récupération du token via le localstorage
export const token = localStorage.getItem('authToken')
console.log('test local storage', token)

//Récupération de l'élément du DOM qui contiendra la prévisualisation du projet
export const imgPreview = document.querySelector('#img-preview')

// Récupération de l'élément du DOM qui contiendra les projets dans la modale
export const modalProjects = document.querySelector('.modal-gallery')

// Récupération de l'élément du DOM qui contiendra le formulaire de la modale
export const form = document.querySelector('.modalPictures-form')

// Récupération de l'élément du DOM qui contiendra les boutons
export const filters = document.querySelector('.filters')
