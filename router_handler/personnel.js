const db = require('../db/index')
const tool = require('../tool')

exports.getPersonnel = (req, res)=>{
    var userInfo = req.body
    const sql = 'select * from hr_personnel where id like ?'
    db.query(sql, ['%'], (err, results)=>{
        if(err){
            return res.cc(err)
        }
        return res.send({
            status: 0,
            data: {
                data: results,
                total: results.length
            }
        })
    })
}

exports.Personnel = (req, res)=>{
    var body = req.body
    var query = req.query
    const sql = 'select * from hr_personnel where name like ? and address like ? and telephone like ? limit ?, ?'
    var bodyParam = tool.filterParameter(body, ['name', 'address', 'telephone'])
    var queryParam = tool.filterLimit(query)
    console.log(bodyParam)
    console.log(queryParam)
    db.query(sql, [...bodyParam, ...queryParam], (err, results)=>{
        if(err){
            return res.cc(err)
        }
        const countsql = 'select count(id) from hr_personnel where name like ? and address like ? and telephone like ? limit ?, ?'
        db.query(countsql, [...bodyParam, ...queryParam], (err, total)=>{
            if(err){
                return res.cc(err)
            }
            return res.send({
                status: 0,
                data: {
                    data: results,
                    total: total[0]['count(id)']
                }
            })
        })
    })
}

exports.addPersonnel = (req, res)=>{
    var body = req.body
    const sql = 'insert into hr_personnel set ?'
    db.query(sql, body, (err, results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows !== 1){
            return res.cc('用户注册失败，请稍后再试')
        }
        return res.send({
            status: 0,
            data: {},
            message: '添加成功！'
        })
    })
}

exports.deletePersonnel = (req, res)=>{
    var body = req.body
    const sql = 'select * from hr_personnel where id = ?'
    db.query(sql, [body.id], (err, results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length == 0){
            return res.send({
                status: 1,
                message: '删除失败,无此数据'
            })
        }
        var delsql = 'delete from hr_personnel where id = ?'
        db.query(delsql, [body.id], (err, results)=>{
            if(err){
                return res.cc(err)
            }
            console.log(results)
            if(results.affectedRows !== 1){
                return res.send({
                    status: 1,
                    message: '删除失败'
                })
            }
            return res.send({
                status: 0,
                data: {},
                message: '删除成功'
            })
        })
    })
}

exports.updatePersonnel = (req, res)=>{
    var body = req.body
    console.log(body)
    var id = body.id
    const sql = 'select * from hr_personnel where id = ?'
    db.query(sql, [id], (err, results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.length == 0){
            return res.send({
                status: 1,
                message: '更新失败,无此数据'
            })
        }
        var delsql = 'update hr_personnel set ? where id = ?'
        // delete body.id
        console.log(body)
        db.query(delsql, [body,id], (err, results)=>{
            if(err){
                return res.cc(err)
            }
            if(results.affectedRows !== 1){
                return res.send({
                    status: 1,
                    message: '更新失败'
                })
            }
            return res.send({
                status: 0,
                data: {},
                message: '更新成功'
            })
        })
    })
}