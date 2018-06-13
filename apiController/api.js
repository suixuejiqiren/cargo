const {Router} = require("express");
const router = Router();
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);



router.use(session({
    secret:'lzx',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600*1000*24*30} ,//是否为安全的cookie(是不是HTTPS)不是则false
    expires: 3600*1000*30,
    store: new MongoStore({
      url: 'mongodb://localhost/dangcrm',
      ttl: 60*60*24*30
  })
  }))

  router.use("/user", require("./register"));
  router.use("/user", require("./login"));
  router.use("/user", require("./islogin"));


  router.use((req,res,next)=>{
    if(req.session.user){  
        next();
     }   
    else{
        res.json({
            isLogin:false,
            data: '未登录',
            code: 400,
            ret: false})
            return
      }
})

router.use("/goods", require("./goods"));
router.use("/user", require("./logout"));
router.use("/pwd", require("./changepwd"));
router.use("/user", require("./userget"));
module.exports = router;