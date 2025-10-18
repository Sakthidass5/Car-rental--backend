const express = require('express');
const router = express.Router();
const {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  bookCar
} = require('../controllers/carController');
const upload = require('../middleware/upLoad');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', getCars);
// router.post('/', authMiddleware, roleMiddleware('admin'), addCar);
// router.put('/:id', authMiddleware, roleMiddleware('admin'), updateCar);
// router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteCar);
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  upload.single('image'),
  addCar
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  upload.single('image'),
  updateCar
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteCar
);
router.post('/book', authMiddleware, roleMiddleware('user'), bookCar);

module.exports = router;
