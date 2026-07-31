import app from "./app";
import { logger } from "./lib/logger";

// On Replit PORT is injected automatically; locally defaults to 3000.
const port = Number(process.env["PORT"]) || 3000;

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
