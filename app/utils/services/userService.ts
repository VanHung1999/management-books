// User service for handling user-related operations

import { DataProvider } from "@refinedev/core";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCreateData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'admin' | 'manager' | 'staff' | 'customer';
}

export interface UserUpdateData {
  name?: string;
  phone?: string;
  role?: 'admin' | 'manager' | 'staff' | 'customer';
  email?: string;
}

export interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * User Service
 * Handles all user-related operations
 */
export class UserService {
  private dataProvider: DataProvider;

  constructor(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

  /**
   * Get user by ID
   * @param userId - User ID
   * @returns Promise<ServiceResult<User>>
   */
  async getUserById(userId: string): Promise<ServiceResult<User>> {
    try {
      const result = await this.dataProvider.getOne({
        resource: "users",
        id: userId
      });

      return {
        success: true,
        data: result.data as User
      };
    } catch (error) {
      return {
        success: false,
        error: "User not found"
      };
    }
  }

  /**
   * Get user by email
   * @param email - User email
   * @returns Promise<ServiceResult<User>>
   */
  async getUserByEmail(email: string): Promise<ServiceResult<User>> {
    try {
      const result = await this.dataProvider.getOne({
        resource: "users",
        id: email
      });

      return {
        success: true,
        data: result.data as User
      };
    } catch (error) {
      return {
        success: false,
        error: "User not found"
      };
    }
  }

  /**
   * Create new user
   * @param userData - User data
   * @returns Promise<ServiceResult<User>>
   */
  async createUser(userData: UserCreateData): Promise<ServiceResult<User>> {
    try {
      // In a real application, you would:
      // 1. Hash the password with bcrypt
      // 2. Validate email uniqueness
      // 3. Set default values
      // 4. Create user in database

      const result = await this.dataProvider.create({
        resource: "users",
        variables: userData
      });

      return {
        success: true,
        data: result.data as User
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create user"
      };
    }
  }

  /**
   * Update user
   * @param userId - User ID
   * @param userData - Updated user data
   * @returns Promise<ServiceResult<User>>
   */
  async updateUser(userId: string, userData: UserUpdateData): Promise<ServiceResult<User>> {
    try {
      const result = await this.dataProvider.update({
        resource: "users",
        id: userId,
        variables: userData
      });

      return {
        success: true,
        data: result.data as User
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update user"
      };
    }
  }

  /**
   * Delete user
   * @param userId - User ID
   * @returns Promise<ServiceResult<boolean>>
   */
  async deleteUser(userId: string): Promise<ServiceResult<boolean>> {
    try {
      await this.dataProvider.deleteOne({
        resource: "users",
        id: userId
      });

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete user"
      };
    }
  }

  /**
   * Get all users with pagination
   * @param page - Page number
   * @param limit - Items per page
   * @returns Promise<ServiceResult<{ users: User[], total: number }>>
   */
  async getUsers(page: number = 1, limit: number = 10): Promise<ServiceResult<{ users: User[], total: number }>> {
    try {
      const result = await this.dataProvider.getList({
        resource: "users",
        pagination: {
          current: page,
          pageSize: limit
        }
      });

      return {
        success: true,
        data: {
          users: result.data as User[],
          total: result.total || 0
        }
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch users"
      };
    }
  }

  /**
   * Search users
   * @param query - Search query
   * @param filters - Additional filters
   * @returns Promise<ServiceResult<User[]>>
   */
  async searchUsers(
    query: string, 
    filters?: { role?: string; status?: string }
  ): Promise<ServiceResult<User[]>> {
    try {
      const result = await this.dataProvider.getList({
        resource: "users",
        filters: [
          {
            field: "name",
            operator: "contains",
            value: query
          },
          ...(filters?.role ? [{
            field: "role",
            operator: "eq",
            value: filters.role
          }] : [])
        ]
      });

      return {
        success: true,
        data: result.data as User[]
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to search users"
      };
    }
  }

  /**
   * Check if email exists
   * @param email - Email to check
   * @returns Promise<ServiceResult<boolean>>
   */
  async checkEmailExists(email: string): Promise<ServiceResult<boolean>> {
    try {
      const result = await this.getUserByEmail(email);
      return {
        success: true,
        data: result.success
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to check email"
      };
    }
  }

  /**
   * Update user password
   * @param userId - User ID
   * @param newPassword - New password (should be hashed in real app)
   * @returns Promise<ServiceResult<boolean>>
   */
  async updatePassword(userId: string, newPassword: string): Promise<ServiceResult<boolean>> {
    try {
      // In a real application, you would:
      // 1. Hash the password with bcrypt
      // 2. Update password in database
      // 3. Invalidate existing sessions

      const result = await this.dataProvider.update({
        resource: "users",
        id: userId,
        variables: { password: newPassword }
      });

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update password"
      };
    }
  }
}

/**
 * Factory function to create UserService instance
 * @param dataProvider - DataProvider instance
 * @returns UserService
 */
export const createUserService = (dataProvider: DataProvider): UserService => {
  return new UserService(dataProvider);
};

/**
 * Default export for convenience
 */
export default UserService;
