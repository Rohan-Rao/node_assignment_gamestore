const express = require('express');
const router = express.Router();
const { customer, validateCustomer } = require('./../models/customers');
let customers = [] //array of customer objects
/**
 * @author Rohan Rao
 * @function to get the entire customers
 */
router.get('/', (req, res) => {
    if(customers.length == 0 ) return res.status(404).send('No customers');
    return res.status(200).send(customers);
});

/**
 * @author Rohan Rao
 * @function to get the specific customer by its id
 */
router.get('/:id', (req, res) => {
    //find the customer according to the id
    const foundCustomer = customers.find(c => c.custId == req.params.id);

    //if not found return the appropriate response with status code
    if(!foundCustomer) return res.status(404).send(`No customer with id-${req.params.id}`);
    
    //return the found customer as response
    return res.status(200).send(foundCustomer);
});

/**
 * @author Rohan Rao
 * @function to add a new customer
 */
router.post('/', (req, res) => {
    //validate the input request using joi
    const { error } = validateCustomer(req.body);

    //if error return appropriate response
    if(error) return res.status(400).send(error.details[0].message);

    //create a customer object
    const customerDoc = new customer(req.body.custId,
                 req.body.custName,
                 req.body.isGold,
                 req.body.availableCredit
            );
    //push it to the customers list
    customers.push(customerDoc);

    //return the newly added customer
    return res.status(200).send(customerDoc);
});

/**
 * @author Rohan Rao
 * @function to edit the particular customer according to its id
 */
router.put('/:id', (req, res) => {
    //validate the input request customer using joi
    const { error } = validateCustomer(req.body);

    //if error return appropriate response
    if(error) return res.status(400).send(error.details[0].message);

    //find the customer according to the id received in request params
    let foundCustomer = customers.find(c => c.custId == req.params.id);

    //if not found return the appropriate response with status code
    if(!foundCustomer) return res.status(404).send(`No customer with id-${req.params.id}`);

    //edit the customer object with its new properties
        foundCustomer.custName =  req.body.custName;
        foundCustomer.isGold = req.body.isGold;
        foundCustomer.avilableCredit = req.body.avilableCredit;

    //return the updated customer    
    return res.status(200).send(foundCustomer);    
});

/**
 * @author Rohan Rao
 * @function to delete the particular customer according to its id
 */
router.delete('/:id', (req, res) => {
     //find the customer object index according to the id received in request params
    const custIndex = customers.findIndex(c => c.custId == req.params.id);

     //if not found return the appropriate response with status code
    if(custIndex == -1) return res.status(404).send(`No customer with id-${req.params.id}`);
    
    //return the deleted customer object
    return res.status(200).send(customers.splice(custIndex, 1));
});

exports.customers = customers;
exports.customerRoute = router;