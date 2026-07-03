import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

interface Row {
  id: string; full_name: string | null; phone: string | null; created_at: string;
}

function AdminCustomers() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    supabase.from("profiles").select("id,full_name,phone,created_at").order("created_at", { ascending: false })
      .then(({ data }) => setRows((data ?? []) as Row[]));
  }, []);
  return (
    <>
      <AdminHeader title="Customers" />
      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Phone</th><th className="text-left px-4 py-2.5">Joined</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3">{r.full_name ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.phone ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(r.created_at)}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={3} className="p-6 text-center text-muted-foreground">No customers yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
