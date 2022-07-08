
const express = require('express')
const app = express()
const port = 3000

const joi = require('joi')
// 一定要在路由之前配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
const userRouter = require('./router/user')
const personnel = require('./router/personnel')



app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false} ));

// 封装错误处理
app.use((req, res, next)=>{
  res.cc = function (err, status = 1){
    res.send({
      status,
      message: err instanceof Error ? err.message: err
    })
  }
  next()
})

app.use(expressJWT.expressjwt({
  secret: config.jwSecretKey,
  algorithms: ['HS256']
}).unless({
  path: [ /^\/api/ ]
}))




app.use('/api', userRouter)
app.use('/personnel', personnel)

//token效验错误同意处理 放在路由之后
app.use((err, req, res, next)=>{
  if(err instanceof joi.ValidationError){
    return res.cc(err)
  }
  if(err.name === 'UnauthorizedError'){
    return res.cc('身份认证失败')
  }
  res.cc(err)
})

app.listen(port, () => {
  console.log(`服务器已经启动，端口号：${port}`)
})
