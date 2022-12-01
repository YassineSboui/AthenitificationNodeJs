import express from 'express'
const router = express.Router()

import {
  authUser,
  getUserProfile,
  registerUser,
  protect,
} from '../controllers/userController.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
