const jwt = require('jsonwebtoken')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
// todo 这个地方需要使用path.resolve拼接下 不然会报错 找不到文件
const {secret} = yaml.load(fs.readFileSync(path.resolve(__dirname,'../config/secret.yaml'), 'utf-8'))
// todo 定义创建、验证和解析令牌的类
class JWT {
  constructor() {
    this.secret = secret
  }
     create(payload, options) {
        return jwt.sign(payload, this.secret, options)
    }

     verify(token) {
        return jwt.verify(token, this.secret)
    }

     decode(token) {
        return jwt.decode(token)
    }
}
const JWTInfo = new JWT()
module.exports = {
  JWTInfo
}
