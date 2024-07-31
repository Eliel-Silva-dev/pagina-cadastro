import type { Metadata } from 'next';

import { Lato } from 'next/font/google';

import './globals.css';
import { AppThemeProvider, DrawerProvider } from '@/shared/contexts';
import { MenuLateral } from '@/shared/components';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Cadastro | Hydrah Tec',
  description: '',
  keywords: '',
  icons: '',
  robots: 'index, follow',
  authors: [{ name: 'Eliel Silva', url: 'https://github.com/Eliel-Silva-dev' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={lato.className}>
        <AppThemeProvider>
          <DrawerProvider>
            <MenuLateral>{children}</MenuLateral>
          </DrawerProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
