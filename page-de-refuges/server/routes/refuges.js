import express from 'express';
import { refugeController } from '../controllers/refugeController.js';

const router = express.Router();

router.get('/refuges', refugeController.getAllRefuges);
router.get('/refuges/:id', refugeController.getRefugeDetails);
router.post('/reservations', refugeController.createReservation);

export default router;