
import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  companyAddress: {
    type: String,
    required: [true, 'Please add a company address'],
    trim: true
  },
  companyLicense: {
    type: String,
    required: [true, 'Please add a company license'],
    unique: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure one provider per user
providerSchema.index({ user: 1 }, { unique: true });

export default mongoose.model('Provider', providerSchema);