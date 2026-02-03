import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SearchProvider } from '@/lib/search-provider';
import { Analytics } from '@/components/analytics';
import { WebVitals } from '@/components/web-vitals';
import { GoogleAnalytics } from '@/components/google-analytics';
import { GoogleAnalyticsScripts } from '@/components/google-analytics-scripts';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tulz.net'),
  title: {
    default: 'Tulz.net - Free Online Tools for Productivity & Development',
    template: '%s | Tulz.net',
  },
  description:
    'Access 50+ powerful, free online tools for productivity, development, and everyday tasks. Unit converter, JSON formatter, image compressor, color picker, and more. Clean, fast, and user-friendly tools with no registration required.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  keywords: [
    'online tools',
    'free tools',
    'web tools',
    'productivity tools',
    'developer tools',
    'utilities',
    'unit converter',
    'json formatter',
    'base64 encoder',
    'image compressor',
    'color picker',
    'word counter',
    'text tools',
    'image tools',
    'calculation tools',
    'conversion tools',
    'free utilities',
    'web utilities',
    'online utilities',
    'productivity',
  ],
  authors: [{ name: 'Tulz.net', url: 'https://tulz.net' }],
  creator: 'Tulz.net',
  publisher: 'Tulz.net',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tulz.net',
    siteName: 'Tulz.net',
    title: 'Tulz.net - Free Online Tools for Productivity & Development',
    description:
      'Access 50+ powerful, free online tools for productivity, development, and everyday tasks. Clean, fast, and user-friendly.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tulz.net - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tulz.net - Free Online Tools for Productivity & Development',
    description:
      'Access 50+ powerful, free online tools for productivity, development, and everyday tasks.',
    images: ['/twitter-image.jpg'],
    creator: '@tulznet',
    site: '@tulznet',
  },
  alternates: {
    canonical: 'https://tulz.net',
    languages: {
      'en-US': 'https://tulz.net',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  applicationName: 'Tulz.net',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tulz.net',
  },
  formatDetection: {
    telephone: false,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tulz.net',
              url: 'https://tulz.net',
              logo: 'https://tulz.net/logo.png',
              description:
                'Free online tools for productivity, development, and everyday tasks.',
              sameAs: [
                'https://twitter.com/tulznet',
                'https://github.com/tulznet',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'support@tulz.net',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://tulz.net',
              name: 'Tulz.net',
              description: 'Free online tools for productivity and development',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://tulz.net/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SearchProvider>
            {children}
            <Toaster />
          </SearchProvider>
          <Analytics />
          <WebVitals />
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
        </ThemeProvider>
        <GoogleAnalyticsScripts />
      </body>
    </html>
  );
}
