const router = require('koa-router')()
const mysql = require('mysql')

// 登录
router.post('/login', async (ctx) => {

    reqData = ctx.request.body;
    account = JSON.stringify(reqData.account);
    password = JSON.stringify(reqData.password);

    // 连接数据库，查询管理员表
    let connection = ConnectSQL();
    let query = () => {
        return GetResult(connection, sql.LOGIN + account);
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 检查
    if (!temp.length) {
        ctx.body = {
            "code": 501,
            "msg": "用户名错误！",
            "data": null
        };
    } else if (JSON.stringify(temp[0].key) == password) {
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

    let userId = ctx.request.query.userId;
    let values = '\'' + userId + '\'';
    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    let query = () => {
      return GetResult(connection, sql.GET_ALL + values);
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回目标数据
    if (temp.code == 501) {
        temp.msg = "无法获取问卷列表，请检查网络连接！"
        ctx.body = temp;
    } else {
        let qnList = [];
        if (temp.length > 10) {
            for (let i = 0; i < 10; i++) {
                let qnItem = {
                    "id": temp[i].QID,
                    "title": temp[i].Qname
                }
                qnList.push(qnItem);
            }
        } else {
            for (let i = 0; i < temp.length; i++) {
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

// 获取问卷内容
router.get('/get-qn', async (ctx, next) => {

    let reqQue = ctx.request.query;
    let qnId = JSON.stringify(reqQue.qnId);

    // 连接数据库
    let connection = ConnectSQL();
    let query = () => {
        return GetResult(connection, sql.GET_Q_NAME + qnId);
    }
    let temp = await query();
    // 问卷号错误/已被删除/不存在
    if (temp.length === 0) {
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
        query = () => {
            return GetResult(connection, sql.GET_Q_LIST + qnId)
        }
        temp = await query();
        let questions = new Array();
        for (let i = 0; i < temp.length; i++) {
            // 提取当前问卷某题的选项
            query = () => {
                return GetResult(connection, sql.GET_Q_OPTIONS + temp[i].QuID)
            }
            let temp2 = await query();
            let labels = new Array();
            console.log(temp2)
            for (let j = 0; j < temp2.length; j++) {
                labels[j] = temp2[j].qcontexts;
            } 
            let detail = {
                "qId": temp[i].QuID,
                "type": temp[i].type == "单选" ? "radio" : "checkbox",
                "title": temp[i].contexts,
                "labels": labels
            }
            if(temp[i].type=="单选"){
                detail.radio="";
            }else{
                detail.checkList=[];
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

//删除问卷
router.post('/delete-qn', async (ctx, next) => {

    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    reqData = ctx.request.body;
    deQnId = JSON.stringify(reqData.qnId);
    let query = () => {
      return GetResult(connection, sql.DELETE_QN + deQnId)
    }
    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回200,成功
    if (temp.code == 501) {
        ctx.body = temp;
    } else if (temp.affectedRows == 0) {
        ctx.body = {
            "code": 501, 
            "msg": "不存在此问卷"
        };
    } else {
        ctx.body = {
            "code": 200, 
            "msg": "成功"
        };
    }    
})


//提交答案
router.post('/submit-qn' , async (ctx,next) => {

    reqData = ctx.request.body;
    answerList = reqData.answers;
    let connection = ConnectSQL();
    //监测是否全部插入成功
    let flag = true;
    let len = answerList.length;
    for (let i = 0; i < len; i++) {
        qId = answerList[i].qId;
        tempCheck = answerList[i].checkList;
        for (let j = 0; j < tempCheck.length; j++) {
            let query = () => {
                return GetResult(connection, sql.SUBMIT_QN_FIRST + tempCheck[j]
                                + sql.SUBMIT_QN_SECOND + qId);
            }
            let temp = await query();
            if (temp.code == 501) {
                flag = false;
                break;
            }//if
        }//for
    }//for
    if (flag) {
        ctx.body = {
            "code": 200, 
            "msg": "插入成功"
        };
    } else {
        ctx.body = {
            "code": 501, 
            "msg": "插入失败"
        };
    }
})

// 获取问卷统计数据
router.get('/get-qn-data', async (ctx, next) => {

    reqData = ctx.request.query;
    qnId = JSON.stringify(reqData.qnId);
    // 连接数据库，查询问卷列表
    let connection = ConnectSQL();
    let query = () => {
      return GetResult(connection, sql.GET_QN_DATA_FIRST + qnId 
                        + sql.GET_QN_DATA_SECNOD);
    }

    // 先获取查询结果，再关闭数据库连接（不可颠倒）
    let temp = await query();
    connection.end();

    // 查询失败则返回501，成功则返回目标数据
    if (temp.code == 501) {
        temp.msg = "无法统计问卷数据，请检查网络连接！"
        ctx.body = temp;
    } else {
        if (temp.length != 0) {
            data = {};
            qnId = qnId.substr(1, qnId.length - 2);
            data.id = qnId;
            //获取到的数据总长度
            len = temp.length;
            //标题，数据内容数组
            chartDatas = [];
            var cIndex = 0;
            nowTitle = temp[0].contexts;
            chartDatas[cIndex] = {}
            chartDatas[cIndex].title = temp[0].contexts;
            chartDatas[cIndex].data = [];
            for (let i = 0; i < len; i++) {
                if (nowTitle == temp[i].contexts) {
                    chartDatas[cIndex].data.push({
                        "value":temp[i].op_num,
                        "name":temp[i].qcontexts
                    })
                }//if
                else {
                    cIndex++;
                    chartDatas[cIndex] = {};
                    chartDatas[cIndex].title = temp[i].contexts;
                    chartDatas[cIndex].data = [];
                    chartDatas[cIndex].data.push({
                        "value":temp[i].op_num,
                        "name":temp[i].qcontexts
                    })
                    nowTitle=temp[i].contexts;
                }//else
            }//for
            data.chartDatas = chartDatas;
            ctx.body = {
                "code": 200, 
                "msg": "数据获取成功",
                "data":data
            };
        }//if
        else {
            ctx.body = {
                "code": 501, 
                "msg": "没有此问卷"
            };
        }//else
    }//else
})

// 新增问卷
router.post('/create-qn', async (ctx) => {

    let reslut = {
        "code": 200,
        "msg": "成功",
        "data": {
          "url": ""
        }
    }
    let qId = 0;

    let qnData = ctx.request.body;
    // 获取创建问卷时所需的相关即时信息
    let finish_time = '2020-02-01';
    let nowDate = new Date();
    let release_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1)
                    + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':'
                    + nowDate.getMinutes() + ':' + nowDate.getSeconds() + '.0';
    let values = '(\'' + qnData.questionnaire.title + '\',' 
                + qnData.questionnaire.questions.length + ',\'' + finish_time
                + '\',\'' + release_time + '\',\'' + '非定时\',\'' + qnData.userId
                + '\',1)';
    // 连接数据库，插入问卷
    let connection = ConnectSQL();
    let query = () => {
        return GetResult(connection, sql.INSERT_QUESTIONNAIRE + values);
    }
    let temp = await query();
    if (temp.code == 501) {
        reslut.msg = "增加问卷记录失败，请重试！";
        reslut.code = 501;
    } else {

    // 正确插入问卷后，再插入该问卷的问题
        qId = temp.insertId;
        let questions = qnData.questionnaire.questions;
        // 判断是否发生错误的标记，中途一旦出错，立即修改标记并退出
        let flag = true;
        for (let i = 0; i < questions.length & flag; i++) {
            let type = questions[i].type == "radio" ? "单选" : "多选";
            values = '(\'' + type + '\',\'必填\',\'' + questions[i].title
                    + '\',' + qId + ')';
            query = () => {
                return GetResult(connection, sql.INSERT_QUESTION + values);
            }
            temp = await query();
            if (temp.code == 501) {
                reslut.msg = "增加问题失败，请重试！";
                reslut.code = 501;
                flag = false;
                break;
            } else {

    // 正确插入问题后，再插入该问题的选项
                let quId = temp.insertId;
                let labels = questions[i].labels;
                for (let j = 0, charCode = 65; j < labels.length; j++) {
                    let remark = String.fromCharCode(charCode++);
                    values = '(\'' + labels[j] + '\',' + '0,' + quId 
                            + ',\'' + remark + '\')'
                    query = () => {
                        return GetResult(connection, sql.INSERT_QOPTION 
                                        + values);
                    }
                    temp = await query();
                    if (temp.code == 501) {
                        reslut.msg = "增加选项失败，请重试！";
                        reslut.code = 501;
                        flag = false;
                        break;
                    }
                }
            }
        }
    }
    connection.end();

    if (reslut.code == 200) {
        reslut.data.url = `http://139.180.145.219:54188/fill#/?qnId=+${qId}`;
    } else {
        reslut.data = null;
    }
    ctx.body = reslut;
})

// 连接数据库
function ConnectSQL() {

    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'questionnaire_survey_system'
    });
    connection.connect();
    return connection;
}

// 获取数据库执行结果
function GetResult(connection, sqlSentence) {

    return new Promise((resolve,reject) => {
        connection.query(sqlSentence,(err,data) => {
            if (err) {
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
*   GET_ALL: 获取问卷列表
*   LOGIN: 获取登录信息
*   GET_Q_NAME: 获取指定Id的问卷名字
*   GET_Q_LIST: 获取指定问卷Id的问题列表
*   DELETE_QN:删除问卷
*   GET_QN_DATA_FIRST:获取问卷数据语句前半部分
*   GET_QN_DATA_SECOND:获取问卷数据语句后半部分
*   SUBMIT_QN_FIRST：向数据库插入提交的选项前半部分
*   SUBMIT_QN_SECOND:向数据库插入提交的选项后半部分
*   INSERT_QUESTIONNAIRE: 新增问卷记录
*   INSERT_QUESTION: 新增问题记录
*   INSERT_QOPTION: 新增选项记录
*/
let sql = {
    GET_ALL: 'SELECT * FROM questionnaire WHERE AID = ', 
    GET_QN_LIST: 'SELECT * FROM questionnaire_survey_system.question,questionnaire where question.QID=questionnaire.QID',
    INSERT_QN: "INSERT INTO `questionnaire_survey_system`.`administrator` (`AID`, `telephone`, `key`) VALUES ('A2', '13322258585', '324')",
    LOGIN: "select * from administrator where telephone =",
    DELETE_QN: "DELETE FROM questionnaire_survey_system.questionnaire WHERE QID =",
    GET_QN_DATA_FIRST:"SELECT question.contexts,qoption.qcontexts,op_num FROM question,qoption WHERE  qoption.QuID in (select QuID from question where QID=",
    GET_QN_DATA_SECNOD:") and qoption.QuID=question.QuID",
    SUBMIT_QN_FIRST:'UPDATE questionnaire_survey_system.qoption SET op_num = op_num+1 WHERE remark="',
    SUBMIT_QN_SECOND:'" and QuID= ',
    GET_Q_NAME: "SELECT Qname FROM questionnaire_survey_system.questionnaire WHERE QID=",
    GET_Q_LIST: "SELECT QuID,contexts,type FROM questionnaire_survey_system.question,questionnaire where question.QID=questionnaire.QID and questionnaire.QID=",
    GET_Q_OPTIONS: "SELECT OID,qoption.qcontexts FROM questionnaire_survey_system.question,qoption where question.QuID=qoption.QuID and question.QuID=",
    INSERT_QUESTIONNAIRE: "INSERT INTO questionnaire_survey_system.questionnaire (Qname, Qnum, deadline, release_time, release_way, AID, Qstatus) VALUES ",
    INSERT_QUESTION: "INSERT INTO questionnaire_survey_system.question (type, remarks, contexts, QID) VALUES ",
    INSERT_QOPTION: "INSERT INTO questionnaire_survey_system.qoption (qcontexts, op_num, QuID, remark) VALUES "
};

module.exports = router