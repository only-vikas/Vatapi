import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Vatapi — Smart Heritage & Civic Tourism Platform',
  description: 'Unified smart heritage, civic grievance ledger, and sustainable cultural tourism platform for Badami, Pattadakal, Aihole, and Bagalkote district.',
  openGraph: {
    title: 'Vatapi — Smart Heritage & Civic Tourism Platform',
    description: 'Unified smart heritage, civic grievance ledger, and sustainable cultural tourism platform for Badami, Pattadakal, Aihole, and Bagalkote district.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vatapi — Smart Heritage & Civic Tourism Platform',
    description: 'Unified smart heritage, civic grievance ledger, and sustainable cultural tourism platform for Badami, Pattadakal, Aihole, and Bagalkote district.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
