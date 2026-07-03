import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Nexashield" },
      { name: "description", content: "Sign in to your Nexashield account to track orders, quotes, and subscriptions." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      nav({ to: (redirect as string) || "/account" });
    } catch (e: any) {
      toast.error(e.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      toast.success("Account created — check your email to confirm.");
    } catch (e: any) {
      toast.error(e.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const { lovable } = await import("@/integrations/lovable/index");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) toast.error(result.error.message ?? "Sign-in failed");
  };

  return (
    <section className="container-x flex min-h-[calc(100vh-8rem)] items-center justify-center py-14">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
              <Shield className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">Nexashield</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <AuthForm
                submitLabel="Sign in"
                loading={loading}
                onSubmit={(email, password) => signIn(email, password)}
              />
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <AuthForm
                submitLabel="Create account"
                loading={loading}
                showName
                onSubmit={(email, password, name) => signUp(email, password, name || "")}
              />
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/70" /></div>
            <div className="relative flex justify-center"><span className="bg-surface px-2 text-xs uppercase tracking-widest text-muted-foreground">or</span></div>
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={signInWithGoogle} disabled={loading}>
            Continue with Google
          </Button>
        </div>
      </div>
    </section>
  );
}

function AuthForm({
  submitLabel,
  loading,
  onSubmit,
  showName,
}: {
  submitLabel: string;
  loading: boolean;
  onSubmit: (email: string, password: string, name?: string) => void;
  showName?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password, name);
      }}
    >
      {showName && (
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5" />
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="mt-1.5" />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
