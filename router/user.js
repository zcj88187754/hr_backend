const express = require('express')
const router = express.Router()

const expressJoi = require('@escook/express-joi')

const user = require('../router_handler/user')

const { reg_login_schema } = require('../schema/users')

router.post('/login', expressJoi(reg_login_schema), user.login)

router.post('/register', expressJoi(reg_login_schema), user.register)


module.exports = router