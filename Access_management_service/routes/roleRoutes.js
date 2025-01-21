import express from "express";
import { roleController } from "../controllers/roleController.js";
import {
  validateRoleCreation,
  validateBodyRoleId,
  validateParamRoleId,
  validateUserSearch,
  validateUserRoleAddition,
} from "../validations/validateRole.js";

const router = express.Router();

router.post("/", validateRoleCreation, roleController.addNewRole);
router.delete("/", validateBodyRoleId, roleController.deleteRole);
router.post("/add", validateUserRoleAddition, roleController.addUserToRole);
router.get("/search", validateUserSearch, roleController.searchUsers);
router.get("/search", validateUserSearch, roleController.searchUsers);
router.get(
  "/:roleId/users",
  validateParamRoleId,
  roleController.getUsersByRoleId
);

export default router;
