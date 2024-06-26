import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from 'lib/utils';
import { ReactNode } from 'react';
import './globals.css';
import Footer from 'components/layout/footer';
import WrapperContainer from 'components/layout/wrapper-container';
import Provider from '../store/store-provider';
import Banner from 'components/layout/navbar/banner';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN} />{' '}
      <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN} />
      <body className=" text-black selection:bg-teal-300 ">
        <Provider>
          <Banner />
          <WrapperContainer>
            <Navbar />
          </WrapperContainer>
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
