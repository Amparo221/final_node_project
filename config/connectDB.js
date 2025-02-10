import mongoose from "mongoose";



const URI_DB = process.env.URI_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(URI_DB);
    console.log("Conexión a la base de datos éxitosa!");
  } catch (error) {
    console.error(error);
  }
};

export { connectDB };