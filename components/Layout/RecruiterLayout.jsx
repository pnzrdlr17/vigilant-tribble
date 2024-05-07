import { Button, Flex, Layout, theme, Typography } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useLoading } from '../../store/loading-context';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

const navButtonsStyle = {
  textDecoration: 'none',
  fontVariant: 'small-caps',
  color: '#ffffff',
  fontSize: '1rem',
};

const RecruiterLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { data: session } = useSession();
  const { setLoading } = useLoading();

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          padding: '8px 16px',
        }}
      >
        <Flex justify="space-between" align="baseline">
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
            Career Connect
          </Title>

          <Flex gap={8}>
            {router.pathname !== '/dashboard' && (
              <Button
                type="link"
                style={navButtonsStyle}
                onClick={async () => {
                  setLoading(true);
                  await router.push('/dashboard');
                  setLoading(false);
                }}
              >
                Dashboard
              </Button>
            )}
            <Button
              type="link"
              style={navButtonsStyle}
              onClick={async () => {
                setLoading(true);
                await router.push('/recruiter/new-job');
                setLoading(false);
              }}
            >
              New Job
            </Button>
            <Button
              type="link"
              style={navButtonsStyle}
              onClick={async () => {
                setLoading(true);
                await router.push('/inbox');
                setLoading(false);
              }}
            >
              Inbox
            </Button>
            {session && (
              <Button
                type="link"
                style={navButtonsStyle}
                onClick={async () => {
                  setLoading(true);
                  await signOut();
                  setLoading(false);
                }}
              >
                Logout
              </Button>
            )}
          </Flex>
        </Flex>
      </Header>
      <Layout>
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

export { RecruiterLayout };
