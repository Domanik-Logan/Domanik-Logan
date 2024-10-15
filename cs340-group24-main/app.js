/*
 * SETUP
 */
var cors = require('cors')
var express = require('express')
var app = express()
PORT = 9090
var fs = require('fs')
var db = require('./db-connector')

app.use(express.json())
app.use(express.static('public'))
app.use(cors())
/*
 * ROUTES
 */

app.get('/', function(req, res) {
    res.status(201).sendFile(__dirname + 'public/index.html')
})

app.get('/api/accounts/get', function(req, res) {
    console.log('get request made')
    query = 'SELECT * FROM Accounts;'
    db.pool.query(query, function(err, result, fields) {
        if (err) {
            console.log(err)
            res.status(404)
        }
        //let base = "<h1>MySQL Results:</h1>"
        console.log(result)
        res.status(201).send(JSON.stringify(result))
    })
})

app.post('/api/accounts/add', function(req, res) {
    console.log('post request made')
    query = "INSERT INTO Accounts (address, city, countryCode, email) VALUES ('" + req.body.address + "', '" + req.body.city + "', '" + req.body.countryCode + "', '" + req.body.email + "');"
    db.pool.query(query, function(err, result, fields) {
        if (err) {
            console.log(err)
            res.status(404)
        }
        console.log(result)
        res.status(201).send(JSON.stringify(result))
    })
})

app.delete(`/api/accounts/delete/:accID`, function(req, res) {
    console.log('delete request made')
    query = "DELETE FROM Accounts WHERE accountID = " + req.params.accID + ';'
    //console.log(req)
    db.pool.query(query, function(err, result, fields) {
        if (err) {
            console.log(err)
            res.status(404)
        }
        console.log(result)
        res.status(202).send("account deleted")
    })
})

app.put(`/api/accounts/update/:accID`, function(req, res) {
    console.log('put request made')
    query = "UPDATE Accounts SET address = '" + req.body.address + "', city = '" + req.body.city + "', countryCode = '" + req.body.countryCode + "', email = '" + req.body.email + "' where accountID = " + req.params.accID + ";"
    //console.log(req)
    db.pool.query(query, function(err, result, fields) {
        if (err) {
            console.log(err)
            res.status(404)
        }
        console.log(result)
        res.status(202).send("account updated")
    })
})


/*
* LISTENER
*/

app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT)
})
