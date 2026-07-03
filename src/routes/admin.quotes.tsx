import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";
import { Textarea } from "@/components/ui/textarea";

const STATUSES = ["new","contacted","quoted","won","lost"] as const;

interface Quote {
  id: string; full_name: string; email: string; phone: string;
  service: string; message: string | null; status: string;
  address: string | null; property_size: string | null; created_at: string;
  attachments: string[] | null;
}

export const Route = createFileRoute("/admin/quotes")({
  component: AdminQuotes,
});

function AdminQuotes() {
  const [rows, setRows] = useState<Quote[]>([]);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    const { data } = await supabase.from("quotes").select("*").order("created_at",{ascending:false});
    setRows((data ?? []) as unknown as Quote[]);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("quotes").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Updated"); load(); }
  };

  return (
    <>
      <AdminHeader title="Quotes & leads" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
              <tr><th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Service</th><th className="text-left px-4 py-2.5">Status</th><th className="text-left px-4 py-2.5">Date</th></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rows.map((q) => (
                <tr key={q.id} onClick={() => setSelected(q)} className="cursor-pointer hover:bg-secondary/40">
                  <td className="px-4 py-3"><div>{q.full_name}</div><div className="text-xs text-muted-foreground">{q.email}</div></td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{q.service.replace(/-/g," ")}</td>
                  <td className="px-4 py-3">
                    <select value={q.status} onChange={(e) => { e.stopPropagation(); updateStatus(q.id, e.target.value); }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(q.created_at)}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No quote requests yet.</td></tr>}
            </tbody>
          </table>
        </div>

        <aside className="rounded-xl border border-border/60 bg-card/40 p-5 h-fit sticky top-20">
          {selected ? (
            <>
              <h3 className="font-semibold">{selected.full_name}</h3>
              <p className="text-xs text-muted-foreground">{selected.email} · {selected.phone}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Service</p>
              <p className="text-sm capitalize">{selected.service.replace(/-/g," ")}</p>
              {selected.address && (<><p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Address</p><p className="text-sm">{selected.address}</p></>)}
              {selected.property_size && (<><p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Property size</p><p className="text-sm">{selected.property_size}</p></>)}
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Message</p>
              <Textarea readOnly value={selected.message ?? ""} rows={5} className="text-xs" />
              {selected.attachments && selected.attachments.length > 0 && (
                <>
                  <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Attachments</p>
                  <ul className="text-xs list-disc pl-4">{selected.attachments.map((a) => <li key={a}>{a}</li>)}</ul>
                </>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a quote to view details.</p>
          )}
        </aside>
      </div>
    </>
  );
}
