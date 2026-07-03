import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatNGN } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

interface Category { id: string; name: string; slug: string; display_order: number; }
interface Product {
  id: string; name: string; slug: string; short_description: string | null;
  description: string | null; price_ngn: number; compare_at_price_ngn: number | null;
  deposit_percent: number; stock: number; low_stock_threshold: number;
  is_active: boolean; is_featured: boolean; is_subscription: boolean;
  subscription_interval: string | null; sku: string | null; category_id: string | null;
  images: string[]; specs: Record<string, string | number>;
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [catDialog, setCatDialog] = useState(false);

  const load = async () => {
    const [p, c] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("product_categories").select("*").order("display_order"),
    ]);
    setProducts((p.data ?? []) as unknown as Product[]);
    setCats((c.data ?? []) as Category[]);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <>
      <AdminHeader title="Products" actions={
        <>
          <Button variant="outline" size="sm" onClick={() => setCatDialog(true)}>Categories</Button>
          <Button size="sm" onClick={() => setCreating(true)}><Plus className="h-3.5 w-3.5 mr-1" />New product</Button>
        </>
      } />
      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><Th>Name</Th><Th>Category</Th><Th>Price</Th><Th>Stock</Th><Th>Status</Th><Th></Th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {products.map((p) => {
              const cat = cats.find((c) => c.id === p.category_id);
              const low = !p.is_subscription && p.stock <= p.low_stock_threshold;
              return (
                <tr key={p.id} className="hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.sku ?? "—"} · {p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{cat?.name ?? "—"}</td>
                  <td className="px-4 py-3">{formatNGN(p.price_ngn)}{p.is_subscription ? `/${p.subscription_interval}` : ""}</td>
                  <td className={`px-4 py-3 ${low ? "text-destructive font-medium" : ""}`}>{p.is_subscription ? "—" : p.stock}</td>
                  <td className="px-4 py-3 text-xs">
                    {p.is_active ? <span className="text-emerald-400">Active</span> : <span className="text-muted-foreground">Draft</span>}
                    {p.is_featured && <span className="ml-2 text-accent">Featured</span>}
                    {p.is_subscription && <span className="ml-2 text-primary">Sub</span>}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => setEditing(p)} className="text-xs text-primary hover:underline"><Edit className="h-3.5 w-3.5 inline" /> Edit</button>
                    <button onClick={() => del(p.id)} className="text-xs text-destructive hover:underline">Delete</button>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No products yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <ProductDialog
          categories={cats}
          product={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); load(); }}
        />
      )}
      {catDialog && <CategoriesDialog cats={cats} onClose={() => { setCatDialog(false); load(); }} />}
    </>
  );
}

function ProductDialog({ categories, product, onClose, onSaved }: {
  categories: Category[]; product: Product | null;
  onClose: () => void; onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    sku: product?.sku ?? "",
    category_id: product?.category_id ?? (categories[0]?.id ?? ""),
    short_description: product?.short_description ?? "",
    description: product?.description ?? "",
    price_ngn: product?.price_ngn ?? 0,
    compare_at_price_ngn: product?.compare_at_price_ngn ?? "",
    deposit_percent: product?.deposit_percent ?? 100,
    stock: product?.stock ?? 0,
    low_stock_threshold: product?.low_stock_threshold ?? 5,
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
    is_subscription: product?.is_subscription ?? false,
    subscription_interval: product?.subscription_interval ?? "monthly",
    image_url: product?.images?.[0] ?? "",
    specs_json: product ? JSON.stringify(product.specs ?? {}, null, 2) : "{}",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    let specs: Record<string, unknown> = {};
    try { specs = JSON.parse(form.specs_json || "{}"); } catch { toast.error("Specs must be valid JSON"); setSaving(false); return; }
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-"),
      sku: form.sku.trim() || null,
      category_id: form.category_id || null,
      short_description: form.short_description || null,
      description: form.description || null,
      price_ngn: Number(form.price_ngn) || 0,
      compare_at_price_ngn: form.compare_at_price_ngn ? Number(form.compare_at_price_ngn) : null,
      deposit_percent: Math.max(10, Math.min(100, Number(form.deposit_percent) || 100)),
      stock: Number(form.stock) || 0,
      low_stock_threshold: Number(form.low_stock_threshold) || 0,
      is_active: form.is_active,
      is_featured: form.is_featured,
      is_subscription: form.is_subscription,
      subscription_interval: form.is_subscription ? form.subscription_interval : null,
      images: form.image_url.trim() ? [form.image_url.trim()] : [],
      specs: specs as never,
    };
    const q = isEdit
      ? supabase.from("products").update(payload).eq("id", product!.id)
      : supabase.from("products").insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success(isEdit ? "Updated" : "Created"); onSaved(); }
  };

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isEdit ? "Edit product" : "New product"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Slug"><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto from name" /></Field>
          <Field label="SKU"><Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></Field>
          <Field label="Category">
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">—</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Price (NGN)"><Input type="number" value={form.price_ngn} onChange={(e) => setForm({ ...form, price_ngn: Number(e.target.value) })} /></Field>
          <Field label="Compare-at price (optional)"><Input type="number" value={form.compare_at_price_ngn} onChange={(e) => setForm({ ...form, compare_at_price_ngn: e.target.value as never })} /></Field>
          <Field label="Deposit %"><Input type="number" min={10} max={100} value={form.deposit_percent} onChange={(e) => setForm({ ...form, deposit_percent: Number(e.target.value) })} /></Field>
          <Field label="Stock"><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></Field>
          <Field label="Low-stock threshold"><Input type="number" value={form.low_stock_threshold} onChange={(e) => setForm({ ...form, low_stock_threshold: Number(e.target.value) })} /></Field>
          <Field label="Image URL"><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" /></Field>
        </div>
        <Field label="Short description"><Input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} /></Field>
        <Field label="Description"><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        <Field label="Specs (JSON)"><Textarea rows={4} className="font-mono text-xs" value={form.specs_json} onChange={(e) => setForm({ ...form, specs_json: e.target.value })} /></Field>
        <div className="flex flex-wrap gap-4 text-sm">
          <Check label="Active" v={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} />
          <Check label="Featured" v={form.is_featured} onChange={(v) => setForm({ ...form, is_featured: v })} />
          <Check label="Subscription product" v={form.is_subscription} onChange={(v) => setForm({ ...form, is_subscription: v })} />
          {form.is_subscription && (
            <select value={form.subscription_interval} onChange={(e) => setForm({ ...form, subscription_interval: e.target.value })}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm">
              <option value="monthly">monthly</option><option value="quarterly">quarterly</option><option value="yearly">yearly</option>
            </select>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={saving} onClick={save}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CategoriesDialog({ cats, onClose }: { cats: Category[]; onClose: () => void }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const create = async () => {
    if (!name.trim()) return;
    const { error } = await supabase.from("product_categories").insert({
      name: name.trim(),
      slug: (slug.trim() || name.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-")),
      display_order: cats.length + 1,
    });
    if (error) toast.error(error.message);
    else { setName(""); setSlug(""); toast.success("Added"); onClose(); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete category?")) return;
    const { error } = await supabase.from("product_categories").delete().eq("id", id);
    if (error) toast.error(error.message); else onClose();
  };
  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Categories</DialogTitle></DialogHeader>
        <ul className="space-y-1 max-h-60 overflow-y-auto">
          {cats.map((c) => (
            <li key={c.id} className="flex justify-between text-sm">
              <span>{c.name} <span className="text-muted-foreground">/{c.slug}</span></span>
              <button className="text-xs text-destructive hover:underline" onClick={() => del(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="slug (optional)" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={create}>Add category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-xs">{label}</Label>{children}</div>;
}
function Check({ label, v, onChange }: { label: string; v: boolean; onChange: (v: boolean) => void }) {
  return <label className="inline-flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={v} onChange={(e) => onChange(e.target.checked)} /> {label}</label>;
}
