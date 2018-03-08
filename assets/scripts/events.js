const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const filteredInputData = getFormFields(event.target)
  api.onRegister(filteredInputData)
    .then(ui.onSignUpSucess)
    .catch(ui.onSignUpFailure)
  // api.create(data)
  //   .then(ui.onSignUpSuccess)
  //   .catch(ui.onSignUpFailure)
  // $('#register-form').each(function () {
  //   this.reset()
  // })
}

module.exports = {
  onSignUp
}
