const includer = require('../../hooks/includer');
const retrieveSender = require('../../hooks/retrieve-sender');

const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt'), includer, retrieveSender ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
