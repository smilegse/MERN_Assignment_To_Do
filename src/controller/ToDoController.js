const ToDoModel = require("../model/ToDoModel");
const jwt = require('jsonwebtoken');


exports.selectToDos = async (req, res)=>{
    try {
        let email = req.headers['email'];
        let result = await ToDoModel.find({email: email});
        res.json({status:"success", data: result});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.createToDo = async (req, res)=>{
    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        reqBody.email = email;
        await ToDoModel.create(reqBody);
        res.json({status:"success", message: "To Do Created"});

    } catch (error) {
        res.json({status:"fail", message:error})
    }
}


exports.updateToDo = async (req, res)=>{
    try {
        let email=req.headers['email'];
        let {id} = req.params;
        let reqBody = req.body;
        await ToDoModel.updateOne({_id:id,email:email},reqBody);
        res.json({status:"success", message: "To Do Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}


exports.updateToDoStatus = async (req, res)=>{
    try {
        let email=req.headers['email'];
        let {id,status} = req.params;
        await ToDoModel.updateOne({_id:id,email:email},{status: status});
        res.json({status:"success", message: "To Do Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.deleteToDo = async (req, res)=>{
    try {
        let email=req.headers['email'];
        let {id} = req.params;
        await ToDoModel.deleteOne({"_id":id, email:email});
        res.json({status:"success", message:"To Do Delete Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }

}
