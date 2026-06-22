import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';

// GET /api/projects — all projects (no pagination), ordered for display
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';

    const projects = await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: projects,
      total: projects.length,
    });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ success: false, error: 'Error al obtener los proyectos' });
  }
};

// GET /api/projects/slug/:slug — single project by slug (used by /proyectos/[slug])
export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).lean();

    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error getting project by slug:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el proyecto' });
  }
};

// GET /api/projects/:id — single project by id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error getting project by id:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el proyecto' });
  }
};

// POST /api/projects — create
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body as IProject);
    await project.save();
    res.status(201).json({ success: true, data: project, message: 'Proyecto creado exitosamente' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ success: false, error: 'Error al crear el proyecto' });
  }
};

// PUT /api/projects/:id — update
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }

    res.json({ success: true, data: project, message: 'Proyecto actualizado exitosamente' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({ success: false, error: 'Error al actualizar el proyecto' });
  }
};

// DELETE /api/projects/:id — delete
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }

    res.json({ success: true, message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar el proyecto' });
  }
};
