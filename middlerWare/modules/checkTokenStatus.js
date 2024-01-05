const {JWTInfo} = require('../../utils/tokenUtil.js')
const yaml = require('js-yaml')
const fs = require("fs");
const path = require("path");
const {secret} = yaml.load(fs.readFileSync(path.resolve(__dirname,'../../config/secret.yaml'), 'utf-8'))
// 定义请求路由白名单
const whiteList = ['user/login','/user/register']
const checkTokenStatusMiddleWare = (req,res,next) => {
    console.log(req.path,"请求的路径")
    // 说明是白名单请求 直接放行
    if(whiteList.includes(req.path) >=0) {
        next()
        return
    }
    const token = req.headers?.Authorization;
    console.log(token,"token")
    if (token) {
        JWTInfo.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    //token is invalid
                    res.status(401).json({code:'9999',msg:"token过期，请重新登录",data:null})
                } else {
                    //token is valid
                    // req.decodedToken = decodedToken;
                    next();
                }
            }
        )
    } else {
        res.status(500).json({
            success:false,
            msg:'请求出错，请稍后重试',
            data:null
        })
    }
}

module.exports = {
    checkTokenStatusMiddleWare
}
