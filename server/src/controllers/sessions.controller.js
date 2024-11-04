import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import AuthService from "../services/AuthService.js";
import { usersService } from "../managers/index.js";
import roleModel from '../managers/mongo/models/role.model.js';

const SECRET_KEY = config.jwt.SECRET_KEY;

const register = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        const newUser = {
            email,
            name,
            password: hashedPassword,
        };

         // Check if the email and password match the admin credentials
         if (email === config.admin.EMAIL && password === config.admin.PASSWORD) {
            const adminRole = await roleModel.findOne({ name: 'admin' });
            newUser.roles = [adminRole._id];
        } 
        // Check if the email and password match the moderator credentials
        else if (email === config.moderator.EMAIL && password === config.moderator.PASSWORD) {
            const moderatorRole = await roleModel.findOne({ name: 'moderator' });
            newUser.roles = [moderatorRole._id];
        } 
        // Default role assignment
        else {
            const userRole = await roleModel.findOne({ name: 'user' });
            newUser.roles = [userRole._id];
        }

        const createdUser = await usersService.createUser(newUser);

        const token = jwt.sign({ id: createdUser._id }, SECRET_KEY, {
            expiresIn: 86400, // 24 hours
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password); // ok llega el email y password

        const user = await usersService.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        console.log('User email:', user.email);

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        const token = jwt.sign( {email: user.email, name: user.name, role: user.roles }, SECRET_KEY, { expiresIn: '1d' });
        res.cookie('AuthorizationToken', token, { httpOnly: true, secure: true }).json({ status: "success", message: "logged in" });
        console.log('Token Server:', token);
};

const logout = (req,res)=>{ 
	res.clearCookie('AuthorizationToken').send({ status: "success", message: "logged out" });
}

const admin = (req, res) => {
    res.send({ status: "success", message: "Admin" });
};

const current = (req, res) => {
};

export default {
    register,
    login,
    current,
    logout,
    admin
};