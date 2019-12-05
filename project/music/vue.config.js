const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports={
  publicPath:"./",//npm run build 之后的资源路径默认‘/’
  devServer:{
    proxy:{
      '/hh':{
        target:'http://ustbhuangyi.com/',//目标服务器
        changeOrigin:true,//是否改变请求源
        pathRewrite:{//路径重写
          "^/hh":''
        }
      }
    }
  },
  //起别名
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('api',resolve('./src/api'))
    .set('style',resolve('./src/style'))
    .set('pages',resolve('./src/pages'))
  }
}
