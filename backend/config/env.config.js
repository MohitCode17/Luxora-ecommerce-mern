import { config as conf } from "dotenv";
conf();

const _config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export const config = Object.freeze(_config);
