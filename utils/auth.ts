import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg"
import { resend } from "./resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter });


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
    sendVerificationEmail: async ({ user, url }) => {
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
