const express = require('express')
const bodyParser = require('body-parser')

 const Zone = require('./js/zone');
// const Customer = require('./customer');
// const Invoice = require('./invoice');


 const ep_zone = new Zone();
// const ep_customer = new Customer();
// const ep_invoice = new Invoice();


const app = express();
const router = express.Router();
const port = 8001;

app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to HYF Course app using express! class09'))

router.route('/zone')
    .get((req, res) => {
        res.send(ep_zone.getZoneByName('red'));
    })

router.route('/customer')
    .get((req, res) => {
        res.send('customer');
    })
    .post((req, res) => {

    });

router.route('/invoice')
    .get((req, res) => {
        res.send('invoice');
    })
    .post((req, res) => {

    });

app.use('/api', router);


app.listen(port, () => console.log(`Easy Park app listening on port ${port}!`))