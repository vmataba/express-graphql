const express = require('express');
const schema = require('./schema/schema')


const app = express();

const port = process.env.PORT || 3500;

const graphQl = require('express-graphql');

app.use('/graphiql', graphQl({
    schema,
    graphiql: true
}));



app.listen(port, () => console.log(`Listening on port ${port}`));


