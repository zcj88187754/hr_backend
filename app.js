
const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./router/user')
const joi = require('joi')

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

app.use('/api', userRouter)

//效验错误同意处理 
app.use((err, req, res, next)=>{
  if(err instanceof joi.ValidationError){
    return res.cc(err)
  }
  res.cc(err)
})

app.listen(port, () => {
  console.log(`服务器已经启动，端口号：${port}`)
})
