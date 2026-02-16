import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { resend } from "./resend";
import { EmailTemplate } from "@/components/EmailTemplate";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: "KickBid <no-reply@divydev.xyz>",
        to: [user.email],
        subject: "Reset your password",
        react: EmailTemplate({ user, url, type: 2 })
      });
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }, request) => {
      void resend.emails.send({
        from: "KickBid <no-reply@divydev.xyz>",
        to: [user.email],
        subject: "Verify your email",
        react: EmailTemplate({ user, url, type: 1 })
      })
    },
    autoSignInAfterVerification: true,
  },
  plugins: [nextCookies()],
});
