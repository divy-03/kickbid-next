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

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    const { data, error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `http://localhost:3000/reset-password`,
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        alert("Reset Password request sent successfully");
        setLoading(false);
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        if (ctx.error.status === 403) {
          alert("Please verify your email address");
        }
        setLoading(false);
      }
    })

    console.log(data);
    console.log(error);
  }

  if (loading) return <h1>Loading</h1>

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Rquest Password Reset</CardTitle>
          <CardDescription>
            Enter email to get password reset link
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link href="/login">Login</Link></Button>
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleForgotPassword} className="w-full">
            Request Email
          </Button>
        </CardFooter>
      </Card>
    </div >
  )
}

