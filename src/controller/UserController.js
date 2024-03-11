const UsersModel = require("../model/UsersModel");
const jwt = require('jsonwebtoken')

exports.registration = async (req, res)=>{
    try {
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        res.json({status:"success", message: "Registration Completed"});

    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.login = async (req, res)=>{
    try {
        let reqBody = req.body;
        let users = await UsersModel.find(reqBody);
        if(users.length>0){
            // JWT Token
            let Payload = {exp:Math.floor(Date.now()/1000)+(24*60*60),data: reqBody['email']}
            let token = jwt.sign(Payload,"123-xyz");
            res.json({status:"success", message: "User found", token: token});
        }else{
            res.json({status:"success", message:"No user found"})
        }
        res.json({status:"success", message:users})

    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.profileDetails = (req, res)=>{

}

exports.signOut = (req, res)=>{

}

exports.profileUpdate = (req, res)=>{

}



exports.verifyEmail = (req, res)=>{

}

exports.verifyOTP = (req, res)=>{

}

exports.passwordReset = (req, res)=>{

}
