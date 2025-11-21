const router = require('express').Router();

const {
  getArticles,
  saveArticles,
  deleteArticles,
} = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', saveArticles);

router.delete('/:id', deleteArticles);

module.exports = router;
