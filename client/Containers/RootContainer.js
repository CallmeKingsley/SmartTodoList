import React, { Component } from 'react'
import LoginScreen from '../Components/LoginForm'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
  }

  onhandleSubmit (item) {
    this.props.addTodo(item)
    console.log(this.props.userName)
    console.log(item)
  }

  render () {
    return (
      <LoginScreen handleSubmit={this.onhandleSubmit} />
    )
  }
}
const mapStateToProps = state => ({
  userName: state.User.firstName

})
const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(TodoRedux.addTodo(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
