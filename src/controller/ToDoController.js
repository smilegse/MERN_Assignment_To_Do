const ToDoModel = require("../model/ToDoModel");
const jwt = require('jsonwebtoken');


exports.selectToDos = async (req, res)=>{
    try {
        let email = req.headers['email'];
        //console.log(email);
        let result = await ToDoModel.find({email: email});
        //console.log(result);
        res.json({status:"success", data: result});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.createToDo = async (req, res)=>{
    try {
        let reqBody = req.body;
        await ToDoModel.create(reqBody);
        res.json({status:"success", message: "To Do Created"});

    } catch (error) {
        res.json({status:"fail", message:error})
    }
}


exports.updateToDo = async (req, res)=>{
    try {
        let {id} = req.params;
        let reqBody = req.body;
        let result = await ToDoModel.updateOne({_id: mongodb.ObjectID(id)},reqBody);
        res.json({status:"success", message: "To Do Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.deleteToDo = async (req, res)=>{
    try {
        let {id} = req.params;
        let todo = await ToDoModel.find({_id:mongodb.ObjectID(id)});
        console.log(todo);
        await ToDoModel.deleteOne({"_id":mongodb.ObjectID(id)},reqBody);
        res.json({status:"success", message:"Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }

}
