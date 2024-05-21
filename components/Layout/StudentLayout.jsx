import { Button, Flex, Layout, theme, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useLoading } from '../../store/loading-context';
import { Footer } from './Footer';

const { Header, Content } = Layout;
const { Title } = Typography;

const navButtonsStyle = {
  textDecoration: 'none',
  fontVariant: 'small-caps',
  color: '#ffffff',
  fontSize: '1rem',
};

const StudentLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const currentPath = router.pathname;
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
            {currentPath !== '/dashboard' && (
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
            {currentPath !== '/applications' && (
              <Button
                type="link"
                style={navButtonsStyle}
                onClick={async () => {
                  setLoading(true);
                  await router.push('/applications');
                  setLoading(false);
                }}
              >
                Applications
                {/* job progress, drafts, interview schedules */}
              </Button>
            )}
            {currentPath !== '/inbox' && (
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
            )}
            {session && (
              <Button
                type="link"
                style={navButtonsStyle}
                onClick={async () => {
                  router.push('/profile');
                }}
              >
                Profile
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

          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export { StudentLayout };
