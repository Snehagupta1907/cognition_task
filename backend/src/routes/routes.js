import express from 'express';
import { registerEmployer, loginEmployer, getEmployerProfile } from '../controllers/employerController.js';
import { getEmployeeProfile, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { getAllTickets, createTicket, updateTicket, deleteTicket, getTicketsByEmployer } from '../controllers/ticketController.js';
import { auth, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Employer routes
router.post('/employers/register', registerEmployer);
router.post('/employers/login', loginEmployer);
router.get('/employers/me', auth, authorize(['employer']), getEmployerProfile);

// Employee routes
router.post('/employees', auth, authorize(['employer']), createEmployee);
router.get('/employees/:id', auth, authorize(['employer']), getEmployeeProfile);
router.patch('/employees/:id', auth, authorize(['employer']), updateEmployee);
router.delete('/employees/:id', auth, authorize(['employer']), deleteEmployee);

// Ticket routes

router.get('/employees/:employeeId/tickets', auth, authorize(['employer']), getAllTickets);
router.post('/employees/:employeeId/tickets', auth, authorize(['employer']), createTicket);
router.patch('/employees/:employeeId/tickets/:id', auth, authorize(['employer']), updateTicket);
router.delete('/employees/:employeeId/tickets/:id', auth, authorize(['employer']), deleteTicket);
router.get('/tickets/employer/:employerId',auth, authorize(['employer']), getTicketsByEmployer);

export default router;
