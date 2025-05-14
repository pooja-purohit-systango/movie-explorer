import NextAuth, { JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id : string;
  name: string;
  password: string;
  email?: string;
}
 interface Session {
  id: string;
  name: string;
  email?: string;
}

const users: { name: string; email: string; password: string }[] = [];
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
            (user: User) =>
              user.name === credentials?.name && user.password === credentials?.password
          );

          if (user) {
            return { id: user.id, name: user.name, email: user.name }; 
          } else {
            return null; 
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/signin",
    signUp: '/signup' 
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: User }) {
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
export { users }; 
