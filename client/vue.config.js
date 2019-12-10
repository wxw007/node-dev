const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//less全局配置
var path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

function time() {
    return Date.now()
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
            .set('util', resolve('src/util'))
    },
    configureWebpack: {
        plugins: [
            new MiniCssExtractPlugin({
                filename: `css/[name].${time()}.css`,
                chunkFilename: `css/[name].${time()}.css`
            })
        ]
    },
    devServer: {
        disableHostCheck: true
    },


}