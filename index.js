const fs = require('fs')
const crypto = require('crypto');
const Koa = require('koa')
const statics = require('koa-static')
const path = require('path')
const app = new Koa()
const router = require('koa-router')()

const koaBody = require('koa-body')

app.use(koaBody({
    multipart: true, //这里补充一点，如果不加multipart：true ctx.request.body会获取不到值
    formidable: {
        maxFileSize: 20010241024
    }
}))

app.use(router.routes(), router.allowedMethods())
const staticPath = './public'

app.use(statics(
    path.join(__dirname, staticPath)
))


router.post('/', function (ctx, next) {
    const { type, data } = JSON.parse(ctx.request.body)
    let uid = ctx.cookies.get('uid')
    if (!uid) {
        ctx.body = {
            code: 401,
            msg: '没有权限'
        }
        return
    }
    let code = 1, resData, msg = '出现错误'
    let fl = path.join(__dirname, `./config/${uid}.json`)
    if (type == 'get') {
        if (fs.existsSync(fs)) {
            code = 0
            resData = fs.readFileSync(fl)
        }
    } else if (type == 'set') {
        code = 0
        fs.writeFileSync(fl, data)
        msg = '保存成功'
    }
    ctx.body = {
        code,
        data: resData,
        msg
    }
})

app.listen(8089)

console.log('http://localhost:8089')