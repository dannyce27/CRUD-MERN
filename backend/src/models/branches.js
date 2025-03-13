import {sistema, model, Schema} from "mongoose"

const productsSchema = new Schema({

    name:{
        type: String,
        require: true
        

    },
    adress: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        max: 9,
        require: true
    },
    schedule: {
        type: String,
        require: true
    }
    



    
}, {
    timestamps: true,
    strict: false
})

export default model("Branches", productsSchema);