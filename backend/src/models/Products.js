import {sistema, model, Schema} from "mongoose"

const productsSchema = new Schema({

    name:{
        type: String,
        require: true
        

    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true

    },
    stock: {
        type: Number,
        require: true,
        min: 1

    }
    



    
}, {
    timestamps: true,
    strict: false
})

export default model("Products", productsSchema);