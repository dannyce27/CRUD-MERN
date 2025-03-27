import {model, Schema} from "mongoose"

const productsSchema = new Schema({

    name:{
        type: String,
        require: true
        

    },
    lastName: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true

    },
    email: {
        type: String,
        require: true
        

    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    dui: {
        type: String,
        min: 10,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true
    }
    



    
}, {
    timestamps: true,
    strict: false
})

export default model("Clients", productsSchema);