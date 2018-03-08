const config = require('./config')
// const store = require('./store')

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
  console.log('Data sent to API!')
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: filteredSignInData
  })
}

module.exports = {
  onRegister,
  onSignIn
}
