// 导入验证包、
const joi = require('joi')

//定义规则
const username = joi.string().alphanum().min(3).max(20).required()

const password = joi.string().pattern(/^[\S]{6,12}$/)

exports.reg_login_schema = {
    body:{
        username,
        password
    }
}