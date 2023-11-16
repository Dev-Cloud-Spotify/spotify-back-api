import User from '../models/user.models.js';

const userController = {
    createUser : async (req, res) => {
    try {
        const { username, password } = req.body;
        const newuser = new User({ username, password });
        const saveduser = await newuser.save();
        res.status(201).json(saveduser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
    getUsers : async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    getUserById : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await User.findById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    updateUserById: async (req, res) => {
        const  { username, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { username, password },
          { new: true }
        );
        res.json(updatedUser);
    },
    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            res.json({ message: `User with id ${id} deleted.` });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
export default userController;