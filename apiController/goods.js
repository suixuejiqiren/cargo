
var express = require('express');
var router = express.Router();
var goods = require('../database/model/goods');

router.post('/add', (req, res) =>{
    let phone=req.session.user.phone;
    let{begin,arrive,type,weight,now}=req.body
    goods.create({begin,arrive,type,weight,phone,now},(err,data)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:"货物信息发布失败",
                ret:false
            })
            return
        }
        res.json({
            data:'success',
            code:200,
            msg:"货物信息发布成功",
            ret:true
        })
    })
})


router.get("/get",(req, res,next) => {
    let {page=1,pageSize=10,id} = req.query;
    if(id){
        goods.findOne({_id:id}).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
            return
        })
    }
        else{
            goods.find().limit(pageSize).skip((page-1)*pageSize).then(data => {
                res.json({
                    data: data,
                    code: 200,
                    msg: "success"
                })
            })
        }
})

//修改接口
router.post("/update",(req,res,next)=>{
    var {id,now}=req.body;

    goods.update({_id:id},{$set:{now}}).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"更新成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})



//删除接口
router.post("/del", (req, res, next) => {
    const {id} = req.body;
if(id){  
    goods.remove({_id: id}).then(data => {
    if(data.n > 0){
        res.json({
            data: "success",
            code: 200,
            msg: "删除成功"
        })
    }
    else {
        res.json({
            data: "不存在的id",
            code: 200,
            msg: "不存在的id"
        })
    }
}).catch(err => {
    new Error(err);
    next(err)
})}

else{
    goods.remove({}).then(data => {
        if(data.n > 0){
            res.json({
                data: "success",
                code: 200,
                msg: "删除成功"
            })
            return
        }
        else {
            res.json({
                data: "false",
                code: 400,
                msg: "false"
            })
        }
    })
}

})


module.exports = router;