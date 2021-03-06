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

const searchNPCByName = function (params) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/search-by-name',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'npc': {
        'name': params
      }
    }
  })
}

const searchNPCByRace = function (params) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/search-by-race',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'npc': {
        'race': params
      }
    }
  })
}

const searchNPCByClass = function (params) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/search-by-class',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'npc': {
        'dnd_class': params
      }
    }
  })
}

const searchNPCByCR = function (params) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/search-by-challenge-rating',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'npc': {
        'challenge_rating': params
      }
    }
  })
}

const searchNPCByLevel = function (params) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/search-by-level',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'npc': {
        'level': params
      }
    }
  })
}

const searchNPCByCreator = function (params) {
  return $.ajax({
    url: config.apiOrigin + '/npcs/search-by-creator',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'credentials': {
        'user_name': params
      }
    }
  })
}

const createLike = function () {
  return $.ajax({
    url: config.apiOrigin + '/likes',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'like': {
        'user_id': store.user.id,
        'npc_id': store.npc.id
      }
    }
  })
}

const deleteLike = function () {
  return $.ajax({
    url: config.apiOrigin + '/likes/destroy',
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'like': {
        'npc_id': store.npc.id
      }
    }
  })
}

const indexFolders = () => {
  return $.ajax({
    url: config.apiOrigin + '/folders',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createFolder = (folderData) => {
  return $.ajax({
    url: config.apiOrigin + '/folders',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: folderData
  })
}

const deleteFolder = function (folderId) {
  return $.ajax({
    url: config.apiOrigin + '/folders/' + folderId,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getFolder = function (folderId) {
  return $.ajax({
    url: config.apiOrigin + '/folders/' + folderId,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const submitFolderEdit = (folderData) => {
  return $.ajax({
    url: config.apiOrigin + '/folders/' + store.currentFolder.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: folderData
  })
}

const saveToFolder = (folderId, npcId) => {
  return $.ajax({
    url: config.apiOrigin + '/saves',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'safe': {
        'folder_id': folderId,
        'npc_id': npcId
      }
    }
  })
}

const removeFromFolder = (folderId, npcId) => {
  return $.ajax({
    url: config.apiOrigin + '/saves/destroy',
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'safe': {
        'folder_id': folderId,
        'npc_id': npcId
      }
    }
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
  editNPC,
  searchNPCByName,
  searchNPCByRace,
  searchNPCByClass,
  searchNPCByCR,
  searchNPCByLevel,
  searchNPCByCreator,
  createLike,
  deleteLike,
  indexFolders,
  createFolder,
  deleteFolder,
  getFolder,
  submitFolderEdit,
  saveToFolder,
  removeFromFolder
}
