import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/sidebar";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/format";
import { PRIORITY_COUNTRIES } from "@/lib/careers-countries";
import { toast } from "sonner";

const STATUSES = ["all", "new", "reviewing", "shortlisted", "rejected", "hired"] as const;

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplications,
});

function AdminApplications() {
  const qc = useQueryClient();
  const [country, setCountry] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [q, setQ] = useState("");

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["admin", "applications", country, status, q],
    queryFn: async () => {
      let query = supabase
        .from("job_applications")
        .select("id,vacancy_title,vacancy_slug,full_name,email,phone,country,country_other,portfolio_url,cover_letter,status,created_at,admin_notes")
        .order("created_at", { ascending: false })
        .limit(300);
      if (country !== "all") query = query.eq("country", country);
      if (status !== "all") query = query.eq("status", status as never);
      if (q.trim()) query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,vacancy_title.ilike.%${q}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = async (id: string, next: string) => {
    const { error } = await supabase.from("job_applications").update({ status: next as never }).eq("id", id);
    if (error) { toast.error("Update failed"); return; }
    toast.success("Updated");
    qc.invalidateQueries({ queryKey: ["admin", "applications"] });
  };

  return (
    <>
      <AdminHeader title="Job Applications" />
      <div className="mb-4 flex flex-wrap gap-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, role" className="max-w-xs" />
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All countries</option>
          {PRIORITY_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          <option value="Other">Other</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr>
              <Th>Candidate</Th><Th>Role</Th><Th>Country</Th><Th>Portfolio</Th><Th>Status</Th><Th>Received</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {isLoading && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Loading…</td></tr>}
            {apps.map((a) => (
              <tr key={a.id} className="hover:bg-secondary/40 align-top">
                <Td>
                  <div className="font-medium">{a.full_name}</div>
                  <div className="text-xs text-muted-foreground">{a.email}</div>
                  {a.phone && <div className="text-xs text-muted-foreground">{a.phone}</div>}
                  {a.cover_letter && (
                    <details className="mt-1 text-xs text-muted-foreground">
                      <summary className="cursor-pointer text-primary">Cover note</summary>
                      <p className="mt-1 whitespace-pre-wrap">{a.cover_letter}</p>
                    </details>
                  )}
                </Td>
                <Td><div>{a.vacancy_title}</div><div className="text-xs text-muted-foreground">{a.vacancy_slug}</div></Td>
                <Td>
                  {a.country}
                  {a.country === "Other" && a.country_other && <div className="text-xs text-muted-foreground">{a.country_other}</div>}
                  {PRIORITY_COUNTRIES.includes(a.country as never) && (
                    <span className="ml-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">priority</span>
                  )}
                </Td>
                <Td>{a.portfolio_url ? <a href={a.portfolio_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">Link</a> : <span className="text-muted-foreground">—</span>}</Td>
                <Td>
                  <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)} className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                    {STATUSES.filter((s) => s !== "all").map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Td>
                <Td className="text-xs text-muted-foreground">{formatDate(a.created_at)}</Td>
              </tr>
            ))}
            {!isLoading && apps.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No applications match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) { return <th className="text-left px-4 py-2.5">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
