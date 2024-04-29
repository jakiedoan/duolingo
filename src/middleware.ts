import { authenticationMiddleware } from './middlewares/authentication';
import { chain } from './middlewares/chain';
import { languageMiddleware } from './middlewares/language';

// export function middleware(request: NextRequest) {
//   return i18nRouter(request, i18nConfig);
// }
export default chain([languageMiddleware]);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
