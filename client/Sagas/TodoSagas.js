import UserRedux, { TodoSelector } from '../Redux/TodoRedux'
import { select, put } from 'redux-saga/effects'

export function * addTodo (action) {
  try {
    yield put(UserRedux.saveTodo(action.name))
    const firstName = yield select(TodoSelector.getUserFirst)
    console.log(firstName)
  } catch (e) {
    console.log(e)
    console.log('error')
  }
}
