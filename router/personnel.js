const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const personnel = require('../router_handler/personnel')

const { 
    reg_personnel_schema,
    reg_addPersonnel_schema,
    reg_updatePersonnel_schema,
    reg_deletePersonnel_schema } = require('../schema/personnel')

router.get('/getPersonnel', personnel.getPersonnel)

router.post('/personnel', expressJoi(reg_personnel_schema), personnel.Personnel)

router.post('/addPersonnel', expressJoi(reg_addPersonnel_schema), personnel.addPersonnel)

router.post('/deletePersonnel', expressJoi(reg_deletePersonnel_schema), personnel.deletePersonnel)

router.post('/updatePersonnel', expressJoi(reg_updatePersonnel_schema), personnel.updatePersonnel)

module.exports = router