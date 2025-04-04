//import de todas las librerias


import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import crypto from "crypto"

import clientModel from "../models/Clients.js"
import { config } from "../config.js"

const registerClientsController = {};

registerClientsController.registerClients = async (req, res) => {

    //1 - pedimos cosas que vamos a guardar

    const {name, lastName, birthday, email, password, phoneNumber, dui, isVerified} = req.body;

    try {
        const existsClient = await clientModel.findOne({email})
        if (existsClient) {
            
            return res.json({message: "Client already exist"})
        }
        const passwordHash = await bcrypt.hash(password, 10)

        const newClient = new clientModel ({

            name, lastName, birthday, email, password: passwordHash, phoneNumber, dui: dui || null, isVerified: isVerified || false

        })

        await newClient.save()

        const verificationCode = crypto.randomBytes(3).toString("hex")
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000; //2 hours

        const tokenCode = jsonwebtoken.sign({

            email, verificationCode, expiresAt},

            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (error, token) => {

                if (error) console.log("error"+ error);
                res.cookie("VerificationToken", token, { maxAge: 2 * 60 * 60 * 1000})
            }
              

        )

        //enviar correo
        const transporter = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: config.email.user,
                password: config.email.pass
            }
        })


        //Options : A quien se lo voy a enviar?

        const mailOptions = {
            from: config.email.user,
            to: email,
            subject: "Verificacion de Correo",
            text: `Para verificar que eres dueño de la cuenta utiliza este codigo: ${verificationCode}\n gracias por tu atencion (el codigo expira en 2 horas).`
        }

        //Enviar Correo

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) console.log("Error"+error)
                res.json("Email Sent")
        })

        res.json({message: "Client registered, please verify your email"})





        



   } catch (error) {
        res.json({message: "error"+error})
    } 
}


registerClientsController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body


    const token = req.cookies.VerificationToken;
    if(!token){
        return res.json({message: "Please, sign in"})
    }

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const {email, verificationCode, storedCode} = decoded;

        if (verificationCode !== storedCode) {

            return res.json({message: "Invalid verification code"})
            
        }

        const client = await clientModel.findOne({email})
        if (!Client) {
            return res.json({message: "Client not found"})
            
        }

        client.isVerified = true
        await client.save();


        res.clearCookie("Verification Token")

        res.json({message: "Email verified succesfully"})







    } catch (error) {
        res.json({message: "Error"+error})
    }
}


export default registerClientsController;