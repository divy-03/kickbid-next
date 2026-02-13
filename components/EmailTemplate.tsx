import { User } from "better-auth";
import * as React from 'react';

interface EmailProps {
  url: string;
  user: User;
}

export function EmailTemplate({ url, user }: EmailProps) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Click the button below to verify your email:</p>
      <a href={url} style={{ padding: "10px 16px", background: "#000", color: "#fff" }}>
        Verify Email
      </a>
      <p>If you didn’t sign up, you can ignore this email.</p>
    </div>
  )
}
