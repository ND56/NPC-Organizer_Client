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
  $('#universal-response-modal-content').text('Welcome, ' + apiResponse.user.user_name + '. On behalf of DMs everywhere, thanks for your solemn commitment to organized NPC management!')
  $('#universal-response-modal').modal('show')
  $('#user-profile-header').text(`${apiResponse.user.user_name}'s Profile`)
  $('#user-profile-header').show()
  $('#user-profile-page').show()
  $('#log-out-button').show()
  $('#change-pw-button').show()
}

const onLogInFailure = function (apiResponse) {
  $('#log-in-modal').modal('hide')
  $('#log-in-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('Failed to log in. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'ve already registered and have entered your email and password correctly!')
  $('#universal-response-modal').modal('show')
}

const onSignOutSuccess = function (apiResponse) {
  $('#user-profile-header').hide()
  $('#user-profile-page').hide()
  $('#log-out-button').hide()
  $('#change-pw-button').hide()
  $('#home-page').show()
  $('#log-in-button').show()
  $('#register-button').show()
  $('#universal-response-modal-content').text('See ya next time!')
  $('#universal-response-modal').modal('show')
}

const onSignOutFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to log out. The server responded with with error code: ' + apiResponse.status + ':, ' + apiResponse.statusText + '. The server might be down at the moment. Try again later!')
  $('#universal-response-modal').modal('show')
}

const onPwChangeSuccess = function (apiResponse) {
  $('#change-pw-modal').modal('hide')
  $('#change-pw-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('Your password was successfully updated, ' + store.user.user_name + '!')
  $('#universal-response-modal').modal('show')
}

const onPwChangeFailure = function (apiResponse) {
  $('#change-pw-modal').modal('hide')
  $('#change-pw-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('You failed to change your password, ' + store.user.user_name + '. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you entered your old password correctly!')
  $('#universal-response-modal').modal('show')
}

module.exports = {
  onSignUpSucess,
  onSignUpFailure,
  onLogInSucess,
  onLogInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onPwChangeSuccess,
  onPwChangeFailure
}
