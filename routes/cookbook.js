const express = require('express');
const passport = require('passport');
const controller = require('../controllers/cookbook');
const upload = require('../middleware/upload');
const router = express.Router();

//localhost5000//api/cookbook
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
//localhost5000//api/cookbook
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
//localhost5000//api/cookbook
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
//localhost5000//api/cookbook
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
//localhost5000//api/cookbook
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);


module.exports = router;
