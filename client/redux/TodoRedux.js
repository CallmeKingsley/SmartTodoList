import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------Type and Action creation ----------- */
const { Types, Creators } = createActions({
  addTodo: ['todo'],
  saveTodo: ['todo']
})

export const TodoType = Types
export default Creators

/* ------------ Initial State ----------- */
export const INITIAL_STATE = Immutable({
  firstName: 'kingsley',
  todoList: ['default']
})
/* ------------ Selectors ----------- */
export const TodoSelector = {
  getUserFirst: state => state.User.firstName
}

/* ------------ Reducers ----------- */
export const addTodo = (state, { todo }) => {
  const item = todo
  return state.merge({
    todoList: [...state.todoList, item]
  })
}

export const saveTodo = (state, { todo }) =>
  state.merge({
    saveStatus: true
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TODO]: addTodo,
  [Types.SAVE_TODO]: saveTodo
})
