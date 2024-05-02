import { useLoading } from '@/store/loading-context';
import { Button, Flex, Layout, theme, Typography } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LeftNav } from './LeftNav';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

const DefaultUnprotectedLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { data: session } = useSession();
  const { loading, setLoading } = useLoading();

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          padding: '8px 16px',
        }}
      >
        <Flex justify="space-between" align="center">
          <Title
            style={{
              fontWeight: 600,
              margin: 0,
              fontFamily: 'monospace',
              textDecoration: 'none',
              fontVariant: 'small-caps',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={async () => {
              setLoading(true);
              await router.push('/');
              setLoading(false);
            }}
          >
            Vigilant Tribble
          </Title>
          {session ? (
            <Button
              type="link"
              style={{
                textDecoration: 'none',
                fontVariant: 'small-caps',
                color: 'white',
                fontSize: '1.15rem',
              }}
              onClick={async () => {
                setLoading(true);
                await signOut();
                setLoading(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              type="link"
              style={{
                textDecoration: 'none',
                fontVariant: 'small-caps',
                color: 'white',
                fontSize: '1.15rem',
              }}
              onClick={async () => {
                setLoading(true);
                await router.push({
                  pathname: '/auth',
                  query: { from: router.pathname },
                });
                setLoading(false);
              }}
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Header>
      <Layout>
        <Sider collapsible defaultCollapsed>
          <LeftNav />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '16px 12px 0 12px',
              padding: '24px 24px 0 24px',
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'clip',
            }}
          >
            {children}
          </Content>
          <Footer
            style={{ height: '50px', padding: '8px 50px', lineHeight: '32px' }}
          >
            <Text type="secondary" style={{ textAlign: 'center' }}>
              © 2024 Vigilant Tribble. All rights reserved.
            </Text>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export { DefaultUnprotectedLayout };
