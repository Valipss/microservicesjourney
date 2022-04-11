// Initializes the `images` service on path `/images`
const { Images } = require('./images.class');
const createModel = require('../../models/images.model');
const hooks = require('./images.hooks');
const multer = require('multer');
const uploader = require('../../middleware/uploader.js');


module.exports = function (app) {

  const multipartUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
      fileSize: 1e+7 //  The max file size in bytes, here it's 10MB
      // files: the number of files
      // READ MORE https://www.npmjs.com/package/multer#limits
    }
  });

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/images', multipartUpload.single('file'), uploader(app), new Images(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('images');

  service.hooks(hooks);
};
