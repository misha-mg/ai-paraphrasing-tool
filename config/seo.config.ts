import { Metadata } from 'next';

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const APP_NAME = 'AI Paraphrasing Tool';

export const APP_DESCRIPTION =
  'Free AI-powered paraphrasing tool. Rewrite and rephrase your text instantly with advanced AI technology. Fast, accurate, and easy to use.';

export const APP_KEYWORDS = [
  'paraphrase',
  'paraphrasing tool',
  'AI paraphrase',
  'rewrite text',
  'rephrase',
  'text rewriter',
  'AI writing',
  'content rewriter',
  'free paraphrasing',
  'online paraphraser',
];

export const defaultMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@yourusername',
  },
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
  icons: {
    icon: '/tool-icon.ico',
    shortcut: '/tool-icon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: BASE_URL,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '100',
  },
};
