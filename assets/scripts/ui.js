const store = require('./store')
const templateAllNPCs = require('./templates/npc-listing.handlebars')
const templatePersonalNPCs = require('./templates/personal-npc-listing.handlebars')
const templateSingleNPC = require('./templates/single-npc.handlebars')

const onSignUpSucess = function (apiResponse) {
  $('#user-needs-username').hide()
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
  if (apiResponse.responseText === '{"password_confirmation":["doesn\'t match Password"]}') {
    $('#universal-response-modal-content').text('Welp, this is embarrassing, registration failed due to mismatching password entries. Try again, you can do it!')
    $('#universal-response-modal').modal('show')
  } else if (apiResponse.responseText === '{"email":["has already been taken"]}') {
    $('#universal-response-modal-content').text('Registration failed because that email is already registered! Use another!')
    $('#universal-response-modal').modal('show')
  } else if (apiResponse.responseText === '{"user_name":["has already been taken"]}') {
    $('#universal-response-modal-content').text('Woops, that Username has already been chosen! Pick another!')
    $('#universal-response-modal').modal('show')
  } else if (apiResponse.responseJSON.exception === '#<ArgumentError: An object with the method #include? or a proc, lambda or symbol is required, and must be supplied as the :in (or :within) option of the configuration hash>') {
    $('#universal-response-modal-content').text('Registration failed. You must pick a sweet Username that we\'ll tag your NPCs with!')
    $('#universal-response-modal').modal('show')
  } else {
    $('#universal-response-modal-content').text('Your registration was a failure. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'re using a unique email address and that your password entries match!')
    $('#universal-response-modal').modal('show')
  }
  console.log(apiResponse)
  console.log(apiResponse.responseJSON.exception)
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
  console.log(apiResponse)
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
  $('#npc-needs-name').hide()
  $('#npc-needs-privacy').hide()
  $('#create-npc-modal').modal('hide')
  $('#create-npc-form').each(function () {
    this.reset()
  })
  $('#universal-response-modal-content').text(apiResponse.npc.name + ' was successfully created!')
  $('#universal-response-modal').modal('show')
  console.log(apiResponse)
}

const createNPCFailure = function (apiResponse) {
  $('#create-npc-modal').modal('hide')
  $('#create-npc-form').each(function () {
    this.reset()
  })
  if (apiResponse.responseText === '{"name":["has already been taken"]}') {
    $('#universal-response-modal-content').text('Uh oh, that NPC name has already been chosen! Pick another!')
    $('#universal-response-modal').modal('show')
  } else {
    $('#universal-response-modal-content').text('Failed to create NPC. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you entered the data fields correctly!')
    $('#universal-response-modal').modal('show')
  }
  console.log(apiResponse.responseText)
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
  store.npc = apiResponse.npc
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

const deleteNPCSucess = function (apiResponse) {
  $('#single-npc-readout-modal').modal('hide')
  $('#universal-response-modal-content').text('Deletion successful! Now make something better!')
  $('#universal-response-modal').modal('show')
  $("div[data-id='1-" + store.npcIndex + "']").hide()
}

const deleteNPCFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to delete NPC. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
  $('#universal-response-modal').modal('show')
}

const populateNPCModal = function () {
  $('#single-npc-readout-modal').modal('hide')
  $('#npc-modal-button').text('Edit NPC')
  $('#create-npc-modal').modal('show')
  $('#create-npc-form').prop('id', 'edit-npc-form')
  $('#inputName').val(store.npc.name)
  $('#inputRace').val(store.npc.race)
  $('#inputClass').val(store.npc.dnd_class)
  $('#inputChallengeRating').val(store.npc.challenge_rating)
  $('#inputStatHP').val(store.npc.HP)
  $('#inputStatAC').val(store.npc.AC)
  $('#inputStatsAbMods').val(store.npc.ability_modifiers)
  $('#inputStatsSpellsAbilities').val(store.npc.spells_abilities)
  $('#inputStatsItems').val(store.npc.items)
  $('#inputStatsLevel').val(store.npc.level)
  $('#inputTraits').val(store.npc.traits)
  $('#inputNotes').val(store.npc.notes)
  $('#inputPrivacySetting').val(store.npc.private)
}

const editNPCSuccess = function (apiResponse) {
  store.npc = apiResponse.npc
  // reset form for use in create npc
  $('#npc-needs-name').hide()
  $('#npc-needs-privacy').hide()
  $('#edit-npc-form').each(function () {
    this.reset()
  })
  $('#edit-npc-form').prop('id', 'create-npc-form')
  $('#npc-modal-button').text('Create NPC!')
  $('#create-npc-modal').modal('hide')
  // reset form for use in create npc
  $('#universal-response-modal-content').text('Edit successful!')
  $('#universal-response-modal').modal('show')
  // immediately reflect edits in DOM
  $("span[data-id='name-" + store.npc.id + "']").text(store.npc.name)
  $("span[data-id='race-" + store.npc.id + "']").text(store.npc.race)
  $("span[data-id='dnd-class-" + store.npc.id + "']").text(store.npc.dnd_class)
  $("span[data-id='CR-" + store.npc.id + "']").text(store.npc.challenge_rating)
  $("span[data-id='user-" + store.npc.id + "']").text(store.npc.user.user_name)
}

const editNPCFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to edit NPC. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. Make sure you\'re inputing the correct data!')
  $('#universal-response-modal').modal('show')
}

const blankNPCNameField = function () {
  $('#npc-needs-name').show()
}

const blankNPCPrivacyField = function () {
  $('#npc-needs-privacy').show()
}

const emptyUserNameField = function () {
  $('#user-needs-username').show()
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
  RetrieveNPCFailure,
  deleteNPCSucess,
  deleteNPCFailure,
  populateNPCModal,
  editNPCSuccess,
  editNPCFailure,
  blankNPCNameField,
  blankNPCPrivacyField,
  emptyUserNameField
}
