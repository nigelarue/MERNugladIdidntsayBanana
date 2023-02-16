const { gql } = require('apollo-server-express');
// The User type has fields for _id, username, email, bookCount, and savedBooks, while the Book type has fields for bookId, authors, description, image, link, and title.

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;

// The Auth type has fields for token and user. The Query type has a single field, me, which returns a User. The Mutation type has four fields: login, addUser, saveBook, and removeBook.