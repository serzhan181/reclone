import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.JWT_SECRET as string
}

export default NextAuth(authOptions)