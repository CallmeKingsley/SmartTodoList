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
    if (!isNil(userExist.data.user)) {
      yield put(UserRedux.createAccountFailure({ error: true, message: 'Email already Exist' }))
    }

    const responds = yield call(api.createAccount, user)
    if (!isNil(responds.data.newUser) && isNil(userExist.data.user)) {
      yield put(UserRedux.createAccountSuccess(responds.data.newUser, false))
      History.push('/')
    } else if (isNil(userExist.data.user)) {
      yield put(UserRedux.createAccountFailure({ error: true, message: 'Try again Later' }))
    }
  } catch (e) {
    console.log(e)
    yield put(UserRedux.createAccountFailure({ error: true, message: 'Network Issue' }))
  }
}

export function * loginUser (api, action) {
  try {
    const user = {
      Email: action.user.email,
      Password: action.user.password
    }
    const userExist = yield call(api.checkAvaliableEmail, { Email: action.user.email })
    if (isNil(userExist.data.user)) {
      yield put(UserRedux.loginUserFailure({ error: true, message: 'Invalid credential' }))
    }

    const responds = yield call(api.retriveUserInfo, user)
    if (!isNil(userExist.data.user) && isNil(responds.data.user)) {
      yield put(UserRedux.loginUserFailure({ error: true, message: 'Invalid credential' }))
    }

    if (responds.ok && !isNil(responds.data.user) && !isNil(userExist.data.user)) {
      yield put(UserRedux.loginUserSuccess(responds.data, false))
      History.push('/')
    } else {
      yield put(UserRedux.loginUserFailure({ error: true, message: 'Invalid credential' }))
    }
  } catch (e) {
    console.log(e)
    yield put(UserRedux.loginUserFailure({ error: true, message: 'Network issue' }))
  }
}

export function * passwordChangeRequest (api, action) {
  try {
    const user = {
      Email: action.success.email
    }

    const userExist = yield call(api.checkAvaliableEmail, { Email: action.success.email })
    if (isNil(userExist.data.user)) {
      yield put(UserRedux.passwordChangeRequestFailure({ error: true, message: 'Invalid Email' }))
    }

    const responds = yield call(api.resetPassword, user)
    console.log(responds)
    if (responds.ok && !isNil(userExist.data.user)) {
      yield put(UserRedux.passwordChangeRequestSuccess())
    } else {
      yield put(UserRedux.passwordChangeRequestFailure({ error: true, message: 'NetWork issue' }))
    }
  } catch (e) {
    console.log(e)
    yield put(UserRedux.passwordChangeRequestFailure({ error: true, message: e.message }))
  }
}

export function * passwordReset (api, action) {
  try {
    const responds = yield call(api.resetPassworddata, action.success)
    console.log(responds)
    if (!isNil(responds.data.data)) {
      yield put(UserRedux.passwordResetSuccess(responds.data, false))
      History.push('/')
    } else {
      yield put(UserRedux.passwordResetFailure({ error: true, message: 'unable to save password' }))
    }
    console.log(action)
  } catch (e) {
    console.log(e)
    yield put(UserRedux.passwordResetFailure({ error: true, message: e.message }))
  }
}
