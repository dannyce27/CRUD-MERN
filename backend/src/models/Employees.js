import { model, Schema} from "mongoose"

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
    adress: {
        type: String,
        require: true
    },
    hireDate: {
        type: Date,
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
        type: Number,
        require: true
    },
    isssNumber: {
        type: Number,
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

export default model("Employees", productsSchema);