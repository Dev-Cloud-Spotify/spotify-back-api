//exemple route
import express from 'express';
const router = express.Router();
import exempleController from '../controllers/Exemple.controller';

router.get('/test', exempleController.test);
router.post('/exemple', exempleController.createExemple);

export default router;