import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/join/signin',
        error: '/join/signin'
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req){
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/account/login/`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                

                const user = await res.json();


                if (user.message == "success") {
                    return user;
                }
                return null;
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access;
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
    },
    
    trustHost: true,
    AUTH_TRUST_HOST: true,
})