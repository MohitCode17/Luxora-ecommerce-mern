import app from "./app.js";
import { config } from "./config/env.config.js";

const startServer = async () => {
  const PORT = config.PORT;
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
};

startServer();
