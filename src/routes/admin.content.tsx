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
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

type Tab = "blog" | "portfolio";

function AdminContent() {
  const [tab, setTab] = useState<Tab>("blog");
  return (
    <>
      <AdminHeader title="Content" />
      <div className="mb-4 inline-flex rounded-md border border-border/60 p-0.5 text-xs">
        <TabBtn active={tab === "blog"} onClick={() => setTab("blog")}>Blog</TabBtn>
        <TabBtn active={tab === "portfolio"} onClick={() => setTab("portfolio")}>Portfolio</TabBtn>
      </div>
      {tab === "blog" ? <BlogPanel /> : <PortfolioPanel />}
    </>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded px-3 py-1.5 ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{children}</button>;
}

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string | null;
  content: string; author_name: string | null; cover_url: string | null;
  published: boolean; published_at: string | null; created_at: string;
  reading_minutes: number | null; tags: string[] | null;
}

function BlogPanel() {
  const [rows, setRows] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as unknown as BlogPost[]);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Delete post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  return (
    <>
      <div className="mb-4 flex justify-end"><Button size="sm" onClick={() => setCreating(true)}><Plus className="h-3.5 w-3.5 mr-1" />New post</Button></div>
      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left px-4 py-2.5">Title</th><th className="text-left px-4 py-2.5">Status</th><th className="text-left px-4 py-2.5">Date</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3"><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">/{r.slug}</div></td>
                <td className="px-4 py-3 text-xs">{r.published ? <span className="text-emerald-400">Published</span> : <span className="text-muted-foreground">Draft</span>}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(r.published_at ?? r.created_at)}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing(r)} className="text-xs text-primary hover:underline">Edit</button>
                  <button onClick={() => del(r.id)} className="text-xs text-destructive hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {(editing || creating) && (
        <BlogDialog post={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); load(); }} />
      )}
    </>
  );
}

function BlogDialog({ post, onClose, onSaved }: { post: BlogPost | null; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    author_name: post?.author_name ?? "Nexashield Team",
    cover_url: post?.cover_url ?? "",
    published: post?.published ?? false,
    reading_minutes: post?.reading_minutes ?? 5,
    tags: (post?.tags ?? []).join(", "),
  });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!f.title.trim() || !f.content.trim()) { toast.error("Title and content required"); return; }
    setSaving(true);
    const payload = {
      title: f.title.trim(),
      slug: f.slug.trim() || f.title.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-"),
      excerpt: f.excerpt || null,
      content: f.content,
      author_name: f.author_name || null,
      cover_url: f.cover_url || null,
      published: f.published,
      published_at: f.published ? (post?.published_at ?? new Date().toISOString()) : null,
      reading_minutes: Number(f.reading_minutes) || null,
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const q = post ? supabase.from("blog_posts").update(payload).eq("id", post.id) : supabase.from("blog_posts").insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Saved"); onSaved(); }
  };
  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{post ? "Edit post" : "New post"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <F label="Title"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></F>
          <F label="Slug"><Input value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} /></F>
          <F label="Author"><Input value={f.author_name} onChange={(e) => setF({ ...f, author_name: e.target.value })} /></F>
          <F label="Cover image URL"><Input value={f.cover_url} onChange={(e) => setF({ ...f, cover_url: e.target.value })} /></F>
          <F label="Reading minutes"><Input type="number" value={f.reading_minutes} onChange={(e) => setF({ ...f, reading_minutes: Number(e.target.value) })} /></F>
        </div>
        <F label="Excerpt"><Textarea rows={2} value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} /></F>
        <F label="Content (markdown or plain text)"><Textarea rows={10} value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} /></F>
        <F label="Tags (comma separated)"><Input value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} /></F>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} /> Published</label>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={saving} onClick={save}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface Project {
  id: string; title: string; slug: string; summary: string;
  content: string | null; category: string; cover_url: string | null;
  client: string | null; published: boolean; featured: boolean;
  sort_order: number; completed_at: string | null; created_at: string;
  tags: string[] | null;
}

function PortfolioPanel() {
  const [rows, setRows] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const load = async () => {
    const { data } = await supabase.from("portfolio_projects").select("*").order("sort_order",{ascending:true});
    setRows((data ?? []) as unknown as Project[]);
  };
  useEffect(() => { load(); }, []);
  const del = async (id: string) => {
    if (!confirm("Delete project?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };
  return (
    <>
      <div className="mb-4 flex justify-end"><Button size="sm" onClick={() => setCreating(true)}><Plus className="h-3.5 w-3.5 mr-1" />New project</Button></div>
      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left px-4 py-2.5">Title</th><th className="text-left px-4 py-2.5">Category</th><th className="text-left px-4 py-2.5">Status</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3"><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">/{r.slug}</div></td>
                <td className="px-4 py-3 text-muted-foreground capitalize">{r.category}</td>
                <td className="px-4 py-3 text-xs">{r.published ? <span className="text-emerald-400">Published</span> : <span className="text-muted-foreground">Draft</span>}{r.featured && <span className="ml-2 text-primary">★ Featured</span>}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing(r)} className="text-xs text-primary hover:underline">Edit</button>
                  <button onClick={() => del(r.id)} className="text-xs text-destructive hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No projects yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {(editing || creating) && (
        <ProjectDialog p={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); load(); }} />
      )}
    </>
  );
}

function ProjectDialog({ p, onClose, onSaved }: { p: Project | null; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({
    title: p?.title ?? "",
    slug: p?.slug ?? "",
    summary: p?.summary ?? "",
    content: p?.content ?? "",
    category: p?.category ?? "home-security",
    cover_url: p?.cover_url ?? "",
    client: p?.client ?? "",
    published: p?.published ?? false,
    featured: p?.featured ?? false,
    sort_order: p?.sort_order ?? 0,
    tags: (p?.tags ?? []).join(", "),
  });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!f.title.trim() || !f.summary.trim() || !f.category.trim()) {
      toast.error("Title, summary and category are required"); return;
    }
    setSaving(true);
    const payload = {
      title: f.title.trim(),
      slug: f.slug.trim() || f.title.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-"),
      summary: f.summary,
      content: f.content || null,
      category: f.category,
      cover_url: f.cover_url || null,
      client: f.client || null,
      published: f.published,
      featured: f.featured,
      sort_order: Number(f.sort_order) || 0,
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const q = p ? supabase.from("portfolio_projects").update(payload).eq("id", p.id) : supabase.from("portfolio_projects").insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Saved"); onSaved(); }
  };
  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{p ? "Edit project" : "New project"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <F label="Title"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></F>
          <F label="Slug"><Input value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} /></F>
          <F label="Category">
            <select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="home-security">Home Security</option>
              <option value="web-design">Web Design</option>
              <option value="digital-marketing">Digital Marketing</option>
            </select>
          </F>
          <F label="Client"><Input value={f.client} onChange={(e) => setF({ ...f, client: e.target.value })} /></F>
          <F label="Cover image URL"><Input value={f.cover_url} onChange={(e) => setF({ ...f, cover_url: e.target.value })} /></F>
          <F label="Sort order"><Input type="number" value={f.sort_order} onChange={(e) => setF({ ...f, sort_order: Number(e.target.value) })} /></F>
        </div>
        <F label="Summary"><Textarea rows={2} value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} /></F>
        <F label="Content"><Textarea rows={8} value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} /></F>
        <F label="Tags (comma separated)"><Input value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} /></F>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} /> Published</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={f.featured} onChange={(e) => setF({ ...f, featured: e.target.checked })} /> Featured</label>
        </div>
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
