import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.config.js";

const startServer = async () => {
  await connectDB();

  const PORT = config.PORT;
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
};

startServer();
