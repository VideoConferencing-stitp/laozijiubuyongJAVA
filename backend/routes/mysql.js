const router = require('koa-router')()
const mysql = require('mysql')

// 测试查表
router.get('/search', async (ctx, next) => {

    let connection = ConnectSQL();
    let query = ()=>{
        return GetResult(connection, sql.GET_ALL);
    }
    let result = await query();
    connection.end();
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
        return GetResult(connection, sql.LOGIN + account);
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

// 获取问卷内容
router.get('/get-qn', async (ctx, next) => {
    let reqQue = ctx.request.query;
    let qnId = JSON.stringify(reqQue.qnId);

    // 连接数据库
    let connection = ConnectSQL();
    let query = ()=>{
        return GetResult(connection, sql.GET_Q_NAME + qnId);
    }
    let temp = await query();
    // 问卷号错误/已被删除/不存在
    if (temp.length === 0){
        ctx.body = {
            "code": 501,
            "msg": "不存在此问卷",
            "data": null
        }
    } else {
        // 查询成功
        // 提取当前问卷名
        Qname = temp[0].Qname;
        // 提取当前问卷题目
        query = ()=>{
            return GetResult(connection, sql.GET_Q_LIST + qnId)
        }
        temp = await query();
        let questions = new Array();
        for (let i = 0; i < temp.length; i++){
            // 提取当前问卷某题的选项
            query = ()=>{
                return GetResult(connection, sql.GET_Q_OPTIONS + temp[i].QuID)
            }
            let temp2 = await query();
            let labels = new Array();
            for (let j = 0; j < temp2.length; j++){
                labels[j] = temp2[j].contexts;
            }  
            console.log(temp[i].type)
            let detail = {
                "qId": temp[i].QuID,
                "type": temp[i].type == "单选" ? "radio" : "checkbox",
                "title": temp[i].contexts,
                "labels": labels
            }
            questions.push(detail)
        }
        let result = {
            "code": 200,
            "msg": "成功",
            "data": {
                "id": parseInt(qnId.split('\"')[1]),
                "title": Qname,
                "questions": questions
            }
        }
        ctx.body = result;
    }
    connection.end();
})

// 获取问卷列表
router.get('/get-qn-list', async (ctx, next) => {

    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    let query = ()=>{
      return GetResult(connection, sql.GET_ALL);
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回目标数据
    if (temp.code == 501){
        temp.msg = "无法获取问卷列表，请检查网络连接！"
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

// 获取数据库执行结果
function GetResult(connection, sqlSentence){
    return new Promise((resolve,reject)=>{
        connection.query(sqlSentence,(err,data) => {
            if(err){
                resolve( resolve({
                    "code": 501,
                    "msg": "",
                    "data": null
                }))
            }
            resolve(data);
        })
    })
}


/*
* sql语句
* GET_ALL: 获取问卷列表
* LOGIN: 获取登录信息
* GET_Q_NAME: 获取指定Id的问卷名字
* GET_Q_LIST: 获取指定问卷Id的问题列表
*/
let sql = {
    GET_ALL: 'SELECT * FROM questionnaire', 
    LOGIN: "SELECT * FROM administrator WHERE telephone =",
    GET_Q_NAME: "SELECT Qname FROM questionnaire_survey_system.questionnaire WHERE QID=",
    GET_Q_LIST: "SELECT QuID,contexts,type FROM questionnaire_survey_system.question,questionnaire where question.QID=questionnaire.QID and questionnaire.QID=",
    GET_Q_OPTIONS: "SELECT OID,qoption.contexts FROM questionnaire_survey_system.question,qoption where question.QuID=qoption.QuID and question.QuID="
};

module.exports = router