import express from "express";
import { productRouter } from "./routes/productRoutes.js";
import { connectDB } from "./config/connectDB.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

process.loadEnvFile();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

mongoose.connect(process.env.URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use('/api/products', productRouter);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});