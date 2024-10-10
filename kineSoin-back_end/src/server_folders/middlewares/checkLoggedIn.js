import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function checkLoggedIn(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Access denied. No authentication token provided.' });
  }

  const token = authorization.split(' ')[1];
  try {
    const jwtContent = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
    req.user = jwtContent;
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message:
        'Unauthorized access. Authentication token is missing or invalid.',
    });
  }
  next();
}
