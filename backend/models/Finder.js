// import mongoose from 'mongoose';

// const finderSchema = new mongoose.Schema({
//   skills: [String],
//   resume: String,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model('Finder', finderSchema);

import mongoose from 'mongoose';

const finderSchema = new mongoose.Schema({
  skills: {
    type: [String],
    default: []
  },
  resume: {
    type: String
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

// Ensure one finder profile per user
finderSchema.index({ user: 1 }, { unique: true });

export default mongoose.model('Finder', finderSchema);