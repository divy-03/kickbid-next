import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
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
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "KickBid <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email",
        react: EmailTemplate({ user, url })
      })
    }
  },
  plugins: [nextCookies()],
});
