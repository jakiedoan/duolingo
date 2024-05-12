import acceptLanguage from 'accept-language';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';
import { locales } from '@/app/i18n/config';
import { cookies } from 'next/headers';

const protectedPaths = [
  '/learn',
  '/leaderboards',
  '/quests',
  '/shop',
  '/profile',
  '/courses',
];

const languages = locales;

acceptLanguage.languages(languages);

function getProtectedRoutes(protectedPaths: string[], locales: string[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return protectedPathsWithLocale;
}

export function authMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const token = cookies().get('sessionToken')?.value;

    // @ts-ignore
    request.nextauth = request.nextauth || {};
    // @ts-ignore
    request.nextauth.token = token;
    const pathname = request.nextUrl.pathname;

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...languages,
    ]);

    let lng;
    if (request.cookies.has('i18next'))
      lng = acceptLanguage.get(request.cookies.get('i18next')?.value);
    if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
    if (!lng) lng = 'en';

    // Redirect to learn page if token is available in cookies.
    if (token && !protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL(`/${lng}/learn`, request.nextUrl);
      return NextResponse.redirect(signInUrl);
    }

    // Redirect to home page if there's no token in cookies.
    if (!token && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL('/', request.nextUrl);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    return middleware(request, event, response);
  };
}
