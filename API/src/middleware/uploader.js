module.exports = function (app) {
  return async (req, res, next) => {
    const {
      file,
      postId
    } = req;
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    var fileRes = [];
    var hash = "";
  
    data.append('image', file.buffer, file.originalname);
    var config = {
      method: 'post',
      url: 'http://imagery:3000/upload_files/',
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };

    await axios(config)
    .then(function (response) {
      hash = response.data.token;
    })
    .catch(function (error) {
      console.log(error);
    });
    // req.body.push({"hash":hash});
    req.body.hash = hash;
    console.log(req.body);
    // fileRes.push(await app.service('images').create({
    //   hash: hash,
    //   postId: req.body.postId
    // }));
    next();
  };
};