"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/utils/auth-client";
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

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const params = useSearchParams();
  const token = params.get("token");

  const handleReset = async () => {
    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: "password",
      token,
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        alert("Password Set Successfully")
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        if (ctx.error.status === 403) {
          alert("Token Expired");
        }
        setLoading(false);
      }
    })

    console.log(data);
    console.log(error);


  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter New Password
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link href="/login">Login</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm</Label>
                </div>
                <Input
                  id="confirmPassowrd"
                  type="password"
                  value={confirmPassowrd}
                  placeholder="Confim Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleReset} disabled={loading} className="w-full">
            {loading === false ? ("Reset Password") : (<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />)}
          </Button>
        </CardFooter>
      </Card>
    </div >
  )
}

