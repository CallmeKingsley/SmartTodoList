import UserRedux, { UserSelector, UserType } from '../Redux/UserRedux'
import { select, put, call } from 'redux-saga/effects'
import History from '../History'
import { isNil } from 'ramda'

export function * createAccount (api, action) {
  try {
    const user = {
      Name: action.user.username,
      Email: action.user.email,
      Password: action.user.password
    }

    const userExist = yield call(api.checkAvaliableEmail, { Email: action.user.email })
    console.log(userExist)
    const responds = yield call(api.createAccount, user)
    console.log(responds)
    if (responds.ok && responds.status === 200 && isNil(userExist.data.user)) {
      yield put(UserRedux.authenticationErrorHanding({ signup: false }))
      yield put(UserRedux.createAccountSuccess(responds.data.newUser, true))
      History.push('/')
    } else {
      yield put(UserRedux.authenticationErrorHanding({ signup: true }))
    }
  } catch (e) {
    console.log(e)
    yield put(UserRedux.createAccountFailure(e.message))
    console.log('error')
  }
}

export function * loginUser (api, action) {
  try {
    const user = {
      Email: action.user.email,
      Password: action.user.password
    }
    const userExist = yield call(api.checkAvaliableEmail, { Email: action.user.email })
    console.log(userExist)
    const responds = yield call(api.retriveUserInfo, user)
    console.log(responds)
    if (responds.ok && responds.status === 200 && !isNil(userExist.data.user)) {
      yield put(UserRedux.loginUserSuccess(responds.data, true))
      yield put(UserRedux.authenticationErrorHanding({ login: false }))
      History.push('/')
    } else {
      yield put(UserRedux.authenticationErrorHanding({ login: true }))
    }
  } catch (e) {
    console.log(e)
    yield put(UserRedux.loginUserFailure(e.message))
  }
}

export function * passwordReset (api, action) {
  try {
    console.log(action)
    console.log('i was in the saga')
    const user = {
      Email: action.success.email
    }
    // const userExist = yield call(api.checkAvaliableEmail, { Email: action.user.email })
    // if(userExist.ok && userExist.status === 200){

    // }
    console.log(user)
    const responds = yield call(api.resetPassword, user)
    console.log(responds)
    if (responds.ok && responds.status === 200) {
      yield put(UserRedux.authenticationErrorHanding({ forgot: false }))
    } else {
      yield put(UserRedux.authenticationErrorHanding({ forgot: true }))
    }
  } catch (e) {
    console.log(e)
    yield put(UserRedux.passwordResetFailure(e.message))
  }
}
