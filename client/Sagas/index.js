import { takeLatest, all } from 'redux-saga/effects'

/* ------------ Types ----------- */
import { UserType } from '../Redux/TodoRedux'

/* ------------ sagas ----------- */
import { addTodo } from './TodoSagas'

/* ------------ sagas ----------- */
export default function * root () {
  yield all([
    takeLatest(UserType.ADD_TODO, addTodo)
  ])
}
