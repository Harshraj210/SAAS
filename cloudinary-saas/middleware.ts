import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';

// clerkMatcher --> It "matches" URL paths and tells your middleware which routes to make public and which to protect.

const isPublicroute = createRouteMatcher([
  "/login",
  "/signup",
  "/",
  "/home",
])

const isPublicApiRoute = createRouteMatcher([
  "/api/videos",

])

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};