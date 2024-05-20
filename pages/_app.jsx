import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import SnackbarProviderWrapper from '../components/snackbar';
import { LoadingProvider } from '../store/loading-context';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#002140',
        },
      }}
    >
      <LoadingProvider>
        <SessionProvider session={pageProps.session}>
          <SnackbarProviderWrapper>
            <Head>
              <title>Vigilant Tribble</title>
              <link rel="shortcut icon" href="/images/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </SnackbarProviderWrapper>
        </SessionProvider>
      </LoadingProvider>
    </ConfigProvider>
  );
}
