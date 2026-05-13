// /* Middleware of Clerk Authentication */

// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware({
//   publicRoutes: ['/']
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static files
     */
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};