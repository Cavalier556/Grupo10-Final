import { Router } from "express";

const router = Router();

import {
  getCategorias,
  getCategoria,
  addCategoria,
  updateCategoria,
  delCategoria,
} from "../controllers/categoriaController.js";

router.get("/categorias", getCategorias);
router.post("/categoria", addCategoria);
router.get("/categoria/:id", getCategoria);
router.put("/categoria/:id", updateCategoria);
router.delete("/categoria/:id", delCategoria);

export default router;
