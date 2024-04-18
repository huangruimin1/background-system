const jsonwebtoken = require("jsonwebtoken");
const scret = "huangruimin";
const pxprires =  '5h';
const JWT = {
    generate(value){
        return jsonwebtoken.sign(value,scret,{expiresIn: pxprires});
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,scret);
        }catch{
            return false;
        }
       
    }
}

module.exports = JWT;