const store = require('./store')
const templateAllNPCs = require('./templates/npc-listing.handlebars')
const templatePersonalNPCs = require('./templates/personal-npc-listing.handlebars')
const templateSingleNPC = require('./templates/single-npc.handlebars')
const classArrays = require('./classArrays')
const templateSampleNPCs = require('./templates/pub-priv-npc-samples.handlebars')
const templateNoResults = require('./templates/no-results.handlebars')
const templateAllFolders = require('./templates/all-folders.handlebars')
const appendSingleFolder = require('./templates/append-single-folder.handlebars')
// used for user notifications
const notification = require('../../lib/notifications.js')

const fixNonArrImage = function (npc) {
  if (classArrays.barbarian.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/GGHd4MP.png)')
  }
  // set bard image
  if (classArrays.bard.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/BEFVySZ.png)')
  }
  // set cleric image
  if (classArrays.cleric.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/577kYwb.png)')
  }
  // set druid image
  if (classArrays.druid.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/0wRS6em.png)')
  }
  // set artificer image
  if (classArrays.artificer.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/XIYpp71.png)')
  }
  // set fighter image
  if (classArrays.fighter.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/NxPJyOx.png)')
  }
  // set monk image
  if (classArrays.monk.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/DSwkJRQ.png)')
  }
  // set mystic image
  if (classArrays.mystic.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/4po4NHG.png)')
  }
  // set paladin image
  if (classArrays.paladin.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/NFcBfH5.png)')
  }
  // set ranger image
  if (classArrays.ranger.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/fVJ8Zeu.png)')
  }
  // set rogue image
  if (classArrays.rogue.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/Rx6Gsku.png)')
  }
  // set sorcerer image
  if (classArrays.sorcerer.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/JmitTnG.png)')
  }
  // set warlock image
  if (classArrays.warlock.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/aygSDh6.png)')
  }
  // set wizard image
  if (classArrays.wizard.some(function (element) {
    return element === npc.dnd_class
  })) {
    $("div[data-class='5-" + npc.id + "']").css('background-image', 'url(https://imgur.com/5KtrgTD.png)')
  }
}

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
  $('#home-header').hide()
  $('#static-header').show()
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
  // Testing
  $('#create-npc-form').each(function () {
    this.reset()
  })
  $('#edit-npc-form').each(function () {
    this.reset()
  })
  $('#edit-npc-form').prop('id', 'create-npc-form')
  $('#npc-modal-button').text('Create NPC!')
  // Testing
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
  $('#home-header').show()
  $('#static-header').hide()
  $('#universal-content-header').hide()
  $('#user-profile-page').hide()
  $('#log-out-button').hide()
  $('#change-pw-button').hide()
  $('#no-search-results').hide()
  $('#return-to-profile-button').hide()
  $('#get-npc-div').hide()
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

const adjustReadoutImages = function (apiResponse) {
  const npcArr = apiResponse.npcs
  for (let i = 0; i < apiResponse.npcs.length; i++) {
    // set barbarian image
    if (classArrays.barbarian.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/GGHd4MP.png)')
    }
    // set bard image
    if (classArrays.bard.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/BEFVySZ.png)')
    }
    // set cleric image
    if (classArrays.cleric.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/577kYwb.png)')
    }
    // set druid image
    if (classArrays.druid.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/0wRS6em.png)')
    }
    // set artificer image
    if (classArrays.artificer.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/XIYpp71.png)')
    }
    // set fighter image
    if (classArrays.fighter.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/NxPJyOx.png)')
    }
    // set monk image
    if (classArrays.monk.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/DSwkJRQ.png)')
    }
    // set mystic image
    if (classArrays.mystic.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/4po4NHG.png)')
    }
    // set paladin image
    if (classArrays.paladin.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/NFcBfH5.png)')
    }
    // set ranger image
    if (classArrays.ranger.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/fVJ8Zeu.png)')
    }
    // set rogue image
    if (classArrays.rogue.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/Rx6Gsku.png)')
    }
    // set sorcerer image
    if (classArrays.sorcerer.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/JmitTnG.png)')
    }
    // set warlock image
    if (classArrays.warlock.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/aygSDh6.png)')
    }
    // set wizard image
    if (classArrays.wizard.some(function (element) {
      return element === npcArr[i].dnd_class
    })) {
      $("div[data-class='5-" + npcArr[i].id + "']").css('background-image', 'url(https://imgur.com/5KtrgTD.png)')
    }
  }
}

const viewAllNPCsSuccess = function (apiResponse) {
  // setting below value so it can be used to update the DOM after an edit
  store.search_limitation = 'Public'
  $('#return-to-profile-button').show()
  $('#universal-content-header').text('All Public NPCs')
  $('#user-profile-page').hide()
  $('#get-npc-div').show()
  const allNPCReadoutHTML = templateAllNPCs({ npcs: apiResponse.npcs })
  $('#get-npc-div').append(allNPCReadoutHTML)
  adjustReadoutImages(apiResponse)
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
  adjustReadoutImages(apiResponse)
}

const searchResultsSuccess = function (apiResponse) {
  if (apiResponse.npcs.length === 0) {
    $('#search-npc-form').each(function () {
      this.reset()
    })
    $('#search-npcs-modal').modal('hide')
    $('#return-to-profile-button').show()
    $('#universal-content-header').text('Search Results')
    $('#user-profile-page').hide()
    $('#no-search-results').show()
  } else if (store.ownership === 'Public NPCs') {
    $('#search-npc-form').each(function () {
      this.reset()
    })
    $('#search-npcs-modal').modal('hide')
    $('#return-to-profile-button').show()
    $('#universal-content-header').text('Search Results')
    $('#user-profile-page').hide()
    $('#get-npc-div').show()
    const allPublicResultsHTML = templateAllNPCs({ npcs: apiResponse.npcs })
    if (allPublicResultsHTML === '') {
      $('#get-npc-div').hide()
      $('#no-search-results').show()
    } else {
      $('#get-npc-div').append(allPublicResultsHTML)
      adjustReadoutImages(apiResponse)
    }
  } else if (store.ownership === 'Your NPCs') {
    $('#search-npc-form').each(function () {
      this.reset()
    })
    $('#search-npcs-modal').modal('hide')
    $('#return-to-profile-button').show()
    $('#universal-content-header').text('Search Results')
    $('#user-profile-page').hide()
    $('#get-npc-div').show()
    const personalNPCArr = apiResponse.npcs.filter(function (npc) {
      return npc.user.email === store.user.email
    })
    if (personalNPCArr.length === 0) {
      $('#get-npc-div').hide()
      $('#no-search-results').show()
    } else {
      const personalNPCReadout = templatePersonalNPCs({ npcs: personalNPCArr })
      $('#get-npc-div').append(personalNPCReadout)
      adjustReadoutImages(apiResponse)
    }
  }
}

const searchResultsFailure = function (apiResponse) {
  $('#search-npc-form').each(function () {
    this.reset()
  })
  $('#search-npcs-modal').modal('hide')
  $('#universal-response-modal-content').text('Failed to load NPCs. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
  $('#universal-response-modal').modal('show')
}

const searchCreatorFailure = function (apiResponse) {
  $('#search-npc-form').each(function () {
    this.reset()
  })
  $('#search-npcs-modal').modal('hide')
  if (apiResponse.status === 500) {
    $('#return-to-profile-button').show()
    $('#universal-content-header').text('Search Results')
    $('#user-profile-page').hide()
    $('#no-search-results').show()
  } else {
    $('#universal-response-modal-content').text('Failed to load NPCs. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
    $('#universal-response-modal').modal('show')
  }
}

const viewPersonalNPCsFailure = function (apiResponse) {
  $('#universal-response-modal-content').text('Failed to load NPCs. The server responded with error code: ' + apiResponse.status + ', ' + apiResponse.statusText + '. The server might be down. Try again later!')
  $('#universal-response-modal').modal('show')
}

const returnToProfile = function () {
  // clearing stored search limitations
  store.search_limitation = ''
  store.searched_attribute = ''
  store.search_npc_input = ''
  $('#no-search-results').hide()
  $('#return-to-profile-button').hide()
  $('#universal-content-header').text(`${store.user.user_name}'s Profile`)
  $('#get-npc-div').hide()
  $('#get-npc-div').empty()
  $('#folders-readout-div').hide()
  $('#folders-readout-div').empty()
  $('#create-folder-button').hide()
  $('#user-profile-page').show()
  // Testing
  $('#create-npc-form').each(function () {
    this.reset()
  })
  $('#edit-npc-form').each(function () {
    this.reset()
  })
  $('#edit-npc-form').prop('id', 'create-npc-form')
  $('#npc-modal-button').text('Create NPC!')
  // Testing
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
  console.log(store.npc)
  console.log(store.npc.liking_users)
  const likedByArr = store.npc.liking_users
  if (likedByArr.some(function (likees) {
    return likees.id === store.user.id
  })) {
    $('.like-npc').toggleClass('active')
  }
  fixNonArrImage(apiResponse.npc)
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
  if (store.npc.private === true) {
    $('#inputPrivacySetting').prop('checked', true)
  } else {
    $('#inputPrivacySetting').prop('checked', false)
  }
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
  // update the image
  if (classArrays.barbarian.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/GGHd4MP.png)')
  }
  // set bard image
  if (classArrays.bard.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/BEFVySZ.png)')
  }
  // set cleric image
  if (classArrays.cleric.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/577kYwb.png)')
  }
  // set druid image
  if (classArrays.druid.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/0wRS6em.png)')
  }
  // set artificer image
  if (classArrays.artificer.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/XIYpp71.png)')
  }
  // set fighter image
  if (classArrays.fighter.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/NxPJyOx.png)')
  }
  // set monk image
  if (classArrays.monk.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/DSwkJRQ.png)')
  }
  // set mystic image
  if (classArrays.mystic.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/4po4NHG.png)')
  }
  // set paladin image
  if (classArrays.paladin.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/NFcBfH5.png)')
  }
  // set ranger image
  if (classArrays.ranger.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/fVJ8Zeu.png)')
  }
  // set rogue image
  if (classArrays.rogue.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/Rx6Gsku.png)')
  }
  // set sorcerer image
  if (classArrays.sorcerer.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/JmitTnG.png)')
  }
  // set warlock image
  if (classArrays.warlock.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/aygSDh6.png)')
  }
  // set wizard image
  if (classArrays.wizard.some(function (element) {
    return element === store.npc.dnd_class
  })) {
    $("div[data-class='5-" + store.npc.id + "']").css('background-image', 'url(https://imgur.com/5KtrgTD.png)')
  }
  // adjust dom for possible search limitations
  if (store.search_limitation === 'Public') {
    if (store.npc.private === true) {
      $("div[data-id='1-" + store.npc.id + "']").hide()
    }
  }
  // name edit
  if (store.searched_attribute === 'Name') {
    if (store.npc.name !== store.search_npc_input) {
      $("div[data-id='1-" + store.npc.id + "']").hide()
    }
  }
  // challenge rating
  if (store.searched_attribute === 'Challenge Rating') {
    if (store.npc.challenge_rating !== store.search_npc_input) {
      $("div[data-id='1-" + store.npc.id + "']").hide()
    }
  }
  // level
  if (store.searched_attribute === 'Level') {
    if (store.npc.level !== store.search_npc_input) {
      $("div[data-id='1-" + store.npc.id + "']").hide()
    }
  }
  // Race - if searched by Race
  if (store.searched_attribute === 'Race') {
    // (1) if new race !== searched race
    if (store.npc.race !== store.search_npc_input) {
      // (2) Asimar (searched input in aasimar)
      if (classArrays.aasimar.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.aasimar.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) bugbear (searched input in bugbear)
      else if (classArrays.bugbear.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.bugbear.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) dragonborn (searched input in dragonborn)
      else if (classArrays.dragonborn.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.dragonborn.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) dwarf (searched input in dwarf)
      else if (classArrays.dwarf.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.dwarf.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) elf (searched input in elf)
      else if (classArrays.elf.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.elf.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) firbolg (searched input in firbolg)
      else if (classArrays.firbolg.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.firbolg.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) fey (searched input in fey)
      else if (classArrays.fey.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.fey.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) gensai (searched input in gensai)
      else if (classArrays.gensai.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.gensai.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) gnome (searched input in gnome)
      else if (classArrays.gnome.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.gnome.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) goblin (searched input in goblin)
      else if (classArrays.goblin.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.goblin.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) troll (searched input in troll)
      else if (classArrays.troll.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.troll.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) goliath (searched input in goliath)
      else if (classArrays.goliath.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.goliath.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) halfelf (searched input in halfelf)
      else if (classArrays.halfelf.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.halfelf.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) halforc (searched input in halforc)
      else if (classArrays.halforc.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.halforc.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) halfling (searched input in halfling)
      else if (classArrays.halfling.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.halfling.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) human (searched input in human)
      else if (classArrays.human.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.human.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) kenku (searched input in kenku)
      else if (classArrays.kenku.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.kenku.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) kobold (searched input in kobold)
      else if (classArrays.kobold.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.kobold.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) lizardfolk (searched input in lizardfolk)
      else if (classArrays.lizardfolk.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.lizardfolk.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) tabaxi (searched input in tabaxi)
      else if (classArrays.tabaxi.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.tabaxi.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) tiefling (searched input in tiefling)
      else if (classArrays.tiefling.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.tiefling.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) tortle (searched input in tortle)
      else if (classArrays.tortle.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.tortle.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) triton (searched input in triton)
      else if (classArrays.triton.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.triton.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) yuanti (searched input in yuanti)
      else if (classArrays.yuanti.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.yuanti.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) gith (searched input in gith)
      else if (classArrays.gith.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new race is not in that same array
        if (!classArrays.gith.some(function (element) {
          return element === store.npc.race
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
    }
  }
  // finally, if searched by class
  if (store.searched_attribute === 'Class') {
    // (1) if new class !== searched class
    if (store.npc.dnd_class !== store.search_npc_input) {
      // (2) artificer (searched input in artificer)
      if (classArrays.artificer.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.artificer.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) barbarian (searched input in barbarian)
      if (classArrays.barbarian.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.barbarian.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) bard (searched input in bard)
      if (classArrays.bard.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.bard.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) cleric (searched input in cleric)
      if (classArrays.cleric.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.cleric.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) druid (searched input in druid)
      if (classArrays.druid.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.druid.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) fighter (searched input in fighter)
      if (classArrays.fighter.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.fighter.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) monk (searched input in monk)
      if (classArrays.monk.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.monk.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) mystic (searched input in mystic)
      if (classArrays.mystic.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.mystic.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) paladin (searched input in paladin)
      if (classArrays.paladin.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.paladin.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) ranger (searched input in ranger)
      if (classArrays.ranger.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.ranger.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) rogue (searched input in rogue)
      if (classArrays.rogue.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.rogue.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) sorcerer (searched input in sorcerer)
      if (classArrays.sorcerer.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.sorcerer.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) warlock (searched input in warlock)
      if (classArrays.warlock.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.warlock.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
      // (2) wizard (searched input in wizard)
      if (classArrays.wizard.some(function (element) {
        return element === store.search_npc_input
      })) {
        // (3) if new class is not in that same array
        if (!classArrays.wizard.some(function (element) {
          return element === store.npc.dnd_class
        })) {
          // (4) hide the edited NPC
          $("div[data-id='1-" + store.npc.id + "']").hide()
        }
      }
    }
  }
}

const editNPCFailure = function (apiResponse) {
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
  $('#universal-response-modal-content').text('Woops, that name is taken. Failed to edit NPC because names must be unique!')
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

const showNPCSearchField = function (chosenAttribute) {
  if ($('#attribute-dropdown').val() === 'Placeholder') {
    $('#row-3').hide()
  } else {
    $('#row-3').show()
    $('#search-npc-label').text(chosenAttribute)
  }
}

const resetSearchModal = function () {
  $('#row-3').hide()
}

const populateSampleNPCDataSuccess = function (apiResponse) {
  // empty the divs
  $('.ex-1').empty()
  $('.ex-2').empty()
  $('.ex-3').empty()
  $('.ex-4').empty()
  // (public samples) narrow full npc list to public list
  const publicNPCArr = apiResponse.npcs.filter(function (element) {
    return element.private === false
  })
  // find most popular public npcs
  let mostPopularNPC = publicNPCArr[0]
  let penultPopNPC
  const smallerPopList = []
  for (let i = 0; i < publicNPCArr.length; i++) {
    if (publicNPCArr[i].liking_users.length > mostPopularNPC.liking_users.length) {
      penultPopNPC = mostPopularNPC
      mostPopularNPC = publicNPCArr[i]
      smallerPopList.push(penultPopNPC)
    } else {
      smallerPopList.push(publicNPCArr[i])
    }
  }
  for (let i = 0; i < smallerPopList.length; i++) {
    if (smallerPopList[i].liking_users.length > penultPopNPC.liking_users.length) {
      penultPopNPC = smallerPopList[i]
    }
  }
  // previously set public npc samples randomly
  // (public samples) set random numbers based on public length
  // const random1 = Math.floor(Math.random() * truePublicArr.length)
  // let random2 = Math.floor(Math.random() * truePublicArr.length)
  // if (random2 === random1) {
  //   random2 = Math.floor(Math.random() * truePublicArr.length)
  // }
  // (public samples) create public sample divs
  const samplePub1 = templateSampleNPCs({ npc: mostPopularNPC })
  const samplePub2 = templateSampleNPCs({ npc: penultPopNPC })
  // (public samples) append to dom
  $('.ex-3').append(samplePub1)
  $('.ex-4').append(samplePub2)
  fixNonArrImage(mostPopularNPC)
  fixNonArrImage(penultPopNPC)
  // (user samples) narrow by ownership
  const userNPCArr = apiResponse.npcs.filter(function (element) {
    return element.user.email === store.user.email
  })
  if (userNPCArr.length === 0) {
    // $('.ex-1').text('Create some NPCs!')
    // $('.ex-2').text('Create some NPCs!')
    const noResult1HTML = templateNoResults
    const noResult2HTML = templateNoResults
    $('.ex-1').append(noResult1HTML)
    $('.ex-2').append(noResult2HTML)
  } else if (userNPCArr.length === 1) {
    const noResult2HTML = templateNoResults
    $('.ex-2').append(noResult2HTML)
    // (user sample) create user sample div
    const singleSample = templateSampleNPCs({ npc: userNPCArr[0] })
    // (user sample) append to dom
    $('.ex-1').append(singleSample)
    // (fix image)
    fixNonArrImage(userNPCArr[0])
  } else {
    // (user samples) find 2 most recent
    let mostRecentNPC = userNPCArr[0]
    let penultNPC
    const smallerUserArr = []
    for (let i = 0; i < userNPCArr.length; i++) {
      if (userNPCArr[i].created_at > mostRecentNPC.created_at) {
        penultNPC = mostRecentNPC
        mostRecentNPC = userNPCArr[i]
      } else {
        smallerUserArr.push(userNPCArr[i])
      }
    }
    if (penultNPC === undefined) {
      for (let i = 0; i < smallerUserArr.length; i++) {
        penultNPC = smallerUserArr[0]
        if (smallerUserArr[i].created_at > penultNPC.created_at) {
          penultNPC = smallerUserArr[i]
        }
      }
    }
    // (user samples) create user sample divs
    const samplePers1 = templateSampleNPCs({ npc: mostRecentNPC })
    const samplePers2 = templateSampleNPCs({ npc: penultNPC })
    // (user samples) append to dom
    $('.ex-1').append(samplePers1)
    $('.ex-2').append(samplePers2)
    // (fix images)
    fixNonArrImage(mostRecentNPC)
    fixNonArrImage(penultNPC)
  }
}

const populateSampleNPCDataFailure = function (apiResponse) {
  console.log(apiResponse)
}

const addLikes = function (apiResponse) {
  console.log('Like created!')
  console.log(apiResponse)
  // update npc viewer & dom
  $("span[data-id='likes-" + store.npc.id + "']").text(store.npc.liking_users.length + 1)
}

const subtractLikes = function (apiResponse) {
  console.log('Like deleted!')
  console.log(apiResponse)
  // update npc viewer & dom
  $("span[data-id='likes-" + apiResponse.npc.id + "']").text(apiResponse.npc.liking_users.length)
  store.npc = apiResponse.npc
}

const viewFoldersSuccess = (apiResponse) => {
  store.folders = apiResponse.folders
  console.log(store.folders)
  $('#return-to-profile-button').show()
  $('#create-folder-button').show()
  $('#universal-content-header').text(store.user.user_name + '\'s Folders')
  $('#user-profile-page').hide()
  $('#folders-readout-div').show()
  const allFoldersHTML = templateAllFolders({ folders: store.folders })
  $('#folders-readout-div').append(allFoldersHTML)
}

const viewFoldersFailure = (apiResponse) => {
  notification.tempToast('error', 'Failed to Load Folders', 'We encountered an issue when requesting your folders from the server. It may be the case that the server is down at this time. We apologize for the inconvenience, please try again later!', 'red', 'black', 'black', 8000) // red background, black text, light black load color
}

const createFolderSuccess = (apiResponse) => {
  // reset form
  $('#create-folder-form').each(function () {
    this.reset()
  })
  // close Modal
  $('#create-folder-modal').modal('hide')
  // success notification
  notification.tempToast('succes', 'Success!', 'Folder successfully created!', '#1F71BA', 'white', 'white', 4000)
  // manipulate DOM
  const oneFoldersHTML = appendSingleFolder({ folder: apiResponse.folder })
  $('#folders-readout-div').append(oneFoldersHTML)
}

const createFolderFailure = (apiResponse) => {
  // reset form
  $('#create-folder-form').each(function () {
    this.reset()
  })
  // close Modal
  $('#create-folder-modal').modal('hide')
  // error notification
  notification.tempToast('error', 'Failed to Create Folder', 'We encountered an issue creating your folder. It may be the case that the server is down at this time. We apologize for the inconvenience, please try again later!', 'red', 'black', 'black', 8000) // red background, black text, light black load color
}

const deleteFolderSuccess = () => {
  // update DOM
  $("div[data-id='" + store.deletedFolder + "']").hide()
  // success notice
  notification.tempToast('succes', 'Success!', 'Folder successfully deleted.', '#1F71BA', 'white', 'white', 4000)
}

const deleteFolderFailure = () => {
  // error notification
  notification.tempToast('error', 'Error!', 'We encountered an issue deleting your folder. It may be the case that the server is down at this time. We apologize for the inconvenience, please try again later!', 'red', 'black', 'black', 8000) // red background, black text, light black load color
}

const editFolderModal = (apiResponse) => {
  // show Modal
  $('#edit-folder-modal').modal('show')
  // populate Modal
  $('#inputFolder2').val(apiResponse.folder.title)
}

const getFolderFailure = (apiResponse) => {
  // error notification
  notification.tempToast('error', 'Error!', 'We encountered an issue finding your folder. It may be the case that the server is down at this time. We apologize for the inconvenience, please try again later!', 'red', 'black', 'black', 8000) // red background, black text, light black load color
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
  emptyUserNameField,
  showNPCSearchField,
  resetSearchModal,
  searchResultsSuccess,
  searchResultsFailure,
  searchCreatorFailure,
  populateSampleNPCDataSuccess,
  populateSampleNPCDataFailure,
  addLikes,
  subtractLikes,
  viewFoldersSuccess,
  viewFoldersFailure,
  createFolderSuccess,
  createFolderFailure,
  deleteFolderSuccess,
  deleteFolderFailure,
  editFolderModal,
  getFolderFailure
}
