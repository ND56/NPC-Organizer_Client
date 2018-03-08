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
  $('#user-profile-header').hide()
  $('#user-profile-page').hide()
  $('#register-form').on('submit', events.onSignUp)
  $('#log-in-form').on('submit', events.onLogIn)
  $('#log-out-button').on('click', events.onLogOut)
  $('#change-pw-form').on('submit', events.onChangePw)
  $('#create-npc-form').on('submit', events.onCreateNPC)
})
