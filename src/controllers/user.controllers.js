import { signJwt } from '../helpers/signJwt.js';
import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';


const userController = {
    createUser : async (req, res) => {
    console.log('createUser()'.cyan)
    try {
        const { username } = req.body;
        const password1= req.body.password;
         const password= bcrypt.hashSync(password1, 10)
        const newuser = new User({ username, password, isAdmin : true});
        const saveduser = await newuser.save();
        res.status(201).json(saveduser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
    getUsers : async (req, res) => {
        console.log('getUsers()'.cyan)
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    getUserById : async (req, res) => {
        console.log('getUserById()'.cyan)
        try {
            const id = req.params.id;
            const data = await User.findById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    updateUserById: async (req, res) => {
        console.log('updateUserById()'.cyan)
        const  { username, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { username, password },
          { new: true }
        );
        res.json(updatedUser);
    },
    deleteUserById: async (req, res) => {
        console.log('deleteUserById()'.cyan)
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            res.json({ message: `User with id ${id} deleted.` });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    //Login with username and password
    
    login: async (req, res) => {
        console.log('login()'.cyan)
        const {password}  = req.body;
        await User.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          return res.send({
            message: "User not found",
            auth: false
          })
        }
        let isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          return res.send({
            message: "Password is not valid",
            auth: false
          })
        }
        const userToken = signJwt({
          id: user._id,
          isAdmin: user.isAdmin
        }, process.env.JWT_SECRET)
  
        res.send({
          auth:true,
          message:"User logged",
          token: userToken
        })
  
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  },
};
export default userController;