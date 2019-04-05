const { customerRoute } =  require('./routes/customers');
const { gameRoute } =  require('./routes/games');
const { salesRoute } =  require('./routes/sales');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/customers', customerRoute);
app.use('/api/games', gameRoute);
app.use('/api/sales', salesRoute);
app.listen(4444, () => console.log('Listening on port 4444'));