import { config } from "dotenv";

// Cargar variables de entorno desde un archivo .env
config();

export default {
    app: {
        PORT: process.env.PORT || 8080,
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    jwt: {
        SECRET_KEY: process.env.SECRET_KEY
    },
    admin: {
        EMAIL: process.env.ADMIN_EMAIL,
        PASSWORD: process.env.ADMIN_PASSWORD
    },
    moderator: {
        EMAIL: process.env.MODERATOR_EMAIL,
        PASSWORD: process.env.MODERATOR_PASSWORD
    }
};