import { authMiddleware } from '@/middlewares/authentication';
import { chain } from '@/middlewares/chain';
import { languageMiddleware } from '@/middlewares/language';

export default chain([authMiddleware, languageMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
