const express = require('express');
const router = express.Router();
const { customers } = require('./customers');
const { games } = require('./games');
const { sale } = require('./../models/sales');
let sales = [];

router.get('/', (req, res) => {
    if(sales.length == 0 ) return res.status(404).send('No sales yet!!');
    return res.status(200).send(sales);
});

router.get('/:id', (req, res) => {
    const foundSales = sales.find(sale => sale.saleId == req.params.id);
    if(!foundSales) return res.status(404).send(`No sale with id-${req.params.id}`);
    return res.status(200).send(foundSales);
});

router.post('/', (req, res) => {
    const foundCustomer = customers.find( c => c.custId == req.body.custId);
    if(!foundCustomer) return res.status(404).send(`No customer with id-${req.body.custId}`);

    const foundGame =  games.find(g => g.gameId == req.body.gameId);
    if(!foundGame) return res.status(404).send(`No game with id-${req.body.gameId}`);

    if(foundGame.gamePrice > foundCustomer.availableCredit) return res.status(400).send("Don't have enough credits to purchase the game!!");
    
    let price=foundGame.gamePrice;
    if(foundCustomer.isGold) price = calculateDiscount(price);

    foundCustomer.availableCredit = foundCustomer.availableCredit - price;
    const saleDoc = new sale(req.body.saleId,
                            foundCustomer,
                            foundGame);
     sales.push(saleDoc);     
     return res.status(200).send(saleDoc);                  
});

let calculateDiscount = function(price){
     return parseInt((price - ((20 / 100) * price)));
}

exports.salesRoute = router;