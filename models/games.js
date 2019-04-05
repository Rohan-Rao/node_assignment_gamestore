const Joi = require('Joi');//Joi for validation
/**
 * @author Rohan Rao
 * @param { unique identifier for a game } gameId
 * @param { a string representing name of game } gameName
 * @param { a array of gaming platforms } gamePlatform
 * @param { a string representing catefory for the game } gameCategory
 * @param { a number representing game price } gamePrice: 
 * @param { a number for number of games in stock } inStock
 * @function game: instializes game object    
 */
let game = function(gameId, gameName, gamePlatform, gameCategory, gamePrice, inStock) {
    this.gameId = gameId;
    this.gameName =  gameName;
    this.gamePlatform = gamePlatform;
    this.gameCategory = gameCategory;
    this.gamePrice = gamePrice;    
    this.inStock = inStock;
}

/**
 * @author Rohna Rao
 * @param { initializes a game object } gameObj
 * @function validateGame: function validates the game object with the defined joi schema.
 *                         Returns a callback of error,value 
 */
let validateGame =  function(gameObj){
    const Schema = Joi.object({
        gameId: Joi.number().required(),
        gameName: Joi.string().min(3).max(15).regex(/^[a-zA-Z]/).required(),
        gamePlatform: Joi.array().items(Joi.string().required()).min(1).required(),
        gameCategory: Joi.string().min(3).required(),
        gamePrice: Joi.number().greater(1000).less(4000),
        inStock: Joi.number().required()
    });
    return Joi.validate(gameObj,Schema,);
}
exports.game = game;
exports.validateGame = validateGame;