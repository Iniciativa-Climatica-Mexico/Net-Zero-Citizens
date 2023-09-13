import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const { GOOGLE_ID, GOOGLE_SECRET } = require('../utils/constants');

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
