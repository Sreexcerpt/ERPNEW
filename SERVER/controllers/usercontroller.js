const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserCompany = require('../models/UserCompany');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, companies } = req.body;
    console.log('Creating user with data:', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    for (const item of companies) {
      const userCompany = new UserCompany({
        userId: user._id,
        companyId: item.companyId,
        role: item.role
      });
      await userCompany.save();
    }

    res.status(201).json({ message: 'User created and assigned to companies' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const userCompanies = await UserCompany.find({ userId: user._id }).populate('companyId');

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        companies: userCompanies.map(uc => ({
          companyId: uc.companyId._id,
          companyName: uc.companyId.name,
          role: uc.role
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserCompanies = async (req, res) => {
  const userId = req.params.id;
  console.log('Fetching companies for user ID:', userId);
  const userCompanies = await UserCompany.find({ userId }).populate('companyId');
  const companies = userCompanies.map((uc) => ({
    _id: uc.companyId._id,
    name: uc.companyId.name,
    role: uc.role,
  }));
  res.json(companies);
};
