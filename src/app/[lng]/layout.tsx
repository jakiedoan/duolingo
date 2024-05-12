import type { Metadata, ResolvingMetadata } from 'next';
import { Nunito } from 'next/font/google';
import '../globals.css';
import { useServerTranslation } from '../i18n/server';
import { TanstackProvider } from '@/utils/provider/tanstack';
import { SessionProvider } from '@/utils/provider/session';
import { locales } from '../i18n/config';
import { ThemeProvider } from 'next-themes';
import { cookies } from 'next/headers';
import { UserProvider } from '@/utils/provider/user';
import { decrypt, encrypt, getSession } from '@/lib/auth';
import { User } from '@prisma/client';

const font = Nunito({ subsets: ['latin'] });

type MeataDataProps = {
  params: {
    lng: string;
  };
};

type RootProps = Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>;

export async function generateMetadata({
  params,
}: MeataDataProps): Promise<Metadata> {
  // read route params
  const lng = params.lng;

  const { t } = await useServerTranslation(lng);

  return {
    title: t('metadata'),
  };
}

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

async function RootLayout({ children, params }: RootProps) {
  const initialToken = cookies().get('sessionToken')?.value;

  const user = await getSession();

  return (
    <html lang={params.lng} suppressHydrationWarning>
      <body className={font.className}>
        <TanstackProvider>
          <SessionProvider initialToken={initialToken}>
            <UserProvider initialUser={user?.user}>
              <ThemeProvider enableSystem={true}>{children}</ThemeProvider>
            </UserProvider>
          </SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
