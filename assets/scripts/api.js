const config = require('./config')
const store = require('./store')

const onRegister = function (filteredRegisterData) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: filteredRegisterData
  })
}

const onSignIn = function (filteredSignInData) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: filteredSignInData
  })
}

const onSignOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out',
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const onPwChange = function (filteredChangePwData) {
  return $.ajax({
    url: config.apiOrigin + '/change-password',
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: filteredChangePwData
  })
}

const createNewNPC = function (filteredNPCInfo) {
  return $.ajax({
    url: config.apiOrigin + '/npcs',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: filteredNPCInfo
  })
}

const getAllNPCs = function () {
  return $.ajax({
    url: config.apiOrigin + '/npcs',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const retrieveNPC = function (npcIndex) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/' + npcIndex,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteNPC = function (npcIndex) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/' + npcIndex,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editNPC = function (filteredNPCInfo) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/' + store.npc.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: filteredNPCInfo
  })
}

module.exports = {
  onRegister,
  onSignIn,
  onSignOut,
  onPwChange,
  createNewNPC,
  getAllNPCs,
  retrieveNPC,
  deleteNPC,
  editNPC
}
