import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Nexashield" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/auth", search: { redirect: "/account" } });
    }
  },
  component: AccountPage,
});

function AccountPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || ""));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    nav({ to: "/" });
  };

  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <User className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">My account</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link to="/contact" className="rounded-xl border border-border bg-surface/60 p-5 hover:border-primary/40">
            <p className="font-semibold">My quotes</p>
            <p className="mt-1 text-sm text-muted-foreground">Track your quote requests.</p>
          </Link>
          <Link to="/shop" className="rounded-xl border border-border bg-surface/60 p-5 hover:border-primary/40">
            <p className="font-semibold">My orders</p>
            <p className="mt-1 text-sm text-muted-foreground">Track shipments & installs.</p>
          </Link>
        </div>

        <div className="mt-8">
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    </section>
  );
}
