import { config as conf } from "dotenv";
conf();

const _config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
};

export const config = Object.freeze(_config);
