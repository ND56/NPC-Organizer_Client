const store = require('./store')

const onSignUpSucess = function (apiResponse) {
  $('#register-modal').modal('hide')
  $('#register-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('Your registration was a success, ' + apiResponse.user.user_name + '. Welcome to the delightfully organized world of NPC management!')
  $('#universal-response-modal').modal('show')
}

const onSignUpFailure = function (apiResponse) {
  $('#register-modal').modal('hide')
  $('#register-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('Your registration was a failure. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'re using a unique email address and that your password entries match!')
  $('#universal-response-modal').modal('show')
}

const onLogInSucess = function (apiResponse) {
  store.user = apiResponse.user
  $('#log-in-modal').modal('hide')
  $('#log-in-form').each(function () {
    this.reset()
  })
  $('#home-page').hide()
  $('#log-in-button').hide()
  $('#register-button').hide()
  $('#user-profile-header').text(`${apiResponse.user.user_name}'s Profile`)
  $('#user-profile-header').show()
  $('#user-profile-page').show()
  $('#log-out-button').show()
}

const onLogInFailure = function (apiResponse) {
  $('#log-in-modal').modal('hide')
  $('#log-in-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('Failed to log in. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'ve already registered and have entered your email and password correctly!')
  $('#universal-response-modal').modal('show')
}

module.exports = {
  onSignUpSucess,
  onSignUpFailure,
  onLogInSucess,
  onLogInFailure
}
