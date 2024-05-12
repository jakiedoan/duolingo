import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';
import acceptLanguage from 'accept-language';
import { locales } from '@/app/i18n/config';
import { CustomMiddleware } from './chain';

const languages = locales;

acceptLanguage.languages(languages);

export function languageMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    let lng;
    if (request.cookies.has('i18next'))
      lng = acceptLanguage.get(request.cookies.get('i18next')?.value);
    if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
    if (!lng) lng = 'en';

    // Redirect if lng in path is not supported
    if (
      !languages.some((loc) =>
        request.nextUrl.pathname.startsWith(`/${loc}`)
      ) &&
      !request.nextUrl.pathname.startsWith('/_next')
    ) {
      return NextResponse.redirect(
        new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
      );
    }

    if (request.headers.has('referer')) {
      const refererUrl = new URL(request.headers.get('referer')!);
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set('i18next', lngInReferer);
      return response;
    }

    return middleware(request, event, response);
  };
}
