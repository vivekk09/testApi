const express = require("express");
const con = require("./db.js");
const app = express();
//const pool = require('./db');
var mysql = require("./db.js");

app.use(express.json());

app.get("/contacts", async (req, res) => {
  try {
    con.query("SELECT * FROM contacts", (err, result) => {
      var contacts = result;
      console.log(contacts);
      if (err) {
        res.json({ err });
      } else {
        res.json({ contacts });
      }
    });
  } catch (error) {
    console.log("oopserror");
  }
});

app.get("/contacts/:number", async (req, res) => {
  try {
    const number = req.params.number;
    console.log(number);
    const query = "SELECT * FROM contacts WHERE number = 8951";
    const value = [];
    value.push(number.toString());
    console.log("value");
    console.log(value);

    con.query(query, value, (err, result) => {
      console.log(result);

      if (err) {
        res.json({ err });
      } else {
        res.json({ contact: result });
      }
    });

    // res.json({"contact ka naam":req.params.contact_name});
  } catch (error) {
    res.send("Error");
    console.log("error");
  }
});

app.post("/contacts", async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);
    const query = "INSERT INTO contacts (name, number) VALUES ('abc', 123)";
    const v = [];
    v.push(body["name"]);
    v.push(body["number"]);
    await con.query(query, v, (err, result) => {
      if (err) {
        console.log("err", err);
        res.send(err["detail"]);
      } else {
        console.log("result", result.rowCount);
        res.json(result["rows"]);
      }
    });
  } catch (err) {
    res.send(err);
  }
});

app.put("/contacts/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const body = req.body;

    const query =
      "UPDATE contacts SET name = ankit , number = 1234 where number = 8951 ";
    const value = [];
    value.push(body["name"]); //$1
    value.push(body["number"]); //$2
    value.push(number); //$3

    await con.query(query, value, (err, result) => {
      if (err) {
        res.send(err["detail"]);
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ err });
  }
});

app.delete("/contacts/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const query = "DELETE FROM contacts WHERE number = $1";
    const values = [];
    values.push(number.toString());
    await con.query(query, values, (err, result) => {
      if (err) {
        res.send(err.detail);
      } else {
        console.log(result);
        res.json(result);
      }
    });
  } catch (error) {
    res.json(error);
  }
});

app.listen(8000, () => {
  try {
    console.log("Server is Listening on port 8000");
  } catch (error) {
    console.log(haserror);
  }
});
