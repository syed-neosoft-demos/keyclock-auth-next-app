import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      console.log("account :>> ", account);
      console.log("token :>> ", token);
      return token;
    },
    async session({ session, token }) {
      console.log("token :>> ", token);
      console.log("session.user :>> ", session.user);
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

// CRITICAL: Export both GET and POST
export { handler as GET, handler as POST };
