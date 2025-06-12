// 

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['finder', 'provider'], default: 'finder' },
  profile: { type: mongoose.Schema.Types.ObjectId, refPath: 'roleModel' },
  roleModel: { type: String, enum: ['Finder', 'Provider'] }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export default mongoose.model('User', userSchema);