/**
 * @author Rohan Rao
 * @param { a customer object from customer.js } customerObj
 * @function customer- initializes the customer object
 */
let customer = function(customerObj){
    this.id = customerObj.custId;
    this.name = customerObj.custName;
}

/**
 * @author Rohan Rao
 * @param { a game object from game.js } gameObj
 * @function game- initializes the game object 
 */
let game = function(gameObj){
    this.id = gameObj.gameId;
    this.name = gameObj.gameName;
    this.price = gameObj.gamePrice;
}

/**
 * @author Rohan Rao
 * @param {unique identifier for sale object} saleId 
 * @param {a customer object from customer.js} customerObj 
 * @param {a game object from game.js } gameObj 
 * @function sale- initializes the sales object
 */
let sale = function(saleId,customerObj, gameObj){
    this.saleId = saleId,
    this.customer = new customer(customerObj);
    this.game = new game(gameObj);
    this.datePurchased = Date();
}
exports.sale = sale;