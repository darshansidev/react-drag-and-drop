const router = require("express").Router();

const todoController = require('../controller/todo.controller');

router.get("/getTest" , (req ,res)=>{
    return res.status(200).json({ message: "Project Will be Run Properly inside Route" });
})


router.get("/get" , todoController.getTodo);
router.post("/add"  , todoController.addTodo);
router.put("/update/:todoId"  , todoController.updateTodo);
router.delete("/delete/:todoId"  , todoController.deleteTodo);

module.exports = router;
