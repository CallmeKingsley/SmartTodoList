const TodoModel = require('../Models/Todo')
const UserModel = require('../Models/User')

module.exports = {

  getTodos: async (req, res) => {
    try {
      const todos = await TodoModel.find({})
      res.status(200).json({
        todos
      })
    } catch (err) {
      res.status(204).json({
        error: err
      })
    }
  },
  addTodo: async (req, res) => {
    try {
      // the user that created the todos id
      const userId = req.params.userId

      // todo item added
      const todo = new TodoModel({
        createdTime: Date(),
        todoItem: req.body.todoItem
      })

      // find the user info using the id
      const userInfo = await UserModel.findById(userId)

      // added user to todo as creator
      todo.creator = userInfo

      // save todo
      await todo.save()

      // add todo to user
      userInfo.createdTodos.push(todo)

      // save updated user
      await userInfo.save()

      res.status(200).json({
        todo,
        message: 'added todo successfully'
      })
    } catch (e) {
      res.status(500).json({
        error: e,
        message: 'could\'t add todo'
      })
    }
  },
  getUserTodos: async (req, res) => {
    try {
      // the user that created the todos id
      const userId = req.params.userId
      console.log(userId)
      // find the user info using the id and retrive todos
      const userInfo = await UserModel.findById(userId).populate('createdTodos')

      res.status(200).json({
        userInfo
      })
    } catch (err) {
      res.status(204).json({
        error: err
      })
    }
  }
}
