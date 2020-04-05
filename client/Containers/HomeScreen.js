import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import NavBar from '../Components/Navbar'


class HomeScreen extends Component {

  constructor (props) {
    super(props)

    this.state = {};
  }

  
  render () {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.User.firstName
})
const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(TodoRedux.addTodo(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)