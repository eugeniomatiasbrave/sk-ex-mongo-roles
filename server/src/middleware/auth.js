import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { usersService } from "../managers/index.js";
import rolesModel from '../managers/mongo/models/role.model.js';
import userModel from "../managers/mongo/models/user.model.js";
import bcrypt from 'bcrypt';

export const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers['x-access-token'];

    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, config.jwt.SECRET_KEY);
        req.userId = decoded.id;

        const user = await usersService.getUserById(req.userId, { password: 0 });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}; // ahora podre verificar la existencia del toquen en rutas especificas como: /products..etc en cada endpoint que necesite verificar el token


// verificar si es un admin
export const ADMIN = async (req, res, next) => {
  const user = await usersService.getUserById(req.userId);  
  const roles = await rolesModel.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
          if (user.email === config.admin.EMAIL && await bcrypt.compare(config.admin.PASSWORD, user.password)) {
              next();
              return;
          } else {
              return res.status(403).json({ message: 'Invalid admin credentials' });
          }
      }
  }
  res.status(403).json({ message: 'Require Admin Role!' });
};

// verificar si es un moderador
export const MODERATOR = async (req, res, next) => {
  const user = await usersService.getUserById(req.userId);
  const roles = await rolesModel.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
          if (user.email === config.moderator.EMAIL && await bcrypt.compare(config.moderator.PASSWORD, user.password)) {
              next();
              return;
          } else {
              return res.status(403).json({ message: 'Invalid moderator credentials' });
          }
      }
  }
  res.status(403).json({ message: 'Require Moderator Role!' });
};


export const checkExistingUser = async (req, res, next) => {
    try {
      const userFound = await userModel.findOne({ name: req.body.name });
      if (userFound)
        return res.status(400).json({ message: "The user already exists" });
  
      const email = await userModel.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const checkExistingRole = (req, res, next) => {
    req.body.roles.find();
  
    if (!req.body.roles) return res.status(400).json({ message: "No roles" });
  
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  
    next();
  };
