import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // If Bearer prefix exists, split it
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // attach user id to req
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protect;
