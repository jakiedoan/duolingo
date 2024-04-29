import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { i18nConfig } from '@/app/i18n/config';
import { CustomMiddleware } from './chain';

const languages = i18nConfig.locales;

acceptLanguage.languages(languages);

function getLng(req: NextRequest): string | undefined {
  let lng;

  if (!req) return;

  if (req.cookies.has('i18next')) {
    lng = acceptLanguage.get(req.cookies.get('i18next')?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = i18nConfig.defaultLocale;
  }

  return lng;
}

// export function middleware(req: NextRequest) {}

export function languageMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // const { pathname } = request.nextUrl;
    // const lng = getLng(request);

    // const pathnameHasLocale = languages.some(
    //   (locale) =>
    //     pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    // );

    // if (!pathnameHasLocale) {
    //   return NextResponse.redirect(new URL(`${lng}${pathname}`, request.url));
    // }

    // if (request.headers.has('referer')) {
    //   const refererUrl = new URL(request.headers.get('referer')!);
    //   const lngInReferer = languages.find((locale) =>
    //     refererUrl.pathname.startsWith(`/${locale}`)
    //   );
    //   const response = NextResponse.next();
    //   if (lngInReferer) response.cookies.set('i18next', lngInReferer);
    //   return response;
    // }

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
