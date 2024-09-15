import NextAuth from "next-auth"
import Passkey from "next-auth/providers/passkey"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Passkey({
            formFields: {
            email: {
                label: "Email",
                required: true,
                autocomplete: "email webauthn",
            },
            },
      }),],
    experimental: { enableWebAuthn: true },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
        error: "auth/error"
    },
})