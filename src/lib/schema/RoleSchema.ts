import { z } from "zod";

export interface Role {
  uuid: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  permission_id: number[];
  role_name: string;
}

export const createRoleSchema = z.object({
  role_name: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()).min(1, "Permission Is Required Min.1"),
  menus: z.array(z.string()).min(1, "Permission Is Required Min.1"),
});

export const updateRolePermissionPayloadSchema = z.object({
  role_name: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()),
  menus: z.array(z.string()),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;
export type UpdateRolePermissionPayload = z.infer<
  typeof updateRolePermissionPayloadSchema
>;
