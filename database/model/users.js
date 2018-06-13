var mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
    pwd:{
        type: String
     },
     img:{
        type: String
     },
     name:{
        type: String
     }, 
    address:{            //地址
        type:String
     },                     
     phone:{
         type:String,
        require:true,
        unique:true,//唯一的
        index:true //增加索引，优化查询
     },
     type:{
        type:String,
    },
    idNum:{
        type:String,
        unique:true,
    },
},
{versionKey:false, timestamps: {createAt: "createTime",updateAt: "updateTime"}}
)
module.exports = mongoose.model('users',userSchema,'users')