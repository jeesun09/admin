import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();
import cors from "cors";

const PORT = 5000 || process.env.PORT;

connectDB();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

import adminRoute from "./routes/admin.routes.js";
import employeeRoute from "./routes/employee.routes.js";
app.use("/api/admin", adminRoute);
app.use("/api/employee", employeeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
