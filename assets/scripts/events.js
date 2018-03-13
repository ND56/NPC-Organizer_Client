const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const onSignUp = function (event) {
  event.preventDefault()
  const filteredInputData = getFormFields(event.target)
  if (filteredInputData.credentials.user_name === '') {
    ui.emptyUserNameField()
  } else {
    api.onRegister(filteredInputData)
      .then(ui.onSignUpSucess)
      .catch(ui.onSignUpFailure)
  }
}

const getSampleNPCData = function (element) {
  api.getAllNPCs()
    .then(ui.populateSampleNPCDataSuccess)
    .catch(ui.populateSampleNPCDataFailure)
}

const onLogIn = function (event) {
  event.preventDefault()
  const filteredInputData = getFormFields(event.target)
  api.onSignIn(filteredInputData)
    .then(ui.onLogInSucess)
    .catch(ui.onLogInFailure)
    .then(getSampleNPCData)
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
  console.log(event)
  console.log(event.target)
  const filteredNPCData = getFormFields(event.target)
  console.log(filteredNPCData)
  console.log(filteredNPCData.npc)
  // testing
  const privacySetting = $('#inputPrivacySetting').prop('checked')
  filteredNPCData.npc.private = privacySetting
  console.log(filteredNPCData.npc)
  // testing
  // adding front-end validation no blank Name
  // this isn't a great fix tho because someone might
  // access my API from somewhere else
  // I need to fix the back-end validation too
  if (filteredNPCData.npc.name === '') {
    ui.blankNPCNameField()
  } else if (filteredNPCData.npc.private === '') {
    ui.blankNPCPrivacyField()
  } else {
    api.createNewNPC(filteredNPCData)
      .then(ui.createNPCSuccess)
      .catch(ui.createNPCFailure)
      // Testing
      .then(getSampleNPCData)
      // testing
  }
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
  getSampleNPCData()
}

const onViewPersonalNPCs = function (event) {
  event.preventDefault()
  api.getAllNPCs()
    .then(ui.viewPersonalNPCsSuccess)
    .catch(ui.viewPersonalNPCsFailure)
}

const onViewLargeNPCReadout = function (event) {
  event.preventDefault()
  const npcIndexObj = $(event.target).data()
  const npcIndex = npcIndexObj.id
  api.retrieveNPC(npcIndex)
    .then(ui.RetrieveNPCSuccess)
    .catch(ui.RetrieveNPCFailure)
}

const onDeleteNPC = function (event) {
  event.preventDefault()
  const npcIndexObj = $(event.target).data()
  const npcIndex = npcIndexObj.id
  // Start - Storing npcIndex in store so ui can access
  // UI hides from DOM on deletion
  store.npcIndex = npcIndex
  // End
  api.deleteNPC(npcIndex)
    .then(ui.deleteNPCSucess)
    .catch(ui.deleteNPCFailure)
    // testing
    .then(getSampleNPCData)
}

const onEditNPC = function (event) {
  event.preventDefault()
  ui.populateNPCModal()
}

const onEditNPCSubmit = function (event) {
  event.preventDefault()
  const filteredNPCData = getFormFields(event.target)
  const privacySetting = $('#inputPrivacySetting').prop('checked')
  filteredNPCData.npc.private = privacySetting
  if (filteredNPCData.npc.name === '') {
    ui.blankNPCNameField()
  } else if (filteredNPCData.npc.private === '') {
    ui.blankNPCPrivacyField()
  } else {
    api.editNPC(filteredNPCData)
      .then(ui.editNPCSuccess)
      .catch(ui.editNPCFailure)
  }
}

const searchByAttribute = function (event) {
  event.preventDefault()
  ui.showNPCSearchField(event.target.value)
}

const onResetSearchModal = function (event) {
  event.preventDefault()
  ui.resetSearchModal()
}

const onSearchNPC = function (event) {
  event.preventDefault()
  // reset attribute input field
  $('#attribute-dropdown').val('Placeholder')
  // end
  store.ownership = $('#ownership-dropdown').val()
  const searchBy = $('#search-npc-label').text()
  const searchParams = $('#inputAttribute').val()
  console.log(searchBy)
  console.log(searchParams)
  console.log(store.ownership)
  // search by breakdown
  if (searchBy === 'Name') {
    api.searchNPCByName(searchParams)
      .then(ui.searchResultsSuccess)
      .catch(ui.searchResultsFailure)
  } else if (searchBy === 'Race') {
    api.searchNPCByRace(searchParams)
      .then(ui.searchResultsSuccess)
      .catch(ui.searchResultsFailure)
  } else if (searchBy === 'Class') {
    api.searchNPCByClass(searchParams)
      .then(ui.searchResultsSuccess)
      .catch(ui.searchResultsFailure)
  } else if (searchBy === 'Challenge Rating') {
    api.searchNPCByCR(searchParams)
      .then(ui.searchResultsSuccess)
      .catch(ui.searchResultsFailure)
  } else if (searchBy === 'Level') {
    api.searchNPCByLevel(searchParams)
      .then(ui.searchResultsSuccess)
      .catch(ui.searchResultsFailure)
  } else if (searchBy === 'Creator') {
    api.searchNPCByCreator(searchParams)
      .then(ui.searchResultsSuccess)
      .catch(ui.searchCreatorFailure)
  }
}

const onLikeOrDislikeNPC = function (event) {
  event.preventDefault()
  $('.like-npc').toggleClass('active')
  const likeButtonClassString = $('.like-npc').prop('class')
  const likeButtonClassArr = likeButtonClassString.split(' ')
  if (likeButtonClassArr.some(function (element) {
    return element === 'active'
  })) {
    api.createLike()
      .then(ui.addLikes)
  } else {
    api.deleteLike()
      .then(ui.subtractLikes)
  }
}

module.exports = {
  onSignUp,
  onLogIn,
  onLogOut,
  onChangePw,
  onCreateNPC,
  onViewNPCs,
  onReturnToProfile,
  onViewPersonalNPCs,
  onViewLargeNPCReadout,
  onDeleteNPC,
  onEditNPC,
  onEditNPCSubmit,
  searchByAttribute,
  onResetSearchModal,
  onSearchNPC,
  onLikeOrDislikeNPC
}
