import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login"
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/members/:path*", "/teams/:path*", "/loja/:path*", "/streams/:path*", "/creators/:path*"]
};
