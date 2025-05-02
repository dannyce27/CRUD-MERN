import jsonwebtoken from "jsonwebtoken"
import bcrypt, { compareSync }  from "bcryptjs"

import clientsModel from "../models/Clients.js"
import employeesModel from "../models/Employees.js"

import { sendEmail, HTMLRecoverEmail } from "../utils/mailPasswordRecovery.js"
import { config } from "../config.js"

 const PasswordRecoveryController = {};

 PasswordRecoveryController.requestCode = async (req,res) => {

    const {email } = req.body

    try {
        let userType;
        let userFound;

        userFound = await clientsModel.findOne({email})
        if(userFound){
            userType = "client"
        }else{
            userFound = await employeesModel.findOne({email})
            if (userFound) {
                userType = "employee"
            }
        }

        if (!userFound) {
            res.json ({message: "User not found"})
            
        }

        const code = Math.floor(10000*Math.random() * 90000).toString()

        const token = jsonwebtoken.sign(


            {email, code, userType, verified: false},

            config.JWT.secret,

            {expiresIn: "10"}

            


        )

        res.cookie("tokenRecoveryCode", token, {maxAge: 20*60*1000})

        await sendEmail(

            email,
            "You verification code",
            "Hi!, remember: Dont Forget your Password.",
            HTMLRecoverEmail(code)


        )

    } catch (error) {
        console.log("Error" + error)
    }
 }

 PasswordRecoveryController.verifyCode = async (req, res) => {
    const  {code} = req.body;
    try {
        const token = req.cookies.tokenRecoveryCode

        const decoded  =jsonwebtoken.verify(token, config.JWT.secret)

        if (decoded.code !== code) {
            return res.json({message: "Invalid Code"})
            
            
        }

        const  newToken  = jsonwebtoken.sign(

            {email: decoded.email,
             code: decoded.code,
             userType: decoded.userType,
             verified: true


            },
            config.JWT.secret,
            {expiresIn: "20m"}
        )
           
        res.cookie("TokenRecoveryCode", newToken, {maxAge:20*60*1000})

        await sendEmail(
            email,
            "your verification code",
            "hello! remember don forget your password",
            HTMLRecoverEmail.code
        )


        res.json({message: "Code verified succesfully"})
        
    } catch (error) {

        console.log("error" + error)
        
    }
 };
 
 PasswordRecoveryController.newPassword = async (req, res) => {
    const {newPassword } = req.body;

    try {
        const token = req.cokiees.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        
        if(decoded.verified){
            return res.json({message: "Code not verified"})
        }

        const {email, userType} = decoded;


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let updatedUser;

        if (userType == "client") {

            updatedUser = await clientsModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
            
        }else if(userType == "employee") {

            updatedUser = await employeesModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
            
        }

        res.clearCookie("tokenRecoveryCode");

        res.json({message: "ur password has been updated"})
    } catch (error) {
        console.log("error" + error)
    }
 }

 export default PasswordRecoveryController;