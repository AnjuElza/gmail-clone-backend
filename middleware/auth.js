//check if token is valid
import jwt from "jsonwebtoken";
export const auth= (request,response,next) => {
    try{
        const token = request.header("x-auth-token");
        // console.log("token",token);
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(err){
        response.status(401).send({err:err.message});
    }
}