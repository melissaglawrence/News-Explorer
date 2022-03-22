const Articles = require('../models/articles');

const {
  RequestError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../middleware/error');

const getArticles = (req, res, next) => {
  Articles.find({})
    .orFail(() => {
      console.log('No articles found');
    })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch(next);
};

const saveArticles = (req, res, next) => {
  const { keyword, title, text, link, date, source, image } = req.body;
  Articles.create({
    keyword,
    title,
    text,
    link,
    date,
    source,
    image,
    owner: req.user._id,
  })
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch(next);
};

const deleteArticles = (req, res, next) => {
  Articles.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new NotFoundError('No Articles found');
    })
    .then((articles) => {
      if (!articles) {
        throw new RequestError('Invalid id');
      } else if (articles.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Cannot delete other users articless');
      }
      res.status(200).send({ articles });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.statusCode === 400) {
        throw new RequestError('No articles with that id found');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = { getArticles, saveArticles, deleteArticles };
