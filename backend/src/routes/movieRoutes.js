const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie);
router.post('/', auth, movieController.createMovie);
router.put('/:id', auth, movieController.updateMovie);
router.delete('/:id', auth, movieController.deleteMovie);
router.get('/:id/stream', auth, movieController.streamMovie);

module.exports = router;