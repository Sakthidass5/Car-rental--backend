const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
console.log(role)
    if (role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      console.log(existingAdmin,'existingAdmin')
      if (existingAdmin) {
        return res.status(403).json({ error: 'Admin already registered' });
      }
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({status:true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, 'req.body');

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Email not registered' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateToken(user);
    console.log(token, 'token');

 res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

