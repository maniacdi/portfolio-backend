// src/routes/travels.ts
import { Router } from 'express';
import { 
  getTravels,
  getTravelById,
  createTravel,
  updateTravel,
  deleteTravel,
  getTravelStats 
} from '../controllers/travelsController';

const router = Router();

// GET /api/travels - Obtener todos los viajes (con filtros opcionales)
router.get('/', getTravels);

// GET /api/travels/stats - Estadísticas de viajes
router.get('/stats', getTravelStats);

// GET /api/travels/:id - Obtener un viaje por ID
router.get('/:id', getTravelById);

// POST /api/travels - Crear nuevo viaje
router.post('/', createTravel);

// PUT /api/travels/:id - Actualizar viaje
router.put('/:id', updateTravel);

// DELETE /api/travels/:id - Eliminar viaje
router.delete('/:id', deleteTravel);

export default router;