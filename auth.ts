import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { saltAndHashPassword } from "@/utils/password"
import { getUserFromDb } from "@/lib/admin"

declare module "next-auth" {
  interface User {
    admin:boolean
  }
  interface JWT {
    admin?: boolean
  }
}

declare module "next-auth/jwt" {
  interface User {
    admin:boolean
  }
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    admin?: boolean
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, name, password, 2FA token, etc.
      name: "Credentials",
      id: "credentials",
      credentials: {
        name: {},
        password: {},
        id: {},
        admin: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
          const { name, password } = await signInSchema.parseAsync(credentials)

          // logic to verify if the user exists
          user = await getUserFromDb(name, password)
          if (!user) {
            // logic to salt and hash password
            const pwHash = saltAndHashPassword(password)
            return null
          }
          console.log(user.id)
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session({ session, token }) {
      session.user.admin = token.admin as boolean
      return session
    },
    jwt({ token, user }) {
      if (user) token.admin = user.admin
      return token
    }
}
})