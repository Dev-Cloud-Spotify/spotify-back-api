//Exemple controller
const Exemple = require('../models/Exemple');

const exempleController = {
    // Create a new exemple
    createExemple: async (req, res) => {
        try {
        const { name, email } = req.body;
    
        const newExemple = new Exemple({
            name,
            email,
        });
    
        const savedExemple = await newExemple.save();
    
        res.status(201).json(savedExemple);
        } catch (error) {
        console.error(error);
        res.status(500).send();
        }
    },
    // Get all exemples
    getAllExemples: async (req, res) => {
        try {
        const exemples = await Exemple.find();
    
        res.json(exemples);
        } catch (error) {
        console.error(error);
        res.status(500).send();
        }
    },
    // Get one exemple
    getOneExemple: async (req, res) => {
        try {
        const { id } = req.params;
    
        const exemple = await Exemple.findById(id);
    
        res.json(exemple);
        } catch (error) {
        console.error(error);
        res.status(500).send();
        }
    },
    // Update one exemple
    updateOneExemple: async (req, res) => {
        try {
        const { id } = req.params;
    
        const exemple = await Exemple.findByIdAndUpdate(id, req.body, {
            new: true,
        });
    
        res.json(exemple);
        } catch (error) {
        console.error(error);
        res.status(500).send();
        }
    },
    // Delete one exemple
    deleteOneExemple: async (req, res) => {
        try {
        const { id } = req.params;

        await Exemple.findByIdAndDelete(id);

        res.json({ message: 'Exemple deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }
};

export default exempleController;
