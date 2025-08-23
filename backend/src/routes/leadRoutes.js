import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createLead,
  getLead,
  updateLead,
  deleteLead,
  listLeads,
} from "../controllers/leadController.js";

const router = Router();

router.use(authRequired);
router.post("/", createLead);
router.get("/", listLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
