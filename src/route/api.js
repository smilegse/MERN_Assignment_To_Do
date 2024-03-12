const express = require('express');
const UserController = require('../controller/UserController');
const ToDoController = require('../controller/ToDoController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router=express.Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/verifyEmail/:email", UserController.verifyEmail);
router.get("/verifyOTP/:email/:otp", UserController.verifyOTP);
router.get("/resetPassword/:email/:otp/:password", UserController.passwordReset);

// After Login
router.get("/profileDetails",AuthMiddleware,UserController.profileDetails);
router.post("/profileUpdate",AuthMiddleware,UserController.profileUpdate);


// To Do api end point

router.get("/selectToDos",AuthMiddleware,ToDoController.selectToDos);
router.post("/createToDo",AuthMiddleware,ToDoController.createToDo);
router.post("/updateToDo/:id",AuthMiddleware,ToDoController.updateToDo);
router.delete("/deleteToDo/:id",AuthMiddleware,ToDoController.deleteToDo);

module.exports = router;