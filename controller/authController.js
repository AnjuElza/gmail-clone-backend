import userModel from '../model/user.js';
import {hashPassword, comparePassword} from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

//Register endpoint
  const registerUser= async (req, res) =>{
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        console.log({ name, email, password });
        //Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            });
        }
        //Check if password was entered correctly
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            });
        }
        //Check if email was entered correctly
        const existEmail = await userModel.findOne({ email });
        if (existEmail) {
            return res.json({
                error: 'Email was taken already'
            });
        } else if (!email) {
            return res.json({
                error: 'Email is required'
            });
        }
        const user = await userModel.create({
            name, email, password: hashedPassword
        });
        return res.json(user);

    } catch (error) {
        console.log(error);
    }
}

//login endpoint

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        //Check if user exists
        const user1 = await userModel.findOne({email});
        if(!user1){
            return res.json({
                error: 'User not found'
            })
        }
        //Check if password matches
        const match= await comparePassword(password,user1.password)
        if(match){
            const token= jwt.sign({email:user1.email, id:user1._id, name:user1.name},
                process.env.JWT_SECRET);
                // process.env.JWT_SECRET,
                // {},(err,token)=>{
                //     if(err)
                //     throw err;
                //     res.cookie('token',token).json(user1)
                //     // console.log('inside login');
                // });
                res.send({message:"Succesful login", token:token});
        }else if(!match){
            res.json({
                error: 'Passwords do not match'
            })
        }
    }catch (error) {
        console.log(error);
    }
    // console.log(res.cookies);

}

// const getProfile= (req, res) =>{
//     // const {token} = req.cookies
   
//     const { token } = req.cookies['token']
//     console.log(token)
//     if(token){
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>{
//             if(err){
//                 throw err;
//             }
//             res.json(user);

//         })
//     }else{
//         res.json(null)
//     }
// }


export {registerUser, loginUser};