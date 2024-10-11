import { config as conf } from "dotenv";
conf();

const _config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export const config = Object.freeze(_config);
