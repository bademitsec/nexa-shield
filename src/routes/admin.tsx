import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AdminSidebar } from "@/components/admin/sidebar";
import { getMyRoles } from "@/lib/roles.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Nexashield" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const rolesFn = useServerFn(getMyRoles);
  const [ready, setReady] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          navigate({ to: "/auth", search: { redirect: "/admin" }, replace: true });
          return;
        }
        const res = await rolesFn();
        setIsStaff(res.isStaff);
        if (!res.isStaff) navigate({ to: "/", replace: true });
      } catch {
        navigate({ to: "/auth", replace: true });
      } finally {
        setReady(true);
      }
    })();
  }, [navigate, rolesFn]);

  if (!ready) return <div className="container-x py-20 text-sm text-muted-foreground">Checking access…</div>;
  if (!isStaff) return null;

  return (
    <div className="container-x py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
