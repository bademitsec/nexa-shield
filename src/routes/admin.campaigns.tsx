import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Info } from "lucide-react";

interface Campaign {
  id: string; name: string; subject: string; body_html: string;
  status: string; segment: string; recipients_count: number;
  scheduled_at: string | null; sent_at: string | null; created_at: string;
  from_name: string | null; from_email: string | null;
}

export const Route = createFileRoute("/admin/campaigns")({
  component: AdminCampaigns,
});

function AdminCampaigns() {
  const [rows, setRows] = useState<Campaign[]>([]);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("email_campaigns").select("*").order("created_at",{ascending:false});
    setRows((data ?? []) as unknown as Campaign[]);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Delete campaign?")) return;
    const { error } = await supabase.from("email_campaigns").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  return (
    <>
      <AdminHeader title="Email campaigns" actions={<Button size="sm" onClick={() => setCreating(true)}><Plus className="h-3.5 w-3.5 mr-1" />New</Button>} />

      <div className="mb-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <span>Compose and schedule campaigns here. To actually send, connect an email provider (Resend, SendGrid, or SMTP) in your workspace connectors — I can wire that up when you're ready.</span>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Subject</th><th className="text-left px-4 py-2.5">Status</th><th className="text-left px-4 py-2.5">Date</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.subject}</td>
                <td className="px-4 py-3 text-xs capitalize">{c.status}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(c.sent_at ?? c.scheduled_at ?? c.created_at)}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing(c)} className="text-xs text-primary hover:underline">Edit</button>
                  <button onClick={() => del(c.id)} className="text-xs text-destructive hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No campaigns yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {(editing || creating) && (
        <CampaignDialog c={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); load(); }} />
      )}
    </>
  );
}

function CampaignDialog({ c, onClose, onSaved }: { c: Campaign | null; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({
    name: c?.name ?? "",
    subject: c?.subject ?? "",
    body_html: c?.body_html ?? "",
    from_name: c?.from_name ?? "Webfortix",
    from_email: c?.from_email ?? "",
    segment: c?.segment ?? "all_customers",
    status: c?.status ?? "draft",
    scheduled_at: c?.scheduled_at ? c.scheduled_at.slice(0, 16) : "",
  });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    const payload = {
      name: f.name.trim(),
      subject: f.subject.trim(),
      body_html: f.body_html,
      from_name: f.from_name || null,
      from_email: f.from_email || null,
      segment: f.segment,
      status: f.status,
      scheduled_at: f.scheduled_at ? new Date(f.scheduled_at).toISOString() : null,
    };
    const q = c ? supabase.from("email_campaigns").update(payload).eq("id", c.id) : supabase.from("email_campaigns").insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Saved"); onSaved(); }
  };
  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{c ? "Edit campaign" : "New campaign"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <F label="Name"><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></F>
          <F label="Subject"><Input value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} /></F>
          <F label="From name"><Input value={f.from_name} onChange={(e) => setF({ ...f, from_name: e.target.value })} /></F>
          <F label="From email"><Input value={f.from_email} onChange={(e) => setF({ ...f, from_email: e.target.value })} /></F>
          <F label="Segment">
            <select value={f.segment} onChange={(e) => setF({ ...f, segment: e.target.value })} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="all_customers">All customers</option>
              <option value="subscribers">Active subscribers</option>
              <option value="leads">Quote leads</option>
            </select>
          </F>
          <F label="Status">
            <select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="draft">draft</option>
              <option value="scheduled">scheduled</option>
              <option value="sent">sent</option>
            </select>
          </F>
          <F label="Scheduled at"><Input type="datetime-local" value={f.scheduled_at} onChange={(e) => setF({ ...f, scheduled_at: e.target.value })} /></F>
        </div>
        <F label="Body (HTML)"><Textarea rows={10} className="font-mono text-xs" value={f.body_html} onChange={(e) => setF({ ...f, body_html: e.target.value })} /></F>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={saving} onClick={save}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-xs">{label}</Label>{children}</div>;
}
