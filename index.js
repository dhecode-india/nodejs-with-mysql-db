const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())
const port = '5050'
const sql_query = 'SELECT * FROM companydata.employee_data WHERE emp_name = "Amit kumar"'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'singh',
    database: 'companydata'
})

connection.connect((err)=>{
    if(err) throw err
    console.log('DB Connected')
})


app.get('/data', (req, res)=>{

    connection.query(sql_query, (error, result)=>{
        if (error) throw error
        res.json({result})
    })
})


app.post('/data', (req, res)=>{

    const {id, emp_name, emp_age, emp_salary} = req.body

    connection.query(`INSERT INTO companydata.employee_data (id, emp_name, emp_age, emp_salary) VALUES ('${id}', '${emp_name}', '${emp_age}', '${emp_salary}')`, (error)=>{
        if(error) throw error
        res.json({Success:'Data Inserted Successfully!'})
    })
})


app.listen(port, ()=>{
    console.log('server started @ 5050')
})