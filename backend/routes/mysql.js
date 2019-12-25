const router = require('koa-router')()
const mysql = require('mysql')

// 测试查表
router.get('/search', async (ctx, next) => {

    let connection = ConnectSQL();
    let query = ()=>{
        return GetResult(connection, sql.GET_ALL);
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

//删除问卷
router.post('/delete-qn', async (ctx, next) => {

    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    reqData=ctx.request.body;
    deQnId=JSON.stringify(reqData.qnId);
    console.log(reqData.qnId);
    let query = ()=>{
      return GetResult(connection,sql.DELETE_QN+deQnId)
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回200,成功
    if (temp.code == 501){
        ctx.body = temp;
    } else {
        ctx.body = {
            "code": 200, 
            "msg": "成功"
        };
    }    
})

// 获取问卷统计数据
router.get('/get-qn-data', async (ctx, next) => {

    reqData=ctx.request.body;
    qnId=JSON.stringify(reqData.qnId);
    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    let query = ()=>{
      return GetResult(connection, sql.GET_QN_DATA_FIRST+qnId+sql.GET_QN_DATA_SECNOD);
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回目标数据
    if (temp.code == 501){
        temp.msg = "无法获取问卷列表，请检查网络连接！"
        ctx.body = temp;
    }else{
        data={};
        data.id=qnId;
        //获取到的数据总长度
        len=temp.length;
        //标题，数据内容数组
        chartDatas=[];
        var cIndex=0;
        nowTitle=temp[0].contexts;
        chartDatas[cIndex]={}
        chartDatas[cIndex].title=temp[0].contexts;
        chartDatas[cIndex].data=[];
        for(var i=0;i<len;i++)
        {
            if(nowTitle==temp[i].contexts)
            {
                chartDatas[cIndex].data.push({
                    "value":temp[i].op_num,
                    "name":temp[i].qcontexts
                })
            }
            else{
                cIndex++;
                chartDatas[cIndex]={};
                chartDatas[cIndex].title=temp[i].contexts;
                chartDatas[cIndex].data=[];
                nowTitle=temp[i].contexts;
            }
        }
        data.chartDatas=chartDatas;
        ctx.body = {
            "code": 200, 
            "msg": "数据获取成功",
            "data":data
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




// sql语句
let sql = {
    GET_ALL: 'SELECT * FROM questionnaire', 
    GET_QN_LIST: 'SELECT * FROM questionnaire_survey_system.question,questionnaire where question.QID=questionnaire.QID',
    INSERT_QN: "INSERT INTO `questionnaire_survey_system`.`administrator` (`AID`, `telephone`, `key`) VALUES ('A2', '13322258585', '324')",
    LOGIN: "select * from administrator where telephone =",
    DELETE_QN: "DELETE FROM questionnaire_survey_system.questionnaire WHERE QID =",
    GET_QN_DATA_FIRST:"SELECT question.contexts,qoption.qcontexts,op_num FROM question,qoption WHERE  qoption.QuID in (select QuID from question where QID=",
    GET_QN_DATA_SECNOD:") and qoption.QuID=question.QuID",
    SUBMIT_QN:"UPDATE questionnaire.qoption SET op_num = op_num+1 WHERE remark= and QuID= "
};

module.exports = router