const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; 

function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    SECRET_KEY,
    { expiresIn: '1d' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
