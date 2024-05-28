import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'employer' } 
});

employerSchema.pre('save', async function (next) {
  const employer = this;
  if (employer.isModified('password')) {
    employer.password = await bcrypt.hash(employer.password, 8);
  }
  next();
});

const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
