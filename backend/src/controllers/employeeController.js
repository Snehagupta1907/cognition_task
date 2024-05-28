import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';

export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('employer');
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createEmployee = async (req, res) => {
  const employee = new Employee({ ...req.body, employer: req.employer._id });

  try {
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateEmployee = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const employee = await Employee.findOne({ _id: req.params.id, employer: req.employer._id });

    if (!employee) {
      return res.status(404).send();
    }

    updates.forEach((update) => (employee[update] = req.body[update]));
    await employee.save();

    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id, employer: req.employer._id });

    if (!employee) {
      return res.status(404).send();
    }

    res.send(employee);
  } catch (error) {
    res.status(500).send();
  }
};
