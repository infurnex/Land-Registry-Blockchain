var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.CreateJWT = (ProfileName)=>{
const token = jwt.sign({profile_name : ProfileName} , process.env.SECRET_KEY , { expiresIn: '0.5h' });
    return token;
}

module.exports.Auth = async (req , res , next) =>{
    try{
        const token = req.cookies.IndianLandRegistry;
        if(token == undefined){
            res.send('loginError')
        }
        else{
            verify = jwt.verify(token , process.env.SECRET_KEY);
            next();
        }
    }
    catch(e){
        console.log(e);
        return "error";
    }
}

module.exports.getUser = (req) =>{
    try{
        const token = req.cookies.IndianLandRegistry;
        const verify = jwt.verify(token , process.env.SECRET_KEY);
        return(verify)
    }
    catch(e){
        console.log(e);
    }
}