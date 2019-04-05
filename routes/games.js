const { game,validateGame }  = require('./../models/games');
const express = require('express');
const router = express.Router();
let games = []; //array of game objects

/**
 * @author Rohan Rohan
 * @function get the list of all games
 */
router.get('/', (req, res) => {
    if(games.length == 0 ) return res.status(404).send('No games');
    return res.status(200).send(games);
});

/**
 * @author Rohan Rohan
 * @function get a game according to the id
 */
router.get('/:id', (req, res) => {
    //find the game according to the id
    const foundGame = games.find(game => game.gameId == req.params.id);

    //if not found return the appropriate response with status code
    if(!foundGame) return res.status(404).send(`No game with id-${req.params.id}`);

    //return the found game as response
    return res.status(200).send(foundGame);
});

/**
 * @author Rohan Rao
 * @function to create a new game object
 */
router.post('/', (req, res) => {
    //validate the input request using joi
    const { error } = validateGame(req.body);

    //if error return appropriate response
    if(error) return res.status(400).send(error.details[0].message);

    //create a game object
    const gameDoc = new game(
                            req.body.gameId,
                            req.body.gameName,
                            req.body.gamePlatform,
                            req.body.gameCategory,
                            req.body.gamePrice,
                            req.body.inStock            
                        );
    //push it to the games list
    games.push(gameDoc);

    //return the newly added game object
    return res.status(200).send(gameDoc);
});

/**
 * @author Rohan Rao
 * @function to edit a game object
 */
router.put('/:id', (req, res) => {
    //validate the input request customer using joi
    const { error } = validateGame(req.body);
    
    //if error return appropriate response
    if(error) return res.status(400).send(error.details[0].message);

    //find the customer according to the id received in request params    
    let foundGame = games.find(game => game.gameId == req.params.id);

    //if not found return the appropriate response with status code
    if(!foundGame) return res.status(404).send(`No game with id-${req.params.id}`);
        
    //edit the game object with its new properties
        foundGame.gameId =  req.body.gameId;
        foundGame.gameName =   req.body.gameName;
        foundGame.gamePlatform =  req.body.gamePlatform;
        foundGame.gameCategory =  req.body.gameCategory;
        foundGame.gamePrice =  req.body.gamePrice;    
        foundGame.inStock =  req.body.inStock;
    
    //return the updated customer    
    return res.status(200).send(foundGame);    
});

/**
 * @author Rohan Rao
 * @function to delete a game object
 */
router.delete('/:id', (req, res) => {
    //find the game object index according to the id received in request params
    const gameIndex = games.findIndex(game => game.gameId == req.params.id);

    //if not found return the appropriate response with status code
    if(gameIndex == -1) return res.status(404).send(`No customer with id-${req.params.id}`);

     //return the deleted game object
    return res.status(200).send(games.splice(gameIndex, 1));
});

exports.games = games;
exports.gameRoute = router;