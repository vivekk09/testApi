const express = require('express');
const app = express();
const pool = require('./db');


app.use(express.json());

app.get('/contacts', async (req, res)=>{
    try {
       pool.query('SELECT * FROM CONTACTS', (err,result)=>{
            var contacts =  result.rows;
            console.log(contacts);
            if(err){
                  res.json({err}) ;     
            }
            else{
                res.json({contacts});
            }
       });
        
    } catch (error) {
    console.log("error") ;     
    }
});

app.get('/contacts/:number', async (req, res)=>{
   
    try {
        const number = req.params.number;
        console.log(number);
        const query = 'SELECT * FROM CONTACTS WHERE number = $1';
        const value = [];
        value.push(number.toString());
        console.log('value')
        console.log(value);
      
        pool.query( query,value, (err, result) =>{
            console.log(result.rows);
            
            if(err){
                res.json({err});
            }
            else{
                res.json({contact:result.rows})
            }
        });
        
        
        // res.json({"contact ka naam":req.params.contact_name});
    } catch (error) {
        res.send('Error');
    console.log("error") ;     
    }
});

app.post('/contacts', async (req, res)=>{
        try{
            const body = req.body;
            console.log('body',body);
            const query = 'INSERT INTO CONTACTS (name, number) VALUES ($1, $2) returning *';
            const v = [];
            v.push(body['name']);
            v.push(body['number']);
            await pool.query(query, v, (err, result)=>{
                if(err){
                    console.log('err', err);
                    res.send(err['detail']);
                }
                else{
                    console.log('result', result.rowCount);
                    res.json(result['rows']);  
                }
            });
        }
        catch(err){
            res.send(err);
        }
  
});

app.put('/contacts/:number', async (req, res)=>{
   
   try{
    const number = req.params.number;
    const body =  req.body;

    const query = 'UPDATE contacts SET name = $1 , number = $2 where number = $3 ';
    const value = [];
    value.push(body['name']); //$1
    value.push(body['number']); //$2
    value.push(number);//$3

    await pool.query(query, value, (err, result)=>{
        if(err){
            res.send(err['detail']);
        }
        else{
            res.json(result);
        }
    });
   }
    catch(err){
        res.json({err});
    }
});

app.delete('/contacts/:number', async (req, res)=>{
    try {
        const number = req.params.number;
        const query = 'DELETE FROM contacts WHERE number = $1';
        const values = [];
        values.push(number.toString());
        await pool.query(query, values, (err, result)=>{
            if(err){
                res.send(err.detail);
            }
            else{
                console.log(result);
                res.json(result);
            }
        });

    } catch (error) {
        res.json(error);
    }
});

app.listen(8000, ()=>{
    try {
        console.log("Server is Listening on port 8000");
    } catch (error) {
        console.log(error);
    }
});