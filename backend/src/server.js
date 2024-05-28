import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import routes from "./routes/routes.js"


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

console.log(port)

connectDB();

app.use('/api', routes);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
