
const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.register = (req, res)=>{
    var userInfo = req.body
    const sql = 'select * from hr_users where username=?'
    db.query(sql, [userInfo.username], (err, results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length > 0){
            return res.cc('用户名已被占用')
        }
        // 插入
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        const sqlInsert = 'insert into hr_users set ?';
        db.query(sqlInsert, {
            username: userInfo.username,
            password: userInfo.password
        }, (err, results)=>{
            if(err){
                return res.cc(err)
            }
            if(results.affectedRows !== 1){
                return res.cc('用户注册失败，请稍后再试')
            }
            return res.cc('注册成功', 0)
        })
    })
}

exports.login = (req, res)=>{
    var userInfo = req.body
    const sql = 'select * from hr_users where username=?'
    db.query(sql, [userInfo.username], (err, results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length !== 1){
            return res.cc('用户名或者密码错误！')
        }
        // 判断密码
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        if(!compareResult){
            return res.cc('用户名或者密码错误！')
        }
        res.send('ok')
    })
}