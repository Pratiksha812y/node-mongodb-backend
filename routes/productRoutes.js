const express=require('express')
const Product=require('../models/Product')
const router=express.Router()

router.post('/product/add',async(req,res)=>{
    try{
         const{productName,productPrice,productUnit,productDescription}=req.body

        
         const productExist= await Product.findOne({productName})
         if(productExist){
            return res.json({
              status:false, message:"Product already exist"
            })
        }
        const prodObj=new Product({productName,productPrice,productUnit,productDescription})
        await prodObj.save()

        res.json({
          status:true,message:"Product added successfully"
      })       
    }  
    catch(err){
        res.json({
            status:false,
            message: err.message||"server error"
        })
  }
})
  router.get('/product/get',async(req,res)=>{
    try{
            const results=await Product.find()
            res.json({
                status:true,message:results
            })
    }
    catch(err){
        res.json({
            status:false,
            message: err.message || "server error"
        })
  }
  })


module.exports=router;