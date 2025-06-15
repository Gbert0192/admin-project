import { z } from "zod";

export const CreatePermissionSchema = z
  .object({
    route: z
      .string()
      .min(1, { message: "Route is required." })
      .startsWith("/", { message: "Route must start with a '/'" }),
    permission_name: z
      .string()
      .min(1, { message: "Permission name is required." }),
    method: z.array(z.enum(["GET", "POST", "PUT", "DELETE"])).optional(),
    is_menu: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.is_menu) {
        return data.method && data.method.length > 0;
      }
      return true;
    },
    {
      message: "Method is required for non-menu permissions.",
      path: ["method"],
    }
  );

export const UpdatePermissionSchema = z.object({
  route: z
    .string()
    .min(1, { message: "Route is required." })
    .startsWith("/", { message: "Route must start with a '/'" }),
  permission_name: z
    .string()
    .min(1, { message: "Permission name is required." }),
  method: z.array(z.enum(["GET", "POST", "PUT", "DELETE"])),
});

export const DeletePermissionSchema = z.object({
  uuid: z.string().min(1, { message: "UUID is required." }),
});

export const MethodEnum = z.enum(["GET", "POST", "PUT", "DELETE"]);
export type Method = z.infer<typeof MethodEnum>;

export type CreatePermissionSchemaType = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionSchemaType = z.infer<typeof UpdatePermissionSchema>;

export type DeletePermissionSchemaType = z.infer<typeof DeletePermissionSchema>;
