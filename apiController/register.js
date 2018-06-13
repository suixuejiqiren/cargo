var express = require('express');
var router =express.Router();
var validator = require('validator');
var users=require('../database/model/users');

router.post('/register',(req,res)=>{
    let {name,phone,pwd,address,idNum,type}=req.body;
    if(!phone||!validator.isMobilePhone(phone,'zh-CN')){
        res.json({
            data:"手机号码不合法",
            code:400,
            msg:"手机号码不合法",
            ret:false
        })
        return
    }
    else if(!name||validator.isEmpty(name.trim())){
        res.json({
            data:"请输入用户名",
            code:400,
            msg:"请输入用户名",
            ret:false
        })
        return
    }
    else if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            data:"请输入密码",
            code:400,
            msg:"请输入密码",
            ret:false
        })
        return
    }
    else{
        users.findOne({phone},(err,data)=>{
            if(err){
                res.json({
                    data: err,
                    msg: 'false',
                    code: 500,
                    ret: false
                })
                return
            }
            if(data !=null){
                res.json({
                    data: '该用户名已被注册',
                    msg: '该用户名已被注册',
                    code: 400
                })
            }
            else{//可注册部分
                users.create({name,phone,pwd,address,idNum,type},(err,createData)=>{
                    res.json({
                        data:"注册成功",
                        code:200,
                        msg:'success',
                        ret:true
                    })
                })
            }
        })
    }
})
module.exports=router;