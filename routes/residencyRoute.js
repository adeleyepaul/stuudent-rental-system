import express from 'express';
import { createResidency, getAllResidencies, getResidency } from '../controller/residencyController.js';
import { checkUserRole } from '../middleware/rbac.js';
const router = express.Router();

router.post("/create-residency", createResidency)
router.get("/all-residence", getAllResidencies)
router.get("/:id", getResidency)

export {router as residencyRoute}  