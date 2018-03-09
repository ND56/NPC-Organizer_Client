'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./events')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  // $('#home-page').hide()
  $('#log-out-button').hide()
  $('#change-pw-button').hide()
  $('#return-to-profile-button').hide()
  $('#universal-content-header').hide()
  $('#user-profile-page').hide()
  $('#get-npc-div').hide()
  $('#npc-needs-name').hide()
  $('#npc-needs-privacy').hide()
  $('#user-needs-username').hide()
  $('#register-form').on('submit', events.onSignUp)
  $('#log-in-form').on('submit', events.onLogIn)
  $('#log-out-button').on('click', events.onLogOut)
  $('#change-pw-form').on('submit', events.onChangePw)
  $('#view-npcs').on('click', events.onViewNPCs)
  $('#view-personal-npcs').on('click', events.onViewPersonalNPCs)
  $('#return-to-profile-button').on('click', events.onReturnToProfile)
  $('body').on('click', '#view-large-npc', events.onViewLargeNPCReadout)
  $('body').on('click', '#delete-npc', events.onDeleteNPC)
  $('body').on('click', '#edit-npc', events.onEditNPC)
  $('body').on('submit', '#edit-npc-form', events.onEditNPCSubmit)
  $('body').on('submit', '#create-npc-form', events.onCreateNPC)
})
