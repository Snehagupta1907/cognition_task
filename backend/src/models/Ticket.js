import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  status: {
    type: String,
    required: true,
    enum: ['todo', 'backlog', 'inProgress', 'Done', 'Cancelled'] 
  },
  priority: { type: Number, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
