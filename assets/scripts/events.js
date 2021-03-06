const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')
const templatePDF = require('./templates/single-npc-for-pdf.handlebars')

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

const onClickCreate = function (event) {
  event.preventDefault()
  $('#npc-needs-name').hide()
  $('#npc-needs-privacy').hide()
  $('#edit-npc-form').each(function () {
    this.reset()
  })
  $('#create-npc-form').each(function () {
    this.reset()
  })
  $('#edit-npc-form').prop('id', 'create-npc-form')
  $('#npc-modal-button').text('Create NPC!')
  $('#create-npc-modal').modal('show')
}

const onCreateNPC = function (event) {
  event.preventDefault()
  const filteredNPCData = getFormFields(event.target)
  // testing
  const privacySetting = $('#inputPrivacySetting').prop('checked')
  filteredNPCData.npc.private = privacySetting
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
  // storing values for DOM manipulation
  store.searched_attribute = searchBy
  store.search_limitation = store.ownership
  store.search_npc_input = searchParams
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
  // Testing need to update DOM
  getSampleNPCData()
  // testing
}

const exportToPDF = (event) => {
  event.preventDefault()
  // clear div
  $('#hidden-table-for-pdf').empty()
  // create html element to use for PDF
  const pdfHTML = templatePDF({ npc: store.npc })
  $('#hidden-table-for-pdf').append(pdfHTML)
  // create pdf
  const doc = new jsPDF()
  // set source for pdf
  const source = $('#hidden-table-for-pdf')
  // ignore buttons in the html
  const elementHandler = {
    '#readout-edit-button': function (element, renderer) {
      return true
    },
    '#delete-npc': function (element, renderer) {
      return true
    },
    '#readout-like-button': function (element, renderer) {
      return true
    },
    '#export-pdf-1': function (element, renderer) {
      return true
    },
    '#export-pdf-2': function (element, renderer) {
      return true
    }
  }
  // trying to style the pdf
  const nameHeader = $('.single-header')[0]
  nameHeader.setAttribute('style', 'margin-bottom:50px')
  // append and format html readout
  doc.fromHTML(
    source[0],
    45, // moving content from the left // was 40
    15, // moves content from the top
    {
      'width': 100,
      'elementHandlers': elementHandler
    },
    function () {
      doc.save(store.npc.name + '.pdf')
    }
  )
}

const onViewFolders = (event) => {
  event.preventDefault()
  api.indexFolders()
    .then(ui.viewFoldersSuccess)
    .catch(ui.viewFoldersFailure)
}

const onCreateFolder = (event) => {
  event.preventDefault()
  const folderData = getFormFields(event.target)
  // get all folders to check titles
  api.indexFolders()
    .then(apiResponse => { store.folders = apiResponse.folders })
    .then(other => {
      // only allow if user doesn't already have a folder with that name
      if (!store.folders.some(element => element.title === folderData.folder.title)) {
        api.createFolder(folderData)
          .then(ui.createFolderSuccess)
          .catch(ui.createFolderFailure)
      } else {
        ui.folderExists(folderData.folder.title)
      }
    })
    .catch(ui.createFolderFailure)
}

const onDeleteFolder = (event) => {
  event.preventDefault()
  // Selecting a fontawesome SVG image in the DOM is tricky; depending on where
  // you click, roughly 50% of the time you actually click the child of the
  // element, which is a path element. I got around this by using the below
  // conditional.
  let folderId
  if ($(event.target).data().delete) {
    folderId = $(event.target).data().delete
  } else {
    folderId = $(event.target).parent().data().delete
  }
  // storing for purposes of DOM manipulation
  store.deletedFolder = folderId
  // API call
  api.deleteFolder(folderId)
    .then(ui.deleteFolderSuccess)
    .catch(ui.deleteFolderFailure)
}

const onEditFolder = (event) => {
  event.preventDefault()
  // Selecting a fontawesome SVG image in the DOM is tricky; depending on where
  // you click, roughly 50% of the time you actually click the child of the
  // element, which is a path element. I got around this by using the below
  // conditional.
  let folderId
  if ($(event.target).data().edit) {
    folderId = $(event.target).data().edit
  } else {
    folderId = $(event.target).parent().data().edit
  }
  // get folder information from API & store it
  api.getFolder(folderId)
    .then(ui.editFolderModal)
    .catch(ui.getFolderFailure)
}

const onSubmitEdit = (event) => {
  event.preventDefault()
  const folderTitle = getFormFields(event.target)
  // get all folders to check titles
  api.indexFolders()
    .then(apiResponse => { store.folders = apiResponse.folders })
    .then(other => {
      // allow if the new name is the same as the current name
      if (store.currentFolder.title === folderTitle.folder.title) {
        api.submitFolderEdit(folderTitle)
          .then(ui.editFolderSuccess)
          .catch(ui.editFolderFailure)
      // allow if user doesn't already have a folder with that name
      } else if (!store.folders.some(element => element.title === folderTitle.folder.title)) {
        api.submitFolderEdit(folderTitle)
          .then(ui.editFolderSuccess)
          .catch(ui.editFolderFailure)
      // disallow in all other cases
      } else {
        ui.folderExists(folderTitle.folder.title)
      }
    })
    .catch(ui.editFolderFailure)
}

const onSaveToFolder = (event) => {
  event.preventDefault()
  // get list of folders to populate folder drop-down
  api.indexFolders()
    .then(apiResponse => { store.folders = apiResponse.folders })
    // .then(other => console.log(store.folders))
    .then(other => {
      if (store.folders.length > 0) {
        ui.saveToFolderModal()
      } else {
        ui.noFolders()
      }
    })
}

const onSubmitSaveToFolder = (event) => {
  event.preventDefault()
  const folderId = parseInt($('#folder-dropdown').val())
  const npcId = store.npc.id
  // first index folders to make sure the npc isn't in the folder already
  api.indexFolders()
    .then(apiResponse => { store.folders = apiResponse.folders })
    // .then(other => console.log(store.folders))
    .then(other => {
      // use folder index to make sure NPC not already saved to the folder
      const folderIndex = store.folders.findIndex(element => element.id === folderId)
      // first, if folder is empty, proceed with save
      if (!store.folders[folderIndex].npcs.length) {
        api.saveToFolder(folderId, npcId)
          .then(ui.saveToFolderSucess)
          .catch(ui.saveToFolderFailure)
      // second, if folder doesn't contain the npc, proceed with save
      } else if (!store.folders[folderIndex].npcs.some(element => element.id === npcId)) {
        api.saveToFolder(folderId, npcId)
          .then(ui.saveToFolderSucess)
          .catch(ui.saveToFolderFailure)
      // else, notify user the save action will not occur
      } else {
        ui.alreadySaved(store.folders[folderIndex].title)
      }
    })
}

const onRemoveFromFolder = (event) => {
  event.preventDefault()
  const folderId = parseInt($('#folder-dropdown').val())
  const npcId = store.npc.id
  // first index folders to make sure the npc is in the folder
  api.indexFolders()
    .then(apiResponse => { store.folders = apiResponse.folders })
    // .then(other => console.log(store.folders))
    .then(other => {
      // use folder index to make sure NPC is already saved to the folder
      const folderIndex = store.folders.findIndex(element => element.id === folderId)
      // If folder contains the npc, proceed with removal
      if (store.folders[folderIndex].npcs.some(element => element.id === npcId)) {
        api.removeFromFolder(folderId, npcId)
          .then(ui.removeFromFolderSucess)
          .catch(ui.removeFromFolderFailure)
      // else, notify user the save action will not occur
      } else {
        ui.alreadyRemoved(store.folders[folderIndex].title)
      }
    })
}

const onSelectFolder = (event) => {
  event.preventDefault()
  // Selecting a fontawesome SVG image in the DOM is tricky; depending on where
  // you click, roughly 50% of the time you actually click the child of the
  // element, which is a path element. I got around this by using the below
  // conditional.
  let folderId
  if ($(event.target).data().id) {
    folderId = $(event.target).data().id
  } else {
    folderId = $(event.target).parent().data().id
  }
  api.getFolder(folderId)
    .then(ui.singleFolderViewSucess)
    .catch(ui.singleFolderViewFailure)
}

const onReturnToFolders = (event) => {
  event.preventDefault()
  ui.returnToFolders()
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
  onLikeOrDislikeNPC,
  exportToPDF,
  onClickCreate,
  onViewFolders,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
  onEditFolder,
  onSubmitEdit,
  onSaveToFolder,
  onSubmitSaveToFolder,
  onReturnToFolders,
  onRemoveFromFolder
}
