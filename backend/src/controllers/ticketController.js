import Ticket from '../models/Ticket.js';
import Employee from '../models/Employee.js';

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.employeeId });
    res.send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createTicket = async (req, res) => {
  const ticket = new Ticket({ ...req.body, userId: req.params.employeeId });

  try {
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateTicket = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'tag', 'status', 'priority'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.params.employeeId });

    if (!ticket) {
      return res.status(404).send();
    }

    updates.forEach((update) => (ticket[update] = req.body[update]));
    await ticket.save();

    res.send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id, userId: req.params.employeeId });

    if (!ticket) {
      return res.status(404).send();
    }

    res.send(ticket);
  } catch (error) {
    res.status(500).send();
  }
};

export const getTicketsByEmployer = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const employees = await Employee.find({ employer: employerId });
    const employeeIds = employees.map(employee => employee._id);
    const tickets = await Ticket.find({ userId: { $in: employeeIds } });
    res.send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};