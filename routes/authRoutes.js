import express from 'express';
const router=express.Router();
import cors from 'cors';
const { registerUser, loginUser, getProfile} = require('../controller/authController').default;


//middleware
router.use(cors());

router.post('/register', registerUser)
router.post('/login', loginUser)  
router.get('/profile',getProfile) 
module.exports=router
