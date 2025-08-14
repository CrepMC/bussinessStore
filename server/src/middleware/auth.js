// Auth middleware placeholder
import jwt from 'jsonwebtoken';

export function auth(required = true) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      return required ? res.status(401).json({ msg: 'No token' }) : next();
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  };
}
