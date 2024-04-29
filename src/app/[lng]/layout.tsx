import type { Metadata, ResolvingMetadata } from 'next';
import { Nunito } from 'next/font/google';
import '../globals.css';
import { useServerTranslation } from '../i18n/server';
import { TanstackProvider } from '@/utils/provider/tanstack';
import { SessionProvider } from '@/utils/provider/session';
import { locales } from '../i18n/config';
import { ThemeProvider } from 'next-themes';

const font = Nunito({ subsets: ['latin'] });

type MeataDataProps = {
  params: {
    lng: string;
  };
};

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

type RootProps = Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>;

function RootLayout({ children, params }: RootProps) {
  return (
    <html lang={params.lng} suppressHydrationWarning>
      <body className={font.className}>
        <TanstackProvider>
          <SessionProvider>
            <ThemeProvider enableSystem={true}>{children}</ThemeProvider>
          </SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
