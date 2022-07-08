// 导入验证包、
const joi = require('joi')

//定义规则
const pageNum = joi.number().required()

const pageSize = joi.number().required()

const name = joi.string().required()

const code = joi.string().required()

const address = joi.any()

const telephone = joi.any()

const birthday = joi.any()

const joinday = joi.any()

const education = joi.any()

const id = joi.required()

exports.reg_personnel_schema = {
    query:{
        pageNum,
        pageSize
    }
}

exports.reg_addPersonnel_schema = {
    body:{
        name,
        code,
        address,
        telephone,
        birthday,
        joinday,
        education
    }
}
exports.reg_deletePersonnel_schema = {
    body:{
        id
    }
}
exports.reg_updatePersonnel_schema = {
    body:{
        name,
        code,
        address,
        telephone,
        birthday,
        joinday,
        education
    }
}