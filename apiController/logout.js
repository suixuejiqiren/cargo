
var express = require('express');
var router =express.Router();
var session = require('express-session')


router.post('/logout',(req,res,next)=>{
 req.session.user=null
 res.json({
    data: '退出登录',
    code: 200,
    msg: '注销成功',
    ret: true
})
    
})


module.exports=router