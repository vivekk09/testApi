const e = require('express');
const { v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();
const con = require('../config/db');
/* GET users listing. */
router.get('/', function(req, res) {
    const query = 'SELECT * FROM contacts';
    con.query(query,(err,result)=>{
        if(err){
            return res.status(500).json({err});
        }
        return res.status(200).json({result});
    })
});

router.get('/:id', function(req, res) {
    const {id} = req.params;
    const query = 'SELECT * FROM contacts WHERE id = ?';
    con.query(query,[id],(err,result)=>{
        if(err){
            return res.status(500).json({err});
        }
        return res.status(200).json({result});
    })
});


router.post('/',(req,res)=>{
    const {contact} = req.body;
    console.log(contact);
    const query = "INSERT INTO contacts (name, mobile_number,id) VALUES (?, ?,?)";
    con.query(query,[contact.name,contact.mobile_number,uuidv4()],(err,result)=>{
        if(err){return res.status(500).json({err})}
        return res.status(202).json({result});
    })
})


router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const query = "DELETE FROM contacts WHERE id=?";
    con.query(query,[id],(err,result)=>{
        if(err){
            return res.status(500);
        }
        return res.status(200).json({result});
    })
})

    router.patch('/:id',(req,res)=>{
        const {id} = req.params;
        const {contact} = req.body;
        const keys = Object.keys(contact);
        const values = Object.values(contact);
        let query = "UPDATE  contacts SET "+keys.map(key=>(`${key} = ? `));
        query+=" WHERE id=?";
        console.log(query);
        con.query(query,[...values,id],(err,result)=>{
            if(err){
                return res.status(500);
            }
            return res.status(200).json({result});
        })
    })

module.exports = router;
