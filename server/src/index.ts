import app from "./app.js";

import { connectToDb, disconnectFromDb } from "./db/connect.js";

const PORT = process.env.PORT || 5000;

try {
  connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.log(`Something went wrong`);
  disconnectFromDb();
}
