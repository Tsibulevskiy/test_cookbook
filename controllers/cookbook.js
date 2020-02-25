const Recipe = require('../models/recipe');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
  try {
    const recipes = await Recipe.find({user: req.user.id});
    res.status(200).json(recipes)
  } catch (e) {
    errorHandler(res, e)
  }
};
module.exports.getById = async function (req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe)
  } catch (e) {
    errorHandler(res, e)
  }
};
module.exports.remove = async function (req, res) {
  try {
    await Recipe.remove({_id: req.params.id});
    res.status(200).json({
      message: 'Рецепт удален'
    })
  } catch (e) {
    errorHandler(res, e)
  }
};
module.exports.create = async function (req, res) {
  const recipe =  new Recipe({
    name: req.body.name,
    imageSrc: req.file ? req.file.path : '',
    user: req.user.id,
    description: req.body.description,
    data: req.body.data
  });
  try {
    await recipe.save();
    res.status(201).json(recipe);
  } catch (e) {
    errorHandler(res, e)
  }
};
module.exports.update = async function (req, res) {
  const updated = {
    name: req.body.name,
    description: req.body.description
  };
  if (req.file) {
    updated.imageSrc = req.file.path;
  }
  try {
    const recipe = await Recipe.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
      );
    res.status(200).json(recipe);
  } catch (e) {
    errorHandler(res, e)
  }
};
