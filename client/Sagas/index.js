import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
/* ------------ Types ----------- */
import { TodoType } from '../Redux/TodoRedux'
import { UserType } from '../Redux/UserRedux'

/* ------------ sagas ----------- */
import { addTodo } from './TodoSagas'
import { createAccount, loginUser, passwordChangeRequest, passwordReset } from './UserSagas'

const Api = API.createApi()
/* ------------ sagas ----------- */
export default function * root () {
  yield all([
    takeLatest(TodoType.ADD_TODO, addTodo, Api),
    takeLatest(UserType.CREATE_ACCOUNT, createAccount, Api),
    takeLatest(UserType.LOGIN_USER, loginUser, Api),
    takeLatest(UserType.PASSWORD_RESET, passwordReset, Api),
    takeLatest(UserType.PASSWORD_CHANGE_REQUEST, passwordChangeRequest, Api)
  ])
}
