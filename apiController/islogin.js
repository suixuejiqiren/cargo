var express = require('express');
var router =express.Router();
var session = require('express-session')


router.get('/isLogin',(req,res,next)=>{
    if(req.session.user==null){
        res.json({
            data:'未登录',
            code:201,
            msg:'未登录',
            ret:false
        })
    }
    else{
        res.json({
            data:req.session.user,
            code:200,
            msg:'已登录',
            ret:true
        }) 
    }
    
})


router.get('/sijiLogin',(req,res,next)=>{
    if(req.session.user.type==3){
        res.json({
            data:req.session.user,
            code:200,
            msg:'已登录司机用户',
            ret:true
        })
    }
    else{
        res.json({
            data:'司机用户未登录',
            code:201,
            msg:'司机用户未登录',
            ret:false
        }) 
    }
    
})
module.exports=router