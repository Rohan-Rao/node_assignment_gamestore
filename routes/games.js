const { game,validateGame }  = require('./../models/games');
const express = require('express');
const router = express.Router();
let games = [];

router.get('/', (req, res) => {
    if(games.length == 0 ) return res.status(404).send('No games');
    return res.status(200).send(games);
});

router.get('/:id', (req, res) => {
    const foundGame = games.find(game => game.gameId == req.params.id);
    if(!foundGame) return res.status(404).send(`No game with id-${req.params.id}`);
    return res.status(200).send(foundGame);
});

router.post('/', (req, res) => {
    const { error } = validateGame(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const gameDoc = new game(
                            req.body.gameId,
                            req.body.gameName,
                            req.body.gamePlatform,
                            req.body.gameCategory,
                            req.body.gamePrice,
                            req.body.inStock            
                        );
                        
    games.push(gameDoc);
    return res.status(200).send(gameDoc);
});

router.put('/:id', (req, res) => {
    const { error } = validateGame(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let foundGame = games.find(game => game.gameId == req.params.id);
    if(!foundGame) return res.status(404).send(`No game with id-${req.params.id}`);
        foundGame.gameId =  req.body.gameId;
        foundGame.gameName =   req.body.gameName;
        foundGame.gamePlatform =  req.body.gamePlatform;
        foundGame.gameCategory =  req.body.gameCategory;
        foundGame.gamePrice =  req.body.gamePrice;    
        foundGame.inStock =  req.body.inStock;
    return res.status(200).send(foundGame);    
});

router.delete('/:id', (req, res) => {
    const gameIndex = games.findIndex(game => game.gameId == req.params.id);
    if(gameIndex == -1) return res.status(404).send(`No customer with id-${req.params.id}`);
    return res.status(200).send(games.splice(gameIndex, 1));
});

exports.games = games;
exports.gameRoute = router;