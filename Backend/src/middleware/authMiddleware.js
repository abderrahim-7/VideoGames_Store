const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authMiddleware(req, res, next) {
  try {
    // ---- 1) get token and check if it exists
    const authHeader = req.header('Authorization') || '';
    const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = tokenFromHeader || req.cookies?.token || req.query?.token;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // ---- 2) verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ---- 3) check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }

    // ---- 4) check if user changed password after the token was issued
    if (user.passwordChangedAt) {
      const passwordChangedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (decoded.iat < passwordChangedTimestamp) {
        return res.status(401).json({ error: 'Token invalid: password changed. Please login again.' });
      }
    }
    
    // ---- GRANT ACCESS TO PROTECTED ROUTE
    req.user = user; 
    next();

  } catch (err) {

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};
