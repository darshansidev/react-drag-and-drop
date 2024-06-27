const todoServices = require('../service/todo.service');




const addTodo = async(req,res,next)=>{
    try {
        const todoData = req.body;

        const data = await todoServices.createTodo(todoData);

        return res.status(200).json({ data: data, message: "Data Create Successfully" });

    } catch (error) {
        next(error)
    }
}

const getTodo = async(req,res,next)=>{
    try {
        const data = await todoServices.getTodo();

        return res.status(200).json({ data: data, message: "Data Fetch Successfully" });
        
    } catch (error) {
        next(error)
    }
}

const updateTodo = async(req,res,next)=>{
    try {
        const todoId = req.params.todoId;
        const todoData = req.body;


        const data = await todoServices.updateTodo(todoId, todoData);

        return res.status(200).json({ data: data, message: "Data Update Successfully" });
        
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async(req,res,next)=>{
    try {
        const todoId = req.params.todoId;

        const data = await todoServices.deleteTodo(todoId);

        return res.status(200).json({ data: data, message: "Data Delete Successfully" });
        
    } catch (error) {
        next(error)
    }
}




module.exports = {addTodo , getTodo , updateTodo , deleteTodo}