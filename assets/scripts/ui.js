const store = require('./store')
const templateAllNPCs = require('./templates/npc-listing.handlebars')
const templatePersonalNPCs = require('./templates/personal-npc-listing.handlebars')
const templateSingleNPC = require('./templates/single-npc.handlebars')

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
  $('#universal-content-header').text(`${store.user.user_name}'s Profile`)
  $('#universal-content-header').show()
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
  $('#universal-content-header').hide()
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

const createNPCSuccess = function (apiResponse) {
  $('#create-npc-modal').modal('hide')
  $('#create-npc-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text(apiResponse.npc.name + ' was successfully created!')
  $('#universal-response-modal').modal('show')
}

const createNPCFailure = function (apiResponse) {
  $('#create-npc-modal').modal('hide')
  $('#create-npc-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text('Failed to create NPC. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you entered the data fields correctly!')
  $('#universal-response-modal').modal('show')
}

const viewAllNPCsSuccess = function (apiResponse) {
  $('#return-to-profile-button').show()
  $('#universal-content-header').text('All Public NPCs')
  $('#user-profile-page').hide()
  $('#get-npc-div').show()
  const allNPCReadoutHTML = templateAllNPCs({ npcs: apiResponse.npcs })
  $('#get-npc-div').append(allNPCReadoutHTML)
}

const viewAllNPCsFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to load NPCs. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
  $('#universal-response-modal').modal('show')
}

const viewPersonalNPCsSuccess = function (apiResponse) {
  $('#return-to-profile-button').show()
  $('#universal-content-header').text(store.user.user_name + '\'s NPCs')
  $('#user-profile-page').hide()
  $('#get-npc-div').show()
  const personalNPCArr = apiResponse.npcs.filter(function (npc) {
    return npc.user.email === store.user.email
  })
  const personalNPCReadout = templatePersonalNPCs({ npcs: personalNPCArr })
  $('#get-npc-div').append(personalNPCReadout)
}

const viewPersonalNPCsFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to load NPCs. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
  $('#universal-response-modal').modal('show')
}

const returnToProfile = function () {
  $('#return-to-profile-button').hide()
  $('#universal-content-header').text(`${store.user.user_name}'s Profile`)
  $('#get-npc-div').hide()
  $('#get-npc-div').empty()
  $('#user-profile-page').show()
}

const RetrieveNPCSuccess = function (apiResponse) {
  // start - set boolean value of var based on ownership for use in handlebars
  let ownership = false
  if (apiResponse.npc.user.email === store.user.email) {
    ownership = true
  }
  // end
  $('#single-npc-readout-modal-content').empty()
  $('#single-npc-readout-modal').modal('show')
  const singleNPCHTML = templateSingleNPC({ npc: apiResponse.npc, ownership: ownership })
  $('#single-npc-readout-modal-content').append(singleNPCHTML)
}

const RetrieveNPCFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to load NPC. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
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
  onPwChangeFailure,
  createNPCSuccess,
  createNPCFailure,
  viewAllNPCsSuccess,
  viewAllNPCsFailure,
  returnToProfile,
  viewPersonalNPCsSuccess,
  viewPersonalNPCsFailure,
  RetrieveNPCSuccess,
  RetrieveNPCFailure
}
