import jwt from 'jsonwebtoken';
import Employer from '../models/Employer.js';

const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      console.log('Token:', token);
      const decoded = jwt.verify(token, "your_jwt_secret");
      console.log('Decoded:', decoded);
      const employer = await Employer.findById(decoded._id);
  
      if (!employer) {
        throw new Error();
      }
  
      req.token = token;
      req.employer = employer;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
  

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employer.role)) {
      return res.status(403).send({ error: 'Access denied.' });
    }
    next();
  };
};

export { auth, authorize };
