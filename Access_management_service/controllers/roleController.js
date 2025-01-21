import { roleService } from "../services/roleService.js";
import logger from "../utils/logger.js";

const roleController = {
  addNewRole: async function createNewRole(req, res, next) {
    try {
      const { name } = req.body;
      const newRole = await roleService.createRole(name);
      return res.status(201).json({
        success: true,
        message: "New Role created successfully",
        role: newRole,
      });
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      next(error);
    }
  },
  deleteRole: async function deleteRole(req, res, next) {
    try {
      const { roleId } = req.body;
      const result = await roleService.deleteRoleById(roleId);
      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Error deleting role: ${error.message}`);
      next(error);
    }
  },
  getUsersByRoleId: async function getUsersByRoleId(req, res, next) {
    try {
      const { roleId } = req.params;
      const users = await roleService.getUsersByRoleId(roleId);
      if (users.message) {
        return res.status(404).json({ message: users.message });
      }
      return res.status(200).json(users);
    } catch (error) {
      logger.error(`Error deleting role: ${error.message}`);
      next(error);
    }
  },
  searchUsers: async function searchUsers(req, res, next) {
    try {
      const users = await roleService.searchUsers(req.query);

      if (users.message) {
        return res.status(404).json({ message: users.message });
      }

      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      logger.error(`Error deleting role: ${error.message}`);
      next(error);
    }
  },
  addUserToRole: async function addUserToRole(req, res, next) {
    try {
      const { userId, roleId } = req.body;
      const result = await roleService.addUserToRole(userId, roleId);
      return res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      logger.error(`Error in addUserToRole controller: ${error.message}`);
      next(error);
    }
  },
};

export { roleController };
