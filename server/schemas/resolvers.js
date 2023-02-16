const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const userData = await User.findById(user._id).select('-__v -password');
        return userData;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve user data');
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to log in user');
      }
    },

    saveBook: async (parent, { bookData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to save book');
      }
    },

    removeBook: async (parent, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to remove book');
      }
    },
  },
};

module.exports = resolvers;
