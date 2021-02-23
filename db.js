const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    password:'Zmx',
    database:'contact',
    host:'localhost',
    port:5432
});

pool.connect().then(()=>{
    console.log("connected");
}).catch((error)=> 
    {console.log(error)
});


module.exports = pool;