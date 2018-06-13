var express = require('express');
var router = express.Router();
var users = require('../database/model/users')




router.get('/get',(req,res)=>{
    
    //    let{id}= req.session.user._id
    //    console.log(req.session.user._id)
        users.find({_id:req.session.user._id}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    

    
    
})


module.exports= router