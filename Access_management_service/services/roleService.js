import db from "../db/models/index.js";
import { AppError } from "../utils/errorHandler.js";
import logger from "../utils/logger.js";

const roleService = {
  createRole: async function createRole(name) {
    try {
      const existingRole = await db.Role.findOne({ where: { name } });
      if (existingRole) {
        throw new AppError("Role already exists", 400);
      }
      const newRole = await db.Role.create({ name });
      logger.info(`Role created successfully: ${newRole.name}`);
      return newRole;
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      throw new AppError(error.message, 500);
    }
  },
  findRole: async function findRoleById(roleId) {
    try {
      const roleFound = await db.Role.findByPk(roleId);
      if (!roleFound) {
        throw new AppError("Role not found", 404, {
          role_id: roleId,
          message: "not found",
        });
      }
      return roleFound;
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      throw new AppError(error.message, 500);
    }
  },
  deleteRoleById: async function deleteRoleById(roleId) {
    try {
      const roleToDelete = await this.findRole(roleId);
      if (roleToDelete.name === "Unallocated") {
        throw new Error("Unallocated role cannot be dropped");
      }
      const unallocatedRole = await db.Role.findOne({
        where: { name: "Unallocated" },
      });

      if (!unallocatedRole) {
        throw new Error("Unallocated role does not exist");
      }

      await db.User.update(
        { role_id: unallocatedRole.role_id },
        { where: { role_id: roleToDelete.role_id } }
      );

      await roleToDelete.destroy();

      logger.info(`Role deleted successfully: ${roleToDelete.name}`);
      return {
        success: true,
        message: "Role deleted and users reassigned to Unallocated",
      };
    } catch (error) {
      logger.error(`Error deleting role: ${error.message}`);
      throw new AppError(error.message, 500);
    }
  },
  getUsersByRoleId: async function getUsersByRoleId(roleId) {
    try {
      if (!roleId || isNaN(roleId)) {
        throw new Error("Invalid roleId provided.");
      }
      const users = await db.UserRole.findAll({
        where: { role_id: roleId },
        include: {
          model: db.User,
          attributes: ["user_id", "email", "created_at", "updated_at"],
        },
      });
      if (users.length === 0) {
        return { message: "No users found for this role." };
      }
      return users.map((userRole) => userRole.User);
    } catch (error) {
      console.error("Error in getUsersByRoleId:", error);
      logger.error(`Error getting the users by roleId: ${error.message}`);
      throw new Error("Error retrieving users by role.");
    }
  },
  searchUsers: async function searchUsers(searchParams) {
    try {
      const { email, id } = searchParams;
      const query = {};

      if (email) {
        query.email = email;
      }

      if (id) {
        query.user_id = id;
      }

      const users = await db.User.findAll({
        where: query,
        attributes: {
          exclude: ["password"], // Exclude password from the result
        },
      });

      if (users.length === 0) {
        return { message: "No users found matching the criteria." };
      }

      return users;
    } catch (error) {
      logger.error(`Error searching the users: ${error.message}`);
      throw new Error("Error searching for users.");
    }
  },
  addUserToRole: async function addUserToRole(userId, roleId) {
    try {
      const user = await db.User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const role = await db.Role.findByPk(roleId);
      if (!role) {
        throw new Error("Role not found");
      }
      const existingRole = await db.UserRole.findOne({
        where: { user_id: userId, role_id: roleId },
      });
      if (existingRole) {
        throw new Error("User already has this role");
      }
      await db.UserRole.create({
        user_id: userId,
        role_id: roleId,
      });
      return `User with ID ${userId} has been added to role ${roleId}`;
    } catch (error) {
      logger.error(`Error adding the users to role: ${error.message}`);
      throw new Error("Error adding user to role");
    }
  },
};

export { roleService };
