import { Router } from "express";

import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productcontrollers.js";
import { protect } from "../middleware/authMiddleware.js";



const productRouter = Router();


productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", protect, addProduct);

productRouter.patch("/:id", protect, updateProduct);

productRouter.delete("/:id", protect, deleteProduct);



export { productRouter };