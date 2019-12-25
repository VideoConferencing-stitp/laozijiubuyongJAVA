const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

// app.use(require('koa-static')(__dirname + '/public'))
// 由于中间件的存在
// 默认的会以 /public/index.html
// 为 “/” 路径的返回

// router.get('/fill-qn', async (ctx, next) => {
//   ctx.type = 'text/html';
//   ctx.body = fs.createReadStream(path.resolve(__dirname, '../public/fill-qn/index.html'));
// })

// router.get('/', async (ctx, next) => {
//   ctx.type = 'text/html';
//   ctx.body = fs.createReadStream(path.resolve(__dirname, '../public/index.html'));
// })

module.exports = router
