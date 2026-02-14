import { User } from "better-auth";

interface EmailProps {
  url: string;
  user: User;
  type: number;
}

export function EmailTemplate({ url, user, type }: EmailProps) {
  let buttonText = "";
  if (type === 1) buttonText = "Verify Email"
  if (type === 2) buttonText = "Change Password"

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Click the button below to {buttonText}:</p>
      <a href={url} style={{ padding: "10px 16px", background: "#000", color: "#fff" }}>
        {buttonText}
      </a>
      <p>If you didn’t requested for this, you can ignore this email.</p>
    </div>
  )
}
