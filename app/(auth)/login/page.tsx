"use client";

import { useState } from "react";
import { authClient } from "@/utils/auth-client"
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let toastId: string | number | undefined;
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/"
    }, {
      onRequest: () => {
        setLoading(true);
        toastId = toast.loading("Logging In");
      },
      onSuccess: () => {
        if (toastId) toast.success("Login successful", { id: toastId });
        setLoading(false);
      },
      onError: (ctx) => {
        if (toastId) toast.error(ctx.error.message, { id: toastId });
        else toast.error(ctx.error.message);
        if (ctx.error.status === 403) {
          toast.error("Please verify your email address");
        }
        setLoading(false);
      }
    })
  }


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link href="/signup">Sign Up</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleLogin} className="w-full" disabled={loading}>
            {loading === false ? ("Login") : (<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />)}
          </Button>
        </CardFooter>
      </Card>
    </div >
  )
}

