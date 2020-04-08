import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import NavBar from '../Components/Navbar'

class MarketingScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <div>
        <NavBar restrict={false} />
        <h1>MarketingScreen</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.todo.firstName
})
const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(TodoRedux.addTodo(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketingScreen)
