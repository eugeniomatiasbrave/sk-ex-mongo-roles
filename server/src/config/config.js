import { config } from "dotenv";

// Cargar variables de entorno desde un archivo .env
config();

export default {
    app: {
        PORT: process.env.PORT || 8080,
        ADMIN_USER : process.env.ADMIN_EMAIL,
        ADMIN_PWD : process.env.ADMIN_PASSWORD
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    jwt: {
        SECRET_KEY: process.env.SECRET_KEY
    },
};