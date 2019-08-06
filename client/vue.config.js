//less全局配置
var path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    chainWebpack: (config) => {
        //自定义路径 alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('store', resolve('src/store'))
    },

}