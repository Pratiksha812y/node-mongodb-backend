const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const User = require('./models/User')
const productRoutes =require('./routes/productRoutes')


const server=express();
server.use(express.json())
server.use(cors())
server.use(bodyParser.json());
server.use('/',productRoutes)

mongoose.connect('mongodb+srv://pratiksha:Pratiksha%40123@leadsoft.bfw87k4.mongodb.net/').
then(()=>console.log('Database Connected')).catch((err)=>console.log(err))

server.post('/register',async(req,res)=>{
    try{
          const{fullName,userName,age,password}=req.body
         
          const userObj=new User({fullName,userName,age,password})
          const userExist=await User.findOne({userName})
          if(userExist){
            return res.json({
              status:false,message:"User already exist"
            })
        }
          await userObj.save()
          res.json({
            status:true,message:"User registered successfully"
        })
    }
    catch(err){
          res.json({
              status:false,
              message: err
          })
    }
})
server.post('/login',async(req,res)=>{
    
         const {userName,password}=req.body
         const userExist=await User.findOne({userName})
         if(!userExist){
             return res.json({
                status:false,message:"User not Found"
             })
            }
             if(password!==userExist.password){
                return res.json({
                    status:false,
                    message:"Wrong password"
                })
                
             }
             res.json({
                status:true,message:"Login Successful"
             })
            })


server.listen(8055, () => {
    console.log('Server is running on http://localhost:8055');
});