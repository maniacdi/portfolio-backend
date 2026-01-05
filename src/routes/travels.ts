import { Router } from 'express';
import { 
  getAllTravels,
  getTravels,
  getTravelById,
  createTravel,
  updateTravel,
  deleteTravel,
  getTravelStats 
} from '../controllers/travelsController';

const router = Router();

// GET /api/travels - Get all travels with pagination and filters
router.get('/', getTravels);

// GET /api/travels - Get all travels without pagination
router.get('/all', getAllTravels);

// GET /api/travels/stats - Stats about travels
router.get('/stats', getTravelStats);

// GET /api/travels/:id - Get travel by ID
router.get('/:id', getTravelById);

// POST /api/travels - Create new travel
router.post('/', createTravel);

// PUT /api/travels/:id - Update travel
router.put('/:id', updateTravel);

// DELETE /api/travels/:id - Delete travel
router.delete('/:id', deleteTravel);

export default router;