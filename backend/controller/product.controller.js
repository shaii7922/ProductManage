const productSchema = require("../model/product.model");

const asyncHandler = require("express-async-handler");

// Making a new product here
exports.newProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;

  console.log(`Here are name and price of product for console  ${name},${price}`);
  
  if (!name || !price) {
    return res.status(400).json({ message: "Name and Price are required" });
  }

  // Create a new product
  const newOne = await productSchema.create({
    name,
    price,
    description,
  });
  console.log(newOne);
  res.status(201).json({ success: true, message: "User Registered", newOne });
});



// fetch all the product
exports.getAllProduct = asyncHandler(async (req, res) => {
  const products = await productSchema.find();

  if (products.length == 0)
    return res.status(200).json({ message: "No Product found" });

  res
    .status(200)
    .json({ success: true, message: "all products fetched", products });
});



// delete product by id
exports.deleteProduct = asyncHandler(
    async(req,res)=>{
        let {id} = req.params
        let findProduct = await productSchema.findOne({_id:id})

        if(!findProduct) return res.status(400).json({message:"no todo found"})

            let deleteProduct = await productSchema.deleteOne({_id:findProduct._id})

            res.status(200).json({success:true,mnessage:"product deleted",deleteProduct})
    }
)
