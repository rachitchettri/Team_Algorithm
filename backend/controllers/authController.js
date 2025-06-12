// import User from '../models/User.js';
// import Provider from '../models/Provider.js';
// import Finder from '../models/Finder.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { validateRegistration } from '../utils/validators.js';

// export const register = async (req, res) => {
//   try {
//     const { role, username, email, password, companyName, companyAddress, companyLicense } = req.body;

//     // Validate input
//     const { isValid, errors } = validateRegistration(req.body);
//     if (!isValid) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Validation failed',
//         errors 
//       });
//     }

//     // Check for existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: 'Email already registered',
//         field: 'email'
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//       roleModel: role === 'provider' ? 'Provider' : 'Finder'
//     });

//     // Create profile based on role
//     if (role === 'provider') {
//       const existingLicense = await Provider.findOne({ companyLicense });
//       if (existingLicense) {
//         return res.status(409).json({
//           success: false,
//           message: 'Company license already registered',
//           field: 'companyLicense'
//         });
//       }

//       const provider = new Provider({
//         companyName,
//         companyAddress,
//         companyLicense,
//         user: user._id
//       });
//       await provider.save();
//       user.profile = provider._id;
//     } else {
//       const finder = new Finder({
//         user: user._id
//       });
//       await finder.save();
//       user.profile = finder._id;
//     }

//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id, 
//         role: user.role,
//         email: user.email
//       },
//       process.env.JWT_SECRET,
//       { 
//         expiresIn: process.env.JWT_EXPIRES_IN || '7d' 
//       }
//     );

//     // Omit sensitive data from response
//     const userResponse = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//       createdAt: user.createdAt
//     };

//     res.status(201).json({
//       success: true,
//       message: 'Registration successful',
//       data: {
//         user: userResponse,
//         token
//       }
//     });

//   } catch (error) {
//     console.error('Registration Error:', error);
    
//     if (error.code === 11000) {
//       const field = Object.keys(error.keyPattern)[0];
//       return res.status(400).json({
//         success: false,
//         message: `${field} already exists`,
//         field
//       });
//     }

//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).reduce((acc, err) => {
//         acc[err.path] = err.message;
//         return acc;
//       }, {});

//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

import User from '../models/User.js';
import Provider from '../models/Provider.js';
import Finder from '../models/Finder.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRegistration } from '../utils/validators.js';

export const register = async (req, res) => {
  try {
    const { isValid, errors } = validateRegistration(req.body);
    if (!isValid) return res.status(400).json({ errors });

    const { role, username, email, password, companyName, companyAddress, companyLicense } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      roleModel: role === 'provider' ? 'Provider' : 'Finder'
    });

    // Create profile
    if (role === 'provider') {
      const provider = new Provider({
        companyName,
        companyAddress,
        companyLicense,
        user: user._id
      });
      await provider.save();
      user.profile = provider._id;
    } else {
      const finder = new Finder({ user: user._id });
      await finder.save();
      user.profile = finder._id;
    }

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};