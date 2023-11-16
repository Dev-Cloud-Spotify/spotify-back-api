import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controllers';

router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getUsers);
router.get('/getUserById/:id', userController.getUserById);
router.put('/updateUserById/:id', userController.updateUserById);
router.delete('/deleteUserById/:id', userController.deleteUserById);

export default router;