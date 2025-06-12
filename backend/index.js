import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Enhanced Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Enhanced File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    require('fs').mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter
});

// Enhanced Application Schema with validation
const applicationSchema = new mongoose.Schema({
  jobId: { 
    type: String, 
    required: [true, 'Job ID is required'] 
  },
  jobTitle: { 
    type: String, 
    required: [true, 'Job title is required'],
    trim: true
  },
  company: { 
    type: String, 
    required: [true, 'Company name is required'],
    trim: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'],
    validate: {
      validator: (v) => mongoose.Types.ObjectId.isValid(v),
      message: props => `${props.value} is not a valid user ID`
    }
  },
  // ... (keep other fields the same but add validation where needed)
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Add index for better query performance
applicationSchema.index({ userId: 1 });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ status: 1 });

const Application = mongoose.model('Application', applicationSchema);

// Routes (keeping your existing auth routes unchanged)
app.use('/api/auth', authRoutes);

// Enhanced Application Routes with better validation
app.post('/api/applications', upload.fields([
  { name: 'cvFile', maxCount: 1 },
  { name: 'portfolioFile', maxCount: 1 }
]), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['jobId', 'jobTitle', 'company', 'userId', 'fullName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    const application = new Application({
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.body.userId), // Ensure proper ObjectId
      cvFile: req.files['cvFile'] ? `/uploads/${req.files['cvFile'][0].filename}` : null,
      portfolioFile: req.files['portfolioFile'] ? `/uploads/${req.files['portfolioFile'][0].filename}` : null
    });

    const savedApplication = await application.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Application submitted successfully!',
      data: {
        applicationId: savedApplication._id,
        jobTitle: savedApplication.jobTitle,
        company: savedApplication.company,
        status: savedApplication.status,
        appliedAt: savedApplication.appliedAt
      }
    });

  } catch (error) {
    console.error('Application submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 5MB'
      });
    }
    
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Enhanced GET applications endpoint with pagination
app.get('/api/applications/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const applications = await Application.find({ userId: req.params.userId })
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Application.countDocuments({ userId: req.params.userId });

    res.json({ 
      success: true,
      data: applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch applications',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});