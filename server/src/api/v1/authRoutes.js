import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../../controllers/authController.js';
import { protect } from '../../middlewares/authMiddleware.js'; // Import middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// --- NEW ROUTE ---
router.put('/profile', protect, updateUserProfile);

export default router;