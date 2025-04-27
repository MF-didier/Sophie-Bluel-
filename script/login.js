/****** Variables Globales******/

// Récupération de l'input "Submit"
const inputSubmit = document.querySelector('#btn-login')

/****** Les Fonctions******/

// Gestion de la connexion
function login() {
  console.log('lecture fonction login')
  // contacte de l'api.
  const apiUrl = 'http://localhost:5678/api/users/login' 
  // Récupération de l'input "Email"
  const email = document.querySelector('#email').value
  // Récupération de l'input "Password"
  const password = document.querySelector('#password').value
  console.log('email', email)
  const data = {
    email: email,
    password: password,  
    
  }

  //Configuration de requête HTTP
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  //Appel de l'API
  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          'Les informations utilisateur/mot de passe ne sont  pas correctes'
        )
      }
      return response.json()
    })

    .then((authUser) => {
      //Stockage de L'ID et du token de l'utilisateur.
      console.log('authUser', authUser)
      const userId = authUser.userId
      const authToken = authUser.token
      localStorage.setItem('userId', userId)
      localStorage.setItem('authToken', authToken)
      localStorage.setItem('connected', 'true')
 
      console.log('userId', userId)
      console.log('authToken', authToken)

      //Redirection vers la page d'accueil
      window.location.href = '/FrontEnd/index.html'
    })

    .catch((error) => {
      alert(
        'Erreur de connexion, merci de vérifier vos identifiants de connexion.'
      )
    })
}

/******Gestionnaire d'événements ******/
if (inputSubmit) {
  inputSubmit.addEventListener('click', (event) => {
    event.preventDefault() // Empêche le formulaire de se soumettre
    login() // Appelle la fonction login lorsque le bouton est cliqué
  })
}
