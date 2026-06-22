import { Router } from 'express';
import {
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectsController';

const router = Router();

// GET /api/projects - all projects (ordered, optional ?category= &featured=)
router.get('/', getAllProjects);

// GET /api/projects/slug/:slug - single project by slug (declared before /:id)
router.get('/slug/:slug', getProjectBySlug);

// GET /api/projects/:id - single project by id
router.get('/:id', getProjectById);

// POST /api/projects - create
router.post('/', createProject);

// PUT /api/projects/:id - update
router.put('/:id', updateProject);

// DELETE /api/projects/:id - delete
router.delete('/:id', deleteProject);

export default router;
