const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = 80;
const HOST = '0.0.0.0';

const schema = buildSchema(`
  type User {
    id: ID!,
    name: String
  }
  type Query {
    user(id: ID!): User
  }
`);

const fakeDB = {
  35: {
    name: 'Paul'
  }
};

const rootValue = {
  user({ id }) {
    return fakeDB[id];
  }
};

const app = express();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(PORT, HOST);
