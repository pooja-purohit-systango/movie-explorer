import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the types for the JWT token and session
interface JWT {
  id: string;
  name: string;
  email?: string;
}

interface Session {
  id: string;
  name: string;
  email?: string;
}

const LOGIN_API_URL = "https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/users";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(LOGIN_API_URL);
          const users = await response.json(); 
          const user = users.find(
            (user: any) =>
              user.name === credentials?.name && user.password === credentials?.password
          );

          if (user) {
            return { id: user.id, name: user.name, email: user.name }; // You can return any user info
          } else {
            return null; // Authentication failed
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const, // Explicitly type as 'jwt' (or 'database' if using DB-based sessions)
  },
  pages: {
    signIn: "/signin", // Custom signin page URL
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.id = token.id;
        session.name = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
