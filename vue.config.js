const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
    publicPath: "./",
    devServer: {
      port: 8080,
    //   host: "localhost",
      https: false,
      open: true,
      proxy: {
        "/": {
            target: process.env.VUE_APP_SERVICE_URL, 
            changeOrigin: true, 
            pathRewrite: {}
        }
      }
    },
    lintOnSave: false,
    outputDir:"dist",
    assetsDir:"assets",
    indexPath: "index.html",
    productionSourceMap: false,
    css: {
        // modules:false,
        // extract:true,
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 75, //px转rem，配置的系数
                        selectorBlackList: ["weui", "mu","downwarp-progress","upwarp-progress","downwarp-tip","upwarp-nodata","van-toast","van-field__clear"], 
                        propList: ["*"]
                    })
                ]
            }
        }
    },
    configureWebpack: (config) => { //生产环境去掉console.log
      if (process.env.NODE_ENV === 'production') {
          config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
    }
};