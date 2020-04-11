import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------Type and Action creation ----------- */
const { Types, Creators } = createActions({
  createAccount: ['user'],
  createAccountFailure: ['error'],
  createAccountSuccess: ['user', 'loading'],
  logoutAccount: ['authenticated'],
  loginUser: ['user'],
  loginUserFailure: ['error'],
  loginUserSuccess: ['user', 'loading'],
  passwordChangeRequestSuccess: ['isEmailed'],
  passwordChangeRequestFailure: ['error'],
  passwordChangeRequest: ['success'],
  passwordResetSuccess: ['success', 'loading'],
  passwordResetFailure: ['error'],
  passwordReset: ['success']
})

export const UserType = Types
export default Creators

/* ------------ Initial State ----------- */
export const INITIAL_STATE = Immutable({
  user: {},
  userId: null,
  authenticated: false,
  loading: {
    user: false,
    login: null,
    signup: null,
    forgetPasswordEmail: null,
    passwordChange: null
  },
  errors: {
    user: null,
    login: null,
    signup: null,
    passwordChange: null
  }
})
/* ------------ Selectors ----------- */
export const UserSelector = {
  getUser: state => state.user.user,
  getUserId: state => state.user.user._id,
  isAuthenticated: state => state.user.authenticated
}

/* ------------ Reducers ----------- */
export const createAccount = (state) =>
  state.merge({
    loading: { ...state.loading, signup: true },
    errors: { ...state.errors, signup: null }
  })

export const createAccountFailure = (state, { error }) =>
  state.merge({
    loading: { ...state.loading, signup: true },
    errors: { ...state.errors, signup: error }
  })

export const createAccountSuccess = (state, { user, loading }) => {
  console.log(user)
  return state.merge({
    authenticated: true,
    user,
    loading: { ...state.loading, signup: loading },
    errors: { ...state.errors, signup: null },
    userId: user._id
  })
}

export const loginUser = (state) =>
  state.merge({
    loading: { ...state.loading, login: true },
    errors: { ...state.errors, login: null }
  })

export const loginUserSuccess = (state, { user, loading }) => {
  console.log(user)
  return state.merge({
    authenticated: true,
    user: user.user,
    loading: { ...state.loading, login: loading },
    errors: { ...state.errors, login: null },
    userId: user.user._id
  })
}

export const loginUserFailure = (state, { error }) =>
  state.merge({
    loading: { ...state.loading, login: true },
    errors: { ...state.errors, login: error }
  })

export const passwordChangeRequest = (state) => state.merge({
  loading: { ...state.loading, forgetPasswordEmail: true },
  errors: { ...state.errors, forgetPasswordEmail: null }
})

export const passwordChangeRequestFailure = (state, { error }) => state.merge({
  loading: { ...state.loading, forgetPasswordEmail: true },
  errors: { ...state.errors, forgetPasswordEmail: error }
})

export const passwordChangeRequestSuccess = (state) => state.merge({
  loading: { ...state.loading, forgetPasswordEmail: false },
  errors: { ...state.errors, forgetPasswordEmail: null }
})

export const logoutAccount = (state) => {
  console.log('in logout function')
  return state.merge({
    authenticated: false,
    user: [],
    loading: { ...state.loading, passwordChange: null, forgetPasswordEmail: null, signup: null, login: null, user: null },
    errors: { ...state.errors, passwordChange: null, forgetPasswordEmail: null, signup: null, login: null, user: null }
  })
}

export const passwordResetSuccess = (state, { success, loading }) => {
  console.log(success.data)
  return state.merge({
    authenticated: true,
    user: success.data,
    loading: { ...state.loading, passwordChange: loading },
    errors: { ...state.errors, passwordChange: null },
    userId: success.data._id
  })
}

export const passwordResetFailure = (state, { error }) =>
  state.merge({
    loading: { ...state.loading, passwordChange: false },
    errors: { ...state.errors, passwordChange: error }
  })

export const passwordReset = (state) =>
  state.merge({
    loading: { ...state.loading, passwordChange: false }
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_ACCOUNT_FAILURE]: createAccountFailure,
  [Types.CREATE_ACCOUNT_SUCCESS]: createAccountSuccess,
  [Types.CREATE_ACCOUNT]: createAccount,
  [Types.LOGIN_USER_FAILURE]: loginUserFailure,
  [Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_USER]: loginUser,
  [Types.PASSWORD_CHANGE_REQUEST_FAILURE]: passwordChangeRequestFailure,
  [Types.PASSWORD_CHANGE_REQUEST_SUCCESS]: passwordChangeRequestSuccess,
  [Types.PASSWORD_CHANGE_REQUEST]: passwordChangeRequest,
  [Types.PASSWORD_RESET_FAILURE]: passwordResetFailure,
  [Types.PASSWORD_RESET_SUCCESS]: passwordResetSuccess,
  [Types.PASSWORD_RESET]: passwordReset,
  [Types.LOGOUT_ACCOUNT]: logoutAccount
})
