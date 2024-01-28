require('dotenv').config()
const bcrypt = require('bcryptjs');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send('Authentication required');
    }
  
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [providedUser, providedPass] = credentials.split(':');
  
    const isUsernameValid = (providedUser==='SincerelyTeam')
    const isPasswordValid = await bcrypt.compare(providedPass, '$2a$10$OfSCWVJHqeyo3C7e9hxTF.B74QwuacOWTwSLejFPqTxujPw.MqULm');

    if (isUsernameValid && isPasswordValid) {
      return next();
    }
  
    res.status(401).send('Access denied');
};

module.exports = authMiddleware