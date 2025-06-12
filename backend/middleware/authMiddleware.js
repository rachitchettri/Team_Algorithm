// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//       return res.status(401).json({ 
//         success: false,
//         message: 'No token, authorization denied' 
//       });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ 
//         success: false,
//         message: 'No token, authorization denied' 
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ 
//         success: false,
//         message: 'User not found' 
//       });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('Authentication Error:', err);
//     res.status(401).json({ 
//       success: false,
//       message: 'Token is not valid' 
//     });
//   }
// };

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};