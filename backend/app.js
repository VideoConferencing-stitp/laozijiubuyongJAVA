const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mount = require('koa-mount');

const index = require('./routes/index')
const mysql = require('./routes/mysql')
const cors = require('koa2-cors')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 跨域设置 
// app.use(convert(cors));
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
 });
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

// routes
app.use(index.routes(), index.allowedMethods())
app.use(mysql.routes(), mysql.allowedMethods())

// static
app.use(require('koa-static')(__dirname + '/public/dist')) // 分发vue打包的主页面入口
app.use(mount('/fill', require('koa-static')(__dirname + '/public/dist', { index: 'fill.html' }))) // 分发问卷模版

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
