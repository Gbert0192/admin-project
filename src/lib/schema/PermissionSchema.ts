import { object, string, z } from "zod";

export const CreatePermissionSchema = object({
  route: string()
    .min(1, { message: "Route is required." })
    .startsWith("/", { message: "Route must start with a '/'" }),
  permission_name: string().min(1, { message: "Permission name is required." }),
});

export const UpdatePermissionSchema = object({
  route: string()
    .min(1, { message: "Route is required." })
    .startsWith("/", { message: "Route must start with a '/'" }),
  permission_name: string().min(1, { message: "Permission name is required." }),
});

export const DeletePermissionSchema = object({
  uuid: string().min(1, { message: "UUID is required." }),
});

export type CreatePermissionSchemaType = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionSchemaType = z.infer<typeof UpdatePermissionSchema>;
export type DeletePermissionSchemaType = z.infer<typeof DeletePermissionSchema>;
