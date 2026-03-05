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

export default function SingupPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    let toastId: string | number | undefined;
    const { data, error } = await authClient.signUp.email({ // TODO: Remove {data, error} if not being used.
      name,
      email,
      password,
      callbackURL: "/"
    }, {
      onRequest: () => {
        setLoading(true);
        toastId = toast.loading("Signing Up...");
      },
      onSuccess: () => {
        if (toastId) toast.success("Singup successful", { id: toastId });
        setLoading(false);
      },
      onError: (ctx) => {
        if (toastId) toast.error(ctx.error.message, { id: toastId });
        else toast.error(ctx.error.message);
        setLoading(false);
      }
    })

    console.log(data);
    console.log(error);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter below details to get started
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link href="/login">Login</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
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
          <Button type="submit" onClick={handleSignUp} disabled={loading} className="w-full">
            {loading === false ? ("Sign Up") : (<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />)}
          </Button>
        </CardFooter>
      </Card>
    </div >)
}

