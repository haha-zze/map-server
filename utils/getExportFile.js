// todo 自动导入modules中所有的js文件的脚本
const fs = require('fs');
const path = require('path');
const getExportFileName = (dirPath) => {

// 读取 router 文件夹下的文件
    let files = fs.readdirSync(dirPath)
    if (!files) {
        console.error('Error reading router folder:');
        return;
    }
// 过滤出以 ".js" 结尾的文件
    const jsFiles = files.filter(file => file.endsWith('.js'));
// 初始化一个空对象，用于存储导入的路由模块
    const routers = {};
// 遍历每个 .js 文件
    jsFiles.forEach(file => {
        // 构建文件的完整路径
        const filePath = path.join(dirPath, file);
        // 动态导入文件
        const routerModule = require(filePath);
        // 将文件名作为属性名，导入的模块作为属性值添加到 routers 对象中
        routers[file.replace('.js', '')] = routerModule;
    });

   return routers

}

module.exports = {
    getExportFileName
}
