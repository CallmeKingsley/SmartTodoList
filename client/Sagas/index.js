import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
/* ------------ Types ----------- */
import { UserType } from '../Redux/TodoRedux'

/* ------------ sagas ----------- */
import { addTodo } from './TodoSagas'

const Api  = API.createApi()
/* ------------ sagas ----------- */
export default function * root () {
  yield all([
    takeLatest(UserType.ADD_TODO, addTodo, Api)
  ])
}
