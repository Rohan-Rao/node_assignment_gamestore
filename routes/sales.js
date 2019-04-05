const express = require('express');
const router = express.Router();
const { customers } = require('./customers');
const { games } = require('./games');
const { sale } = require('./../models/sales');
let sales = []; //array of game objects

/**
 * @author Rohan Rohan
 * @function get the list of all sales
 */
router.get('/', (req, res) => {
    if(sales.length == 0 ) return res.status(404).send('No sales yet!!');
    return res.status(200).send(sales);
});

/**
 * @author Rohan Rohan
 * @function to get a game according to the id
 */
router.get('/:id', (req, res) => {
    //find the sale according to the id
    const foundSales = sales.find(sale => sale.saleId == req.params.id);

     //if not found return the appropriate response with status code
    if(!foundSales) return res.status(404).send(`No sale with id-${req.params.id}`);

    //return the found sale as response
    return res.status(200).send(foundSales);
});

/**
 * @author Rohan Rohan
 * @function to create a sale object
 */
router.post('/', (req, res) => {
    //find the customer object according to the id from customers list
    const foundCustomer = customers.find( c => c.custId == req.body.custId);
    //if not found return the appropriate response with status code
    if(!foundCustomer) return res.status(404).send(`No customer with id-${req.body.custId}`);

    //find the game object according to the id from customers list
    const foundGame =  games.find(g => g.gameId == req.body.gameId);
    //if not found return the appropriate response with status code
    if(!foundGame) return res.status(404).send(`No game with id-${req.body.gameId}`);

    //if game price s greater than credit avilable with customer, give the appropriate response with status code
    if(foundGame.gamePrice > foundCustomer.availableCredit) return res.status(400).send("Don't have enough credits to purchase the game!!");
    
    //set price to the game price 
    let price= foundGame.gamePrice;

    //if customer has a gold membership than avail a discount of 20% on price of game
    if(foundCustomer.isGold) price = calculateDiscount(price);

    //deduct the cost of game from customer's credit
    foundCustomer.availableCredit = foundCustomer.availableCredit - price;

    //create the sales object
    const saleDoc = new sale(req.body.saleId,
                            foundCustomer,
                            foundGame);

    //push the newly created object on the sales list 
    sales.push(saleDoc);     
   //return the newly added sale object
    return res.status(200).send(saleDoc);                  
});

/**
 * @author Rohan Rao
 * @param { number denoting a price } price
 * @function to calculate the 20% discount 
 */
let calculateDiscount = function(price){
     return parseInt((price - ((20 / 100) * price)));
}

exports.salesRoute = router;