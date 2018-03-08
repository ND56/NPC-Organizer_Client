'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./events')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  $('#log-out-button').hide()
  $('#user-profile-header').hide()
  $('#user-profile-page').hide()
  $('#register-form').on('submit', events.onSignUp)
  $('#log-in-form').on('submit', events.onLogIn)
})
