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
  $('#get-all-npc-div').hide()
  $('#register-form').on('submit', events.onSignUp)
  $('#log-in-form').on('submit', events.onLogIn)
  $('#log-out-button').on('click', events.onLogOut)
  $('#change-pw-form').on('submit', events.onChangePw)
  $('#create-npc-form').on('submit', events.onCreateNPC)
  $('#view-npcs').on('click', events.onViewNPCs)
  $('#return-to-profile-button').on('click', events.onReturnToProfile)
})
