const includer = require('../../hooks/includer');
const retrieveSender = require('../../hooks/retrieve-sender');

const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [includer],
    find: [],
    get: [],
    create: [authenticate('jwt'), retrieveSender],
    update: [authenticate('jwt'), retrieveSender],
    patch: [authenticate('jwt'), retrieveSender],
    remove: [authenticate('jwt'), retrieveSender]
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
