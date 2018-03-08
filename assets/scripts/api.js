const config = require('./config')
// const store = require('./store')

const onRegister = function (FilteredRegisterData) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: FilteredRegisterData
  })
}

module.exports = {
  onRegister
}
