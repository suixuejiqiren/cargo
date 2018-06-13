var mongoose =require('mongoose');

var goodSchema = new mongoose.Schema({
    begin:{
        type: String
     },
     arrive:{
        type: String
     },
     type:{
        type: String
     }, 
    weight:{            
        type:String
     },                     
     phone:{
         type:String,
     },
     now:{
         type:String
     }
},
{versionKey:false, timestamps: {createAt: "createTime",updateAt: "updateTime"}}
)
module.exports = mongoose.model('goods',goodSchema,'goods')