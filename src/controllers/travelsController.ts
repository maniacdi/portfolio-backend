import { Request, Response } from 'express';
import Travel, { ITravel } from '../models/Travel';

// Get ALL travels without pagination
export const getAllTravels = async (req: Request, res: Response) => {
  try {
    const { type, country, year } = req.query;
    
    // Build filter
    const filter: any = {};
    if (type) filter.type = type;
    if (country) filter.country = country;
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      filter['dates.start'] = { $gte: startDate, $lte: endDate };
    }

    // Fetch ALL travels (no pagination)
    const travels = await Travel.find(filter)
      .sort({ 'dates.start': -1 })
      .lean();

    res.json({
      success: true,
      data: travels,
      total: travels.length
    });
  } catch (error) {
    console.error('Error getting all travels:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los viajes'
    });
  }
};

// Get all travels with optional filters and pagination
export const getTravels = async (req: Request, res: Response) => {
  try {
    const { type, country, year, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter: any = {};
    if (type) filter.type = type;
    if (country) filter.country = country;
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      filter['dates.start'] = { $gte: startDate, $lte: endDate };
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Fetch travels with pagination
    const [travels, total] = await Promise.all([
      Travel.find(filter)
        .sort({ 'dates.start': -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Travel.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: travels,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error getting travels:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los viajes'
    });
  }
};

// Get stats about travels
export const getTravelStats = async (req: Request, res: Response) => {
  try {
    const stats = await Travel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          countries: { $addToSet: '$country' },
          byType: { 
            $push: '$type'
          }
        }
      },
      {
        $project: {
          total: 1,
          countriesCount: { $size: '$countries' },
          byType: {
            vacation: {
              $size: {
                $filter: {
                  input: '$byType',
                  as: 'type',
                  cond: { $eq: ['$$type', 'vacation'] }
                }
              }
            },
            business: {
              $size: {
                $filter: {
                  input: '$byType',
                  as: 'type',
                  cond: { $eq: ['$$type', 'business'] }
                }
              }
            },
            adventure: {
              $size: {
                $filter: {
                  input: '$byType',
                  as: 'type',
                  cond: { $eq: ['$$type', 'adventure'] }
                }
              }
            },
            cultural: {
              $size: {
                $filter: {
                  input: '$byType',
                  as: 'type',
                  cond: { $eq: ['$$type', 'cultural'] }
                }
              }
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      total: 0,
      countriesCount: 0,
      byType: {
        vacation: 0,
        business: 0,
        adventure: 0,
        cultural: 0
      }
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas'
    });
  }
};

// Get travel by ID
export const getTravelById = async (req: Request, res: Response) => {
  try {
    const travel = await Travel.findById(req.params.id);
    
    if (!travel) {
      return res.status(404).json({
        success: false,
        error: 'Viaje no encontrado'
      });
    }

    res.json({
      success: true,
      data: travel
    });
  } catch (error) {
    console.error('Error getting travel by id:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el viaje'
    });
  }
};

// Create new travel
export const createTravel = async (req: Request, res: Response) => {
  try {
    const travelData: ITravel = req.body;
    const travel = new Travel(travelData);
    await travel.save();

    res.status(201).json({
      success: true,
      data: travel,
      message: 'Viaje creado exitosamente'
    });
  } catch (error) {
    console.error('Error creating travel:', error);
    res.status(400).json({
      success: false,
      error: 'Error al crear el viaje'
    });
  }
};

// Update travel
export const updateTravel = async (req: Request, res: Response) => {
  try {
    const travel = await Travel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!travel) {
      return res.status(404).json({
        success: false,
        error: 'Viaje no encontrado'
      });
    }

    res.json({
      success: true,
      data: travel,
      message: 'Viaje actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error updating travel:', error);
    res.status(400).json({
      success: false,
      error: 'Error al actualizar el viaje'
    });
  }
};

// Delete travel
export const deleteTravel = async (req: Request, res: Response) => {
  try {
    const travel = await Travel.findByIdAndDelete(req.params.id);

    if (!travel) {
      return res.status(404).json({
        success: false,
        error: 'Viaje no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Viaje eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting travel:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el viaje'
    });
  }
};