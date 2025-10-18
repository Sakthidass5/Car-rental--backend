const Car = require('../models/Car');
const Booking = require('../models/Booking');

exports.getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

// exports.addCar = async (req, res) => {
//   const car = new Car(req.body);
//   await car.save();
//   res.status(201).json(car);
// };
exports.addCar = async (req, res) => {
  const { name, type, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const car = new Car({ name, type, price, imageUrl });
  await car.save();
  res.status(201).json(car);
};

exports.updateCar = async (req, res) => {
  const { name, type, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  const updateData = { name, type, price };
  if (imageUrl) updateData.imageUrl = imageUrl;

  const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(car);
};

exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Car deleted' });
};

// exports.updateCar = async (req, res) => {
//   const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(car);
// };

// exports.deleteCar = async (req, res) => {
//   await Car.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Car deleted' });
// };

exports.bookCar = async (req, res) => {
  const booking = new Booking({
    userId: req.user.id,
    carId: req.body.carId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  await booking.save();
  res.status(201).json(booking);
};
