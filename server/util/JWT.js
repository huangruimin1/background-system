const jsonwebtoken = require("jsonwebtoken");
const scret = "huangruimin";
const pxprires =  '5h';
const JWT = {
    generate(value){
        var str = jsonwebtoken.sign(value,scret,{expiresIn: pxprires});
        return str;
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