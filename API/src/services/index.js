const users = require('./users/users.service.js');
const posts = require('./posts/posts.service.js');
const comments = require('./comments/comments.service.js');
const images = require('./images/images.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(posts);
  app.configure(comments);
  app.configure(images);
};
