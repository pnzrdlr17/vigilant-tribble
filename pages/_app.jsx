import { LoadingProvider } from '@/store/loading-context';
import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#002140',
          // colorPrimary: '#001529',
        },
      }}
    >
      <LoadingProvider>
        <SessionProvider session={pageProps.session}>
          <Head>
            <title>Vigilant Tribble</title>
            <link rel="shortcut icon" href="/images/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </SessionProvider>
      </LoadingProvider>
    </ConfigProvider>
  );
}
