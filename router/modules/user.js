const express = require('express')
const router = express.Router()
const UserModel = require('../../db/module/userModel.js')
const {JWTInfo} = require('../../utils/tokenUtil.js')
// 登录请求
router.post('/login', (req, res) => {
    // 查询数据库中是否存在该用户
    UserModel.findOne({username: req.body.username, password: req.body.password}).then(data => {
        if (data) {
            // 生成token                          将用户的信息及id存储在token中
            const token = JWTInfo.create({username: req.body.username, _id: data._id}, {expiresIn: '1h'})
            res.json({
                success: true,
                data: {
                    username: req.body.username,
                    roles: req.body.username === 'admin' ? ['admin'] : ['common'],
                    accessToken: token,
                    refreshToken: token,
                    expires: new Date().getTime()
                }
            })
        } else {
            res.json({
                success: false,
                msg: "用户名或密码错误",
                data: null
            })
        }
    }).catch(err => {
        console.log(err)
        res.json({
            success: false,
            msg: "用户名或密码错误",
            data: null
        })
    })
})


// 注册请求
router.post('/register', (req, res) => {
    if (req.body.username && req.body.password) {
        UserModel.findOne({username: req.body.username}).then(data => {
            if (data) {
                res.json({
                    success: false,
                    msg: "用户名已存在",
                    data: null
                })
            } else {
                UserModel.create({...req.body}).then(data => {
                    res.json({
                        success: true,
                        msg: "注册成功",
                        data
                    })
                })
            }
        })
    } else {
        res.json({
            success: false,
            msg: "用户名或密码不能为空",
            data: null
        })
    }
})


// 刷新token请求
router.post('/refreshToken', (req, res) => {
    // if (req.body.refreshToken) {
    //
    // }
    res.json({
        success: true,
        msg:null,
        data: {}
    })
})

const permissionRouter = {
    path: "/permission",
    meta: {
        title: "权限管理",
        icon: "lollipop",
        rank: 10
    },
    children: [
        {
            path: "/permission/page/index",
            name: "PermissionPage",
            meta: {
                title: "页面权限",
                roles: ["admin", "common"]
            }
        },
        {
            path: "/permission/button/index",
            name: "PermissionButton",
            meta: {
                title: "按钮权限",
                roles: ["admin", "common"],
                auths: ["btn_add", "btn_edit", "btn_delete"]
            }
        }
    ]
};
// 获取路由信息
router.get("/getAsyncRoutes", (req, res) => {
    console.log("进入获取路由信息接口了")
    res.json({
        success: true,
        data: [permissionRouter]
    })
})

module.exports = {
    router
}
