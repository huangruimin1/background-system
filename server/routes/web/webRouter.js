var express = require('express');
var webRouter = express.Router();

webRouter.post('/', (req,res)=>{
    res.send('ok')
});

module.exports = webRouter;