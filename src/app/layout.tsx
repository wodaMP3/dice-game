import { Inter } from 'next/font/google';
import { CssBaseline, Container } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dice Game',
  description: 'Игра в Dice на Next.js с TypeScript и Material UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
