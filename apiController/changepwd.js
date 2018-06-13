
var express = require('express');
var router =express.Router();
var validator = require('validator');
var users=require('../database/model/users');



router.post('/update',(req,res)=>{
    let{pwd,newPwd} = req.body;
    if (!pwd||validator.isEmpty(pwd.trim())) {
        res.json({
            data:'旧密码不合法',
            code:400,
            msg:"旧密码不合法",
            ret:"false"
        })
        return
    }
    else if(!newPwd||validator.isEmpty(newPwd.trim())){
        res.json({
            data:'新密码不合法',
            code:400,
            msg:"新密码不合法",
            ret:"false"
        })
        return
    }

    else {
        let idNum=req.session.user.idNum
        users.findOne({idNum:idNum},(err,data)=>{
            if(err){
                res.json({
                    data:err,
                    code:500,
                    msg:err,
                    ret:false
                })
                return
            }
            if(data.pwd == pwd){
                users.update({idNum:idNum},{$set:{pwd:newPwd}},(err,updateData)=>{
                    res.json({
                        data:'密码修改成功',
                        code:200,
                        msg:'密码修改成功',
                        ret:true
                    })
                    return
                })
            }
            else{
                res.json({
                    data:'旧密码不正确',
                    code:400,
                    msg:'旧密码不正确',
                    ret:false
                })
                return
            }

        })
    }

    
})

module.exports = router;