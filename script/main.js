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

function main() {
  projectsRecovery()
  categories()
  verifyToken()
  displayProjectsInModal()
  categoriesModales()
}

main()

