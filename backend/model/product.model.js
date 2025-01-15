const {Schema,model} = require('mongoose')

const product_Schema = new Schema({
    name:{
        type:String,
        required:[true,"Name field is required"],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name cannot be longer than 100 characters'],


    },
    price: {
        type: Number,
        required: [true, 'Price field is required'],
        min: [0, 'Price must be a positive number'],
        validate: {
          validator: function (v) {
            return /^[0-9]+(\.[0-9]{1,2})?$/.test(v); // Ensures price has at most two decimal places
          },
          message: 'Price must be a valid number with at most two decimal places',
        },
      },



    description:{
        type:String,
        maxlength: [500, 'Description cannot be longer than 500 characters'],
    }
},

{timestamps:true}

)

module.exports = model("Product",product_Schema)