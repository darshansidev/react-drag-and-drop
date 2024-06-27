const {  mongoose } = require('mongoose');
const Todo = require('../model/todo.model');


const createTodo = async (todoData) => {
    if (!todoData.title && !todoData.description) {
        return res.status(404).json({message : "Need Data Required....."})
    }
    
    const todo = new Todo(todoData);
              
    const collectionData = await todo.save();

    return collectionData;
}

const getTodo = async () => {

    const collectionData = await Todo.find();

    return collectionData;

}
const updateTodo = async (todoId, todoData) => {
    if (!todoId && !todoData.title && !todoData.description) {
        return res.status(404).json({message : "Need Data Required....."})
    }

    const collectionData = await Todo.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(todoId) }, { status : todoData.status }, { new: true });

    if (!collectionData) {
        return res.status(404).json({message : "Data not updated ....."})
    }

    return collectionData;
}



const deleteTodo = async (todoId) => {
       if (!todoId) {
        return res.status(404).json({message : "Need Data Required....."})
    }
    
    const collectionData = await Todo.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(todoId) }, {new :true});

     if (!collectionData) {
        return res.status(404).json({message : "Data not Deleted ....."})
    }

    return collectionData;
}




module.exports = { createTodo, getTodo, updateTodo, deleteTodo }



