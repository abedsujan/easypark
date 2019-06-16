const express = require('express');
const bodyParser = require('body-parser')
const router = require('./js/router'); 

var { Validator, ValidationError } = require('express-json-validator-middleware');
const app = express();
const port = 8001;

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to HYF Course app using express! class09'))

app.use('/api', router);

// Error handler for valication errors
app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(400).send(err);
    };
});

app.listen(port, () => console.log(`Easy Park app listening on port ${port}!`))