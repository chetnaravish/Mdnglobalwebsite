import dotenv from "dotenv";
import { resolve } from "path";

// .env file project root se load hoti hai — transfer hone pe bhi kaam karta hai
dotenv.config({ path: resolve(import.meta.dirname, "../../..", ".env") });

import app from "./app";
import { logger } from "./lib/logger";

// On Replit PORT is injected automatically; locally defaults to 3000.
const port = Number(process.env["PORT"]) || 3000;

app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
