const Koa = require('koa')
const statics = require('koa-static')
const path = require('path')
const app = new Koa()

const staticPath = './public'

app.use(statics(
    path.join(__dirname, staticPath)
))

app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(8089)

console.log('http://localhost:8089')