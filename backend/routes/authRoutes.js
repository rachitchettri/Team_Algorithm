// import express from 'express';
// import { register } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', register);

// export default router;

import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;