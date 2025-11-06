import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
          credentials.email,
        ]);
        const user = rows[0];
        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: user.full_name,
          email: user.email,
          created_at: user.created_at,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "github") {
          // 1️⃣ Check if user already exists
          const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [user.email]
          );

          if (rows.length === 0) {
            // 2️⃣ Insert new GitHub user
            const [result] = await db.execute(
              "INSERT INTO users (full_name, email, password, provider) VALUES (?, ?, NULL, ?)",
              [user.name, user.email, account.provider]
            );
            const insertId = result.id;
            const [rows2] = await db.execute(
              "SELECT * FROM users WHERE id = ?",
              [insertId]
            );
            user.id=rows2[0].id;
            user.created_at=rows2[0].created_at;
            console.log("✅ New GitHub user added:", user.email);
          } else {
            console.log("ℹ️ GitHub user already exists:", user.email);
          }
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("❌ Error in signIn callback:", error);
        return false; // Block sign-in if something goes wrong
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id || token.sub; // token.sub = GitHub user ID
        token.name = user.name;
        token.email = user.email;
        token.provider = account?.provider;
        token.created_at = user.created_at || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.provider = token.provider;
        session.user.created_at = token.created_at;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
