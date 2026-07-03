import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Returns the current user's roles (empty array if none). */
export const getMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const roles = (data ?? []).map((r) => r.role);
    return {
      userId,
      roles,
      isAdmin: roles.includes("admin"),
      isStaff: roles.includes("admin") || roles.includes("staff"),
    };
  });
