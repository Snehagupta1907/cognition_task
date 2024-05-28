import Employer from '../models/Employer.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerEmployer = async (req, res) => {
  const employer = new Employer(req.body);

  try {
    await employer.save();
    const token = jwt.sign({ _id: employer._id.toString() }, 'your_jwt_secret');
    res.status(201).send({ employer, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginEmployer = async (req, res) => {
  try {
    const employer = await Employer.findOne({ email: req.body.email });

    if (!employer) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(req.body.password, employer.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ _id: employer._id.toString() }, 'your_jwt_secret');
    res.send({ employer, token });
  } catch (error) {
    res.status(500).send();
  }
};

export const getEmployerProfile = async (req, res) => {
  res.send(req.employer);
};
