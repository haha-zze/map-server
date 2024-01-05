const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 80
const { checkMongoConnectedStatus } = require('./db/db.js')
const {checkTokenStatusMiddleWare,testMiddleWare} = require('./middlerware/index')
// todo 连接上数据库之后再去启动服务
checkMongoConnectedStatus().then(_=>{
    // 注册全局中间件
    // fixme 这里有一个需要注意的点 就是全局中间件和注册路由是有先后顺序的 中间件一定要注册在路由之前
    // fixme 这里还有一个坑 就是如果一个全局中间件中间哪一步比如说抛出错误没有next  那么后面的全局中间件就不会执行 感觉中间件是同步任务 按照注册顺序执行的
    app.use(checkTokenStatusMiddleWare)

    // 注册路由
    const {routers} = require('./router/index')
    for (const routersKey in routers) {
        app.use(`/${routersKey}`,routers[routersKey].router)
    }

    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`)
    })

}).catch(err=>{
    console.log(err)
})
