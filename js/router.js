const express = require('express')
const router = express.Router();


var {
    Validator,
    ValidationError
} = require('express-json-validator-middleware');
var validator = new Validator({
    allErrors: true
});
var validate = validator.validate;

const Zone = require('./zone');
const Customer = require('./customer');
const Invoice = require('./invoice');


const ep_zone = new Zone();
const ep_customer = new Customer();
const ep_invoice = new Invoice();


router.route('/zone/:name')
    .get((req, res) => {
        res.send(ep_zone.getZoneByName(req.params.name));
    })
    .delete((req, res) => {
        res.send(`Deleted: ${req.params.name}`);
    })


router.route('/zone')
    .get((req, res) => {
        console.log('from sdfjkndbsfjnd file');
        res.send(ep_zone.getAll());
    })

const customerSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        numberPlate: {
            type: 'string',
            uniqueItems: true
        }
    },
    required: ['email', 'numberPlate'],
    additionalProperties: false
};

router.route('/customer')
    .get((req, res) => {
        res.send(ep_customer.getAll());
    })
    .post(validate({
        body: customerSchema
    }), (req, res) => {
        ep_customer.addCustomer(req.body, (success, error) => {

            if (success) {
                res.status(201);
                res.send('successful');
            } else {
                console.log(error);
                res.status(401);
                res.send(error);
            }
        });
    });

router.route('/invoice')
    .get((req, res) => {

        if (req.query.id) {
            res.send(ep_invoice.getInvoiceById(req.query.id));
        } else {
            res.send(ep_invoice.getAll());
        }
    })
    .post((req, res) => {
        //res.status(201);
        ep_invoice.addInvoice(req.body);

        res.send("Invoice added!");
    });

module.exports = router;