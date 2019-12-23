const router = require('koa-router')()
const mysql = require('mysql');

router.get('/search', async (ctx, next) => {
    // var connection = mysql.createConnection({
    //     host     : 'localhost',
    //     user     : 'root',
    //     password : '263785czx',
    //     database : 'salesdb'
    // });
    
    // connection.connect();
    
    // var  sql = 'SELECT * FROM sale_backup';
    
    // connection.query(sql,function (err, result) {
    //     if(err){
    //       console.log('[SELECT ERROR] - ',err.message);
    //       return;
    //     }
 
    //    console.log('--------------------------SELECT----------------------------');
    //    console.log(result);
    //    console.log('------------------------------------------------------------\n\n');  
    // });

    ctx.body = 'result'
  })

  module.exports = router