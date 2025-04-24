import jsonwebtoken from "jsonwebtoken"
import bcrypt  from "bcryptjs"

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

 export default PasswordRecoveryController;