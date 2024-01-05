const mongoose = require('mongoose');
const {DBHOST,DBPORT,DBNAME} = require('../config/db')
// todo 连接数据库
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

const checkMongoConnectedStatus = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected success!')
            resolve()
        })
        mongoose.connection.on('error',(err)=>{
            console.log('MongoDB connected fail!',err)
            reject(err)
        })
        mongoose.connection.on('disconnected',(err)=>{
            console.log('MongoDB connected disconnected!')
            reject(err)
        })
    })
}

module.exports = {
    checkMongoConnectedStatus
}
