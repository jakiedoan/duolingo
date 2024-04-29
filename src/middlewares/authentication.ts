import { authMiddleware } from '@clerk/nextjs';

export const authenticationMiddleware = () => {
  return authMiddleware({
    publicRoutes: ['/'],
    //DELETE IN PRODUCTION.
    ignoredRoutes: ['/((?!api|trpc))(_next.*|.+.[w]+$)', '/api/(.*)'],
  });
};

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
