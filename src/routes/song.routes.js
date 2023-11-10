import express from 'express';
const router = express.Router();
import songController from '../controllers/song.controllers';

router.get('/test', songController.test);

export default router;