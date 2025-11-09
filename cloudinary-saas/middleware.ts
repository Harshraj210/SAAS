import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// clerkMatcher --> It "matches" URL paths and tells your middleware which routes to make public and which to protect.

const isPublicroute = createRouteMatcher(["/sign-in", "/sign-up", "/", "/home"]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async(auth, req) => {
  const { userId } = await auth();
  const currentUrl = new URL(req.url);
  const isAccessingHomepage = currentUrl.pathname === "/home";

  const isApirequest = currentUrl.pathname.startsWith("/api");

  if (userId && isPublicApiRoute(req) && !isAccessingHomepage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  // if user is not logged in and request is for protected routes
  if (!userId) {
    if (!isPublicroute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect("/sign-in");
    }
  }

  
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
