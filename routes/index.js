var express = require('express');
var router = express.Router();

router.get('/api/v1/hello', (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: 'Hello World'
  });
})

module.exports = router;
