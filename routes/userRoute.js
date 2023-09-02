import express from 'express';
import { bookResidence, cancelBooking, createUser, getAllBookings } from '../controller/userController.js';
const router = express.Router();

router.post("/register", createUser)
router.post("/rentResidence/:id", bookResidence)
router.post("/getAllBookings", getAllBookings)
router.post("/removeBooking/:id", cancelBooking)

export {router as userRoute}