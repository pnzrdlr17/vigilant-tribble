import { Layout, theme, Typography, Button, Flex } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LeftNav } from './LeftNav';
import { useLoading } from '@/store/loading-context';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

const App = ({ children }) => {
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
                await router.push('/auth');
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
              margin: '16px 12px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'clip',
            }}
          >
            {children}
          </Content>
          <Footer>
            <Text type="secondary" style={{ textAlign: 'center' }}>
              © 2024 Vigilant Tribble. All rights reserved.
            </Text>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export { App };
