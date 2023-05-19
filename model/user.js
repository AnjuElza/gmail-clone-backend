import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
name:String,
email:{
    type:String,
    unique:true
},
password:String
})

const UserModel = mongoose.model('User', userSchema);

export default UserModel;