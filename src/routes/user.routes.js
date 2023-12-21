import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controllers';
import verifyToken from '../middlewares/verifyToken.middlewares';

router.post('/createUser', userController.createUser);
router.get('/getUsers', verifyToken, userController.getUsers);
router.get('/getUserById/:id', verifyToken, userController.getUserById);
router.put('/updateUserById/:id', verifyToken, userController.updateUserById);
router.delete('/deleteUserById/:id', verifyToken, userController.deleteUserById);
router.post('/login', userController.login);

export default router;