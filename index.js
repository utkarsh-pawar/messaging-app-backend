import express from "express";
import config from "./src/configs/config.js";
import cors from "cors";
import db from "./src/database/db.js";
import contactRoute from "./src/routes/contact.routes.js";
import userRoute from "./src/routes/user.routes.js";
import messageRoute from "./src/routes/message.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

db();

app.get("/", (req, res) => {
  res.send("Hello!! Welcome to Contacts App");
});

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/message", messageRoute);

app.listen(config.PORT, () => {
  console.log(`app is listening on port ${config.PORT}`);
});
