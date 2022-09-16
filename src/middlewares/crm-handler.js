import { verifyToken } from '../utils/jwt';
import config from '../app.config';

export default function (accepted = ['admin', 'staff', 'collab']) {
  return async function (req, res, next) {
    const bearer_token = req.headers.authorization;
    if (bearer_token && bearer_token.startsWith('Bearer ')) {
      try {
        const token = bearer_token.split(' ')[1];
        const decoded = await verifyToken(token, config.secret_key);
        req.user = decoded._id;

        if (!accepted.includes(decoded.role))
          return res.status(403).json({ message: 'Forbidden' });
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
