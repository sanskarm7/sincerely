require('dotenv').config()

CUSER = process.env.CORRECT_USERNAME
CPASS = process.env.CORRECT_PASSWORD

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send('Authentication required');
    }
  
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
  
    if (username === CUSER && password === CPASS) {
      return next();
    }
  
    res.status(401).send('Access denied');
};

module.exports = authMiddleware