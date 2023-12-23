const verifyToken = require('../middleware/verifyToken');
const Product = require('../models/Product');

const router =require('express').Router();

//add product

router.post("/addproduct",verifyToken,async(req,res)=>{
    const newProduct = new Product({
        productName: req.body.productName,
        productImg: req.body.productImg,
        productStatus: req.body.productStatus,
      });

      try {
        const savedProduct = await newProduct.save();
        if (savedProduct) {
          res.status(200).json(savedProduct);
        }
      } catch (err) {
        res.status(500).json(err);
      }
})

//get all product

router.get("/getAllProduct", verifyToken, async (req, res) => {
    try {
      const allProducts = await Product.find();
      if (allProducts) {
        res.status(200).json(allProducts);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //delete product by id
router.delete("/deleteProduct/:productId", verifyToken, async (req, res) => {
    let productId = req.params.productId;
    try {
      await Product.findByIdAndDelete({ _id: productId });
      res.status(200).send({ message: "Product Deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get product by Id
  router.get("/getProductWithId/:productId", verifyToken, async (req, res) => {
    let productId = req.params.productId;
  
    try {
      const getProduct = await Product.find({ _id: productId });
      if (getProduct) {
        res.status(200).json(getProduct);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update product y id
  router.patch("/updateOneField/:productId", verifyToken, async (req, res) => {
    let productId = req.params.productId;
    const {productName,productImg,productStatus} =req.body;
    try {
       productName &&   
        ( updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                productName
            },
            { new: true }
        ))

        productImg &&   
        ( updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                productImg
            },
            { new: true }
        ))

        productStatus &&   
        ( updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                productStatus
            },
            { new: true }
        ))
      if (updatedProduct) {

        res.status(201).json(updatedProduct);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update whole product y id

  router.put("/updateWholeProduct/:productId", verifyToken, async (req, res) => {
    let productId = req.params.productId;
    
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: req.body },
        { new: true }
      );
      if (updatedProduct) {
        
        res.status(201).json(updatedProduct);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;