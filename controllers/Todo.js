const todoModel = require('../models/Todo');
const mongoose = require("mongoose");


module.exports = {
    getAlltodos(req, res){
        todoModel.find().exec()
        .then(response =>{
            console.log(response)
            res.status(200).json(response);
        }).catch( err =>{
            res.status(500).json({
                error: err
            })
            
        });
    },

    getIndividualtodo(req, res){
        const id = req.params.userId;
        todoModel.findById(id).exec()
        .then(response =>{
            console.log(response)
            res.status(200).json(response);
        }).catch(err =>{
            res.status(500).json({
                error: err
            });
        })
            
    },

    addtodoItem(req,res){
      const newtodo = new todoModel({
            _id: new mongoose.Types.ObjectId(),
            todoItem: req.body.todoItem,
            userId: req.body.userId,
      })
       newtodo.save().then(response =>{
        console.log("add add item")
        console.log(response)
        res.status(200).json(response);
        }).catch(err =>{
            res.status(500).json({
                error: err
            });
        })
       
    },

    deleteTodo(req,res){
        const id = req.params.itemId;
        todoModel.remove(id).exec()
        .then(response =>{
            console.log(response)
            res.status(200).json(response);
        }).catch(err =>{
           res.status(500).json({
                error: err
           }); 
        })
            
    }

}
