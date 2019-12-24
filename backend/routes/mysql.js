const router = require('koa-router')()
const mysql = require('mysql');

// 测试查表
router.get('/search', async (ctx, next) => {

    // let connection = SQL.ConnectSQL();
    let connection = ConnectSQL();
    let query = ()=>{
      return new Promise((resolve,reject)=>{
        //   connection.query(SQL.SQL_SENTENCE().SEARCH_ALL,(err,data) => {
          connection.query(sql.GET_ALL,(err,data) => {
              if(err){
                  resolve({message:err.message})
              }
              resolve(data);
          })
      })
    }
    let result = await query();
    // ctx.body = typeof(result);
    ctx.body = result;
})

// 获取问卷列表
router.get('/get-qn-list', async (ctx, next) => {

    let connection = ConnectSQL();
    let query = ()=>{
      return new Promise((resolve,reject)=>{
          connection.query(sql.GET_ALL,(err,data) => {
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
    let temp = await query();
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
        let result = {
            "code": 200, 
            "msg": "成功",
            "qnList": qnList
        }
        ctx.body = result;
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
    GET_QN_LIST: 'SELECT * FROM questionnaire_survey_system.question,questionnaire where question.QID=questionnaire.QID'    
};

module.exports = router