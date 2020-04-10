import apisauce from 'apisauce'

const API_URL = 'http://localhost:3000/api'

const createApi = (baseURL = API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: { Accept: 'application/vnd.github.v3+json' }
  })

  const createAccount = (user) => api.post('/users/user', user)

  const retriveUserInfo = (user) => api.post('users/user/login', user)

  const checkAvaliableEmail = (email) => api.post('/users/user/signup', email)

  const resetPassword = (email) => api.post('users/user/resetpassword', email)

  const resetPassworddata = (data) => api.post('users/user/resetpassworddata', data)

  return {
    createAccount,
    retriveUserInfo,
    checkAvaliableEmail,
    resetPassword,
    resetPassworddata
  }
}

export default { createApi }
