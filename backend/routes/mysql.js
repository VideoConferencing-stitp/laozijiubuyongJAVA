const router = require('koa-router')()
const mysql = require('mysql');

router.get('/search', async (ctx, next) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '263785czx',
        database : 'salesdb'
    });
    
    connection.connect();
    
    var sql = 'SELECT * FROM sale_backup';
    
    let query = ()=>{
      return new Promise((resolve,reject)=>{
          connection.query(sql,(err,data) => {
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

module.exports = router