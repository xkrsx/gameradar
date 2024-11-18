// import './globals.scss';
import type { Metadata } from 'next';
import Footer from './common/Footer/Footer';
import Header from './common/Header/Header';

export const metadata: Metadata = {
  title: 'GameRadar',
  description:
    'GameRadar is a platform for sports enthusiasts to find and create events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-apple-touch.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div className="wrapper">
          <Header />
          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
