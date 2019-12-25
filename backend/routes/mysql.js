const router = require('koa-router')()
const mysql = require('mysql')

// 测试查表
router.get('/search', async (ctx, next) => {

    let connection = ConnectSQL();
    let query = ()=>{
      return new Promise((resolve,reject)=>{
          connection.query(sql.GET_ALL,(err,data) => {
              if(err){
                  resolve({message:err.message})
              }
              resolve(data);
          })
      })
    }
    let result = await query();
    ctx.body = result;
})

// 登录
router.post('/login', async (ctx) => {
    reqData = ctx.request.body;
    account = JSON.stringify(reqData.account);
    password = JSON.stringify(reqData.password);

    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    let query = ()=>{
    return new Promise((resolve,reject)=>{
        connection.query(sql.LOGIN + account,(err,data) => {
            if(err){
                resolve({message:err.message})
            }
            resolve(data);
        })
    })
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 检查
    if (!temp.length){
        ctx.body = {
            "code": 501,
            "msg": "用户名错误！",
            "data": null
        };
    } else if (JSON.stringify(temp[0].key) == password){
        ctx.body = {
            "code": 200,
            "msg": "登录成功！",
            "data": {
                "userId": temp[0].AID,
            }
        }
    } else {
        ctx.body = {
            "code": 501,
            "msg": "密码错误！",
            "data": null
        }
    }  
})

// 获取问卷列表
router.get('/get-qn-list', async (ctx, next) => {

    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    let query = ()=>{
      return new Promise((resolve,reject)=>{
          connection.query(sql.GET_ALL5,(err,data) => {
              if(err){
                  resolve({
                    "code": 501,
                    "msg": "无法获取问卷列表，请检查网络连接！",
                    "data": null
                })
              }
              resolve(data);
          })
      })
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回目标数据
    if (temp.code == 501){
        ctx.body = temp;
    } else {
        let qnList = [];
        if (temp.length > 10){
            for (let i = 0; i < 10; i++){
                let qnItem = {
                    "id": temp[i].QID,
                    "title": temp[i].Qname
                }
                qnList.push(qnItem);
            }
        } else {
            for (let i = 0; i < temp.length; i++){
                let qnItem = {
                    "id": temp[i].QID,
                    "title": temp[i].Qname
                }
                qnList.push(qnItem);
            }
        }
        ctx.body = {
            "code": 200, 
            "msg": "成功",
            "qnList": qnList
        };
    }    
})

//删除问卷
router.post('/delete-qn', async (ctx, next) => {

    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    reqData=ctx.request.body;
    deQnId=JSON.stringify(reqData.qnId);
    let query = ()=>{
      return new Promise((resolve,reject)=>{
          connection.query(sql.DELETE_QN+deQnId,(err,data) => {
              if(err){
                  resolve({
                    "code": 501,
                    "msg": "删除失败"
                })
              }
              resolve(data);
          })
      })
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 删除失败则返回501，成功则返回200
    if (temp.code == 501){
        ctx.body = temp;
    } else {
        ctx.body = {
            "code": 200, 
            "msg": "成功"
        };
    }    
})

// 连接数据库
function ConnectSQL(){
    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '263785czx',
        database : 'questionnaire_survey_system'
    });
    connection.connect();
    return connection;
}

// sql语句
var sql = {
    GET_ALL: 'SELECT * FROM questionnaire', 
    GET_QN_LIST: 'SELECT * FROM questionnaire_survey_system.question,questionnaire where question.QID=questionnaire.QID',
    INSERT_QN: "INSERT INTO `questionnaire_survey_system`.`administrator` (`AID`, `telephone`, `key`) VALUES ('A2', '13322258585', '324')",
    LOGIN: "select * from administrator where telephone =",
    DELETE_QN: "DELETE FROM questionnaire_survey_system.questionnaire WHERE QID ="
};

module.exports = router