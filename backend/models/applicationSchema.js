const applicationSchema = new mongoose.Schema({
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: props => `${props.value} is not a valid user ID`
      }
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'reviewed', 'rejected'], default: 'pending' },
    cvFile: String,
    portfolioFile: String
  }, {
    timestamps: true
  });
  