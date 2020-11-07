var express = require('express');
var router = express.Router();
var [getProducts, insertProduct, updateProduct] = require('../controllers/product');
const auth = require('../lib/utils/auth.js')

/* GET product listing. */
router.get('/', auth.checkToken, async function (req, res, next) {
  const products = await getProducts();
  res.send(products);
});

/**
 * POST product
 */
router.post('/', auth.requireAdmin, async function (req, res, next) {
  const newProduct = await insertProduct(req.body);
  res.send(newProduct.ops[0]);
});

/**
 * PUT product
 */
router.put('/', auth.requireAdmin, async function (req, res, next) {
  var newProduct = await updateProduct(req.body);
  if (newProduct.result.nModified > 0){
    res.send(req.body);
  }
  else{
    res.send(400).json({
      success: false,
      message: "Incorrect fields.",
    });
  }
});

module.exports = router;