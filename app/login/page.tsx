"use client";

import { useState } from "react";
import { authClient } from "@/utils/auth-client"

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/"
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        alert("Singup success");
        setLoading(false);
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      }
    })

    console.log(data);
    console.log(error);
  }

  if (loading) return <h1>Loading</h1>

  return (
    <div>
      <h1>Login Page</h1>

      <br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin} disabled={loading}>Login</button>

    </div>
  )
}

