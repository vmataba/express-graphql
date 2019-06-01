const graphQl = require("graphql");
const _ = require("lodash");

const books = [];

for (let index = 1; index <= 10; index++) {
  books.push({
    id: index,
    title: `Book ${index}`,
    counts: parseInt(index + Math.random() * 100),
    category: "Science",
    authorId: index
  });
}

const authors = [];

for (let index = 1; index <= 10; index++) {
  authors.push({
    id: index,
    firstName: `First name ${index}`,
    lastName: `Last name ${index}`
  });
}

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphQl;

const Author = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    counts: { type: GraphQLInt },
    category: { type: GraphQLString },
    author: {
      type: Author,
      resolve:(source, args) => {
        return _.find(authors, { id: source.authorId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLInt } },
      resolve: (source, args) => {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: Author,
      args: { id: { type: GraphQLInt } },
      resolve: (source, args) => {
        return _.find(authors, { id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
