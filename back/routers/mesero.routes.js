import { Router } from "express";
/*import { requireAuth } from "../middlewares/requireAuth.js";*/
const router = Router();

import {
  getMeseros,
  getMesero,
  addMesero,
  updateMesero,
  delMesero,
} from "../controllers/meseroController.js";
import { obtenerMesero } from "../controllers/userController.js";

/*router.get('/mesero/profile', requireAuth, profileMesero);*/
router.get("/meseros", getMeseros);
router.get("/mesero/:id", getMesero);
router.post("/mesero", addMesero);
router.put("/mesero/:id", updateMesero);
router.delete("/mesero/:id", delMesero);
router.post("/mesero/signin", obtenerMesero);

export default router;
