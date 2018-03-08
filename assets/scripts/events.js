const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const filteredInputData = getFormFields(event.target)
  api.onRegister(filteredInputData)
    .then(ui.onSignUpSucess)
    .catch(ui.onSignUpFailure)
}

const onLogIn = function (event) {
  event.preventDefault()
  const filteredInputData = getFormFields(event.target)
  api.onSignIn(filteredInputData)
    .then(ui.onLogInSucess)
    .catch(ui.onLogInFailure)
}

const onLogOut = function (event) {
  event.preventDefault()
  api.onSignOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePw = function (event) {
  event.preventDefault()
  const filteredInputData = getFormFields(event.target)
  api.onPwChange(filteredInputData)
    .then(ui.onPwChangeSuccess)
    .catch(ui.onPwChangeFailure)
}

const onCreateNPC = function (event) {
  event.preventDefault()
  const filteredNPCData = getFormFields(event.target)
  api.createNewNPC(filteredNPCData)
    .then(ui.createNPCSuccess)
    .catch(ui.createNPCFailure)
}

const onViewNPCs = function (event) {
  event.preventDefault()
  api.getAllNPCs()
    .then(ui.viewAllNPCsSuccess)
    .catch(ui.viewAllNPCsFailure)
}

const onReturnToProfile = function (event) {
  event.preventDefault()
  ui.returnToProfile()
}

module.exports = {
  onSignUp,
  onLogIn,
  onLogOut,
  onChangePw,
  onCreateNPC,
  onViewNPCs,
  onReturnToProfile
}
