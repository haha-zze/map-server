// todo 自动导入modules中所有的js文件的脚本 暴露方式使用module.exports = {}
const path = require('path');
// 获取 router 文件夹的路径
const routerFolderPath = path.resolve(__dirname, 'modules');
const {getExportFileName} = require('../utils/getExportFile.js')

const routers = getExportFileName(routerFolderPath)


module.exports = {
    routers
}
