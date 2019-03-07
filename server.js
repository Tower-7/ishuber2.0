const Koa = require('koa')
const ejs = require('koa-ejs')
const path = require('path')
const session = require('koa-session')
const bodyparser = require('koa-bodyparser')
const staticFiles = require('koa-static')
const mongoose = require('mongoose')
const moment = require('moment') 
const router = require('./server/router')
const app = new Koa()
//
app.use(bodyparser())
//连接数据库
mongoose.Promise = require('bluebird')
// const dbUrl = 'mongodb://localhost:27017/web'
const dbUrl = 'mongodb://root:password@39.107.244.119:27017/'
//参数设置
const options = {
  useMongoClient: true,
}
mongoose.connect(dbUrl,options)
//配置session
app.keys = ['some secret hurr']
const CONFIG = {
  key: 'koa:sess', 
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true, 
  signed: true, 
  rolling: false, 
  renew: false,
};
app.use(session(CONFIG, app));
//设置静态文件目录
app.use(staticFiles(path.resolve(__dirname,'./public')))
//设置模板
ejs(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
})
//传递路由参数
router(app)
//设置全局moment
global.moment = moment;
app.listen(8080);