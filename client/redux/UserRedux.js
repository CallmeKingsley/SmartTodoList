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
  authenticationErrorHanding: ['authenticationError'],
  passwordChangeRequestSuccess: ['isEmailed'],
  passwordChangeRequestFailure: ['error'],
  passwordChangeRequest: ['success'],
  passwordResetSuccess: ['isEmailed'],
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
    user: false
  },
  errors: {
    user: null,
    login: null,
    signup: null,
    email: null
  },
  emailSend: null
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
    loading: { ...state.loading, user: true },
    errors: { ...state.errors, user: null }
  })

export const createAccountFailure = (state, { error }) =>
  state.merge({
    loading: { ...state.loading, user: false },
    errors: { ...state.errors, user: error }
  })

export const createAccountSuccess = (state, { user, loading }) => {
  return state.merge({
    authenticated: true,
    user,
    loading: { ...state.loading, user: loading },
    errors: { ...state.errors, user: null }
  })
}

export const loginUser = (state) =>
  state.merge({
    loading: { ...state.loading, user: true },
    errors: { ...state.errors, user: null }
  })

export const loginUserSuccess = (state, { user, loading }) => {
  return state.merge({
    authenticated: true,
    user,
    loading: { ...state.loading, user: loading },
    errors: { ...state.errors, user: null }
  })
}

export const loginUserFailure = (state, { error }) =>
  state.merge({
    loading: { ...state.loading, user: false },
    errors: { ...state.errors, user: error }
  })

export const authenticationErrorHanding = (state, { authenticationError }) => {
  return state.merge({
    errors: { ...state.errors, authenticationError }
  })
}

export const passwordChangeRequest = (state) => state.merge({
  loading: { ...state.loading, user: true },
  errors: { ...state.errors, user: null }
})

export const passwordChangeRequestFailure = (state) => state.merge({
  loading: { ...state.loading, user: true },
  errors: { ...state.errors, user: null }
})

export const passwordChangeRequestSuccess = (state, { isEmailed }) => state.merge({
  emailSend: isEmailed,
  loading: { ...state.loading, user: true },
  errors: { ...state.errors, user: null }
})

export const logoutAccount = (state) => {
  console.log('in logout function')
  return state.merge({
    authenticated: false,
    user: []
  })
}

export const passwordResetSuccess = (state, { success }) =>
  state.merge({
    loading: { ...state.loading, user: false },
    errors: { ...state.errors, user: error }
  })

export const passwordResetFailure = (state) =>
  state.merge({
    loading: { ...state.loading, user: false },
    errors: { ...state.errors, user: error }
  })

export const passwordReset = (state) =>
  state.merge({
    loading: { ...state.loading, user: false }
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
  [Types.LOGOUT_ACCOUNT]: logoutAccount,
  [Types.AUTHENTICATION_ERROR_HANDING]: authenticationErrorHanding
})
