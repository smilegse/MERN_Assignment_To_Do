const UsersModel = require("../model/UsersModel");
const jwt = require('jsonwebtoken');
const SendEmailUtility = require("../utility/EmailSend");
const OTPModel = require("../model/OTPModel");

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
        let user = await UsersModel.find(reqBody);
        if(user.length>0){
            // JWT Token
            let Payload = {exp:Math.floor(Date.now()/1000)+(24*60*60),data: reqBody['email']}
            let token = jwt.sign(Payload,"123-xyz");
            res.json({status:"success", message: "User found", token: token});
        }else{
            res.json({status:"success", message:"No user found"})
        }
        res.json({status:"success", message:user})

    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.profileDetails = async (req, res)=>{
    try {
        let email = req.headers['email'];
        //console.log(email);
        let result = await UsersModel.find({email: email});
        //console.log(result);
        res.json({status:"success", data: result});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.profileUpdate = async (req, res)=>{
    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        await UsersModel.updateOne({email:email},reqBody);
        res.json({status:"success", message:"Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }

}



exports.verifyEmail = async (req, res)=>{
    try {
        const {email} = req.params;
        //let reqBody = req.body;
        let user = await UsersModel.find({email: email});
       if(user.length>0){
            //send email
            let otp= Math.floor(100000 + Math.random() * 900000)
            await SendEmailUtility(email, `Your PIN: ${otp}`, 'MERN 5 To Do OTP Code');
            await OTPModel.create({email: email, otp: otp, status: 'active'});
            res.json({status:"success", message:"Verification code has been sent to your email"});
       }else {
            res.json({status:"success", message:"No user found"})
       }
        res.json({status:"success", message:"Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}



exports.verifyOTP = async (req, res)=>{
    try {
        const {email,otp} = req.params;
        //let reqBody = req.body;
        let otpUser = await OTPModel.find({email: email,otp: otp, status: 'active'});
       if(otpUser.length>0){
            //update otp status
            await OTPModel.updateOne({email: email, otp: otp}, {status: 'verified'});
            res.json({status:"success", message:"OTP Verification Success"});
       }else {
            res.json({status:"success", message:"Invalid OTP Code"})
       }
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.passwordReset = async (req, res)=>{
    try {
        const {email,otp,password} = req.params;
        //let reqBody = req.body;
        let otpUser = await OTPModel.find({email: email,otp: otp, status: 'verified'});
       if(otpUser.length>0){
            // Update Password
            await UsersModel.updateOne({email:email},{password:password});
            //delete OTP
            await OTPModel.deleteOne({email: email, otp: otp});
            res.json({status:"success", message:"Password has been updated"});
       }else {
            res.json({status:"success", message:"Invalid request"})
       }
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.signOut = (req, res)=>{

}
