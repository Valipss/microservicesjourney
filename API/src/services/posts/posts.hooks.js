const includer = require('../../hooks/includer');
const retrieveSender = require('../../hooks/retrieve-sender');

const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), includer, retrieveSender],
    update: [authenticate('jwt'), includer, retrieveSender],
    patch: [authenticate('jwt'), includer, retrieveSender],
    remove: [authenticate('jwt'), includer, retrieveSender]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
