import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import AuthService from "../services/AuthService.js";
import { usersService } from "../managers/index.js";


const SECRET_KEY = config.jwt.SECRET_KEY;
const ADMIN_USER = config.app.ADMIN_USER;
const ADMIN_PWD = config.app.ADMIN_PWD;

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        let role = 'user';
        if (email === ADMIN_USER && password === ADMIN_PWD) {
           role = 'admin';
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        const newUser = {
            email,
            name,
            password: hashedPassword,
            role
        };

        await usersService.createUser(newUser);
        res.status(200).json({ status: "success", message: "Registered" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Registration failed", error: error.message });
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

        const token = jwt.sign( {email: user.email, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
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