const { NotFound } = require('@feathersjs/errors');

module.exports = (context) => {
  if (context.params.user?.id) {
    context.data.userId = context.params.user.id;
  } else {
    throw new NotFound('user_id not found in context.params.');
  }
  return context;
};