import { RefugeModel } from '../models/refuge.js';

export const refugeController = {
  getAllRefuges: async (req, res) => {
    try {
      console.log("Tentative de récupération de tous les refuges...");
      const refuges = await RefugeModel.getAllRefuges();
      res.json(refuges);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error.message);
      res.status(500).json({ error: error.message });
    }
  },
  

  getRefugeDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const refuge = await RefugeModel.getRefugeById(id);
      res.json(refuge);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createReservation: async (req, res) => {
    try {
      const reservation = await RefugeModel.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};