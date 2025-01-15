const {Router} = require("express")
const { getAllProduct, newProduct, deleteProduct } = require("../controller/product.controller")

const router = Router()


// Rote for create a new product.
router.post('/',newProduct)


router.get('/',getAllProduct);


router.delete("/:id",deleteProduct)

module.exports = router