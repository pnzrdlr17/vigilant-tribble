import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { App as Layout } from '../components/Layout/Layout';
import { LoadingProvider } from '@/store/loading-context';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <LoadingProvider>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Vigilant Tribble</title>
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </LoadingProvider>
  );
}
