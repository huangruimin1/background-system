var svgCaptcha = require('svg-captcha')

const verification = {
    getCode: function(req, res){
        var options = {
            size: 4, // 4个字母
            noise: 4, // 干扰线2条
            color: true, // 文字颜色
            background: "#cc9966", // 背景颜色
            // charPreset:"abcd"
          }
          var captcha = svgCaptcha.create(options) //字母和数字随机验证码
          // var {text,data} = captcha
          // console.log(text,data); //text表示文本,ta表示图片数据
          req.session.verCode = captcha.text.toLowerCase();
          res.type("svg")
          // res.cookie('myCookie', 'hello', { maxAge: 3600000 });
          res.send({
            // text:captcha.text,
            img:captcha.data
          })
    }
}

module.exports = verification; 