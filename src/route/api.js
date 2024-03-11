const express = require('express');
const UserController = require('../controller/UserController')


const router=express.Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/profileUpdate", UserController.profileUpdate);
router.get("/verifyEmail/:email", UserController.verifyEmail);
router.get("/verifyOTP/:email/:otp", UserController.verifyOTP);
router.get("/resetPas/:email/:otp/:password", UserController.passwordReset);

//router.post("/createToDo", UserController.create);



module.exports = router;