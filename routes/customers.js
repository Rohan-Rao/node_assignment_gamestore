const express = require('express');
const router = express.Router();
const { customer, validateCustomer } = require('./../models/customers');
let customers = []
router.get('/', (req, res) => {
    if(customers.length == 0 ) return res.status(404).send('No customers');
    return res.status(200).send(customers);
});

router.get('/:id', (req, res) => {
    const foundCustomer = customers.find(c => c.custId == req.params.id);
    if(!foundCustomer) return res.status(404).send(`No customer with id-${req.params.id}`);
    return res.status(200).send(foundCustomer);
});

router.post('/', (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customerDoc = new customer(req.body.custId,
                 req.body.custName,
                 req.body.isGold,
                 req.body.availableCredit
            );
    customers.push(customerDoc);
    return res.status(200).send(customerDoc);
});

router.put('/:id', (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let foundCustomer = customers.find(c => c.custId == req.params.id);
    if(!foundCustomer) return res.status(404).send(`No customer with id-${req.params.id}`);
        foundCustomer.custName =  req.body.custName;
        foundCustomer.isGold = req.body.isGold;
        foundCustomer.avilableCredit = req.body.avilableCredit;
    return res.status(200).send(foundCustomer);    
});

router.delete('/:id', (req, res) => {
    const custIndex = customers.findIndex(c => c.custId == req.params.id);
    if(custIndex == -1) return res.status(404).send(`No customer with id-${req.params.id}`);
    return res.status(200).send(customers.splice(custIndex, 1));
});

exports.customers = customers;
exports.customerRoute = router;