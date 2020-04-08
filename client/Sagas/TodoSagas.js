import TodoType, { TodoSelector } from '../Redux/TodoRedux'
import { select, put, call } from 'redux-saga/effects'

export function * addTodo (api, action) {
  try {
    console.log(action)
    console.log(api)
    const email = action.todo.email
    const pasword = action.todo.email
    const responds = yield call(api.addTodo, email, pasword)
    console.log(responds)
    yield put(TodoType.saveTodo(action.name))
    const firstName = yield select(TodoSelector.getUserFirst)
    console.log(firstName)
  } catch (e) {
    console.log(e)
    console.log('error')
  }
}
