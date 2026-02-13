"use client";

import { useState } from "react";
import { authClient } from "@/utils/auth-client"

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
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
  }

  if (loading) return <h1>Loading</h1>

  return (
    <div>
      <h1>Singup Page</h1>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignUp} disabled={loading}>Sign Up</button>

    </div>
  )
}

