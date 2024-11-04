import { usersService } from "../managers/index.js"


const createUser = async (req, res) => {
    const user = req.body;

    try {
        const newUser = await usersService.createUser(user);
        res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send({ status: "error", error: 'Error al crear el usuario' });
    }
};

export default { 
    createUser
};