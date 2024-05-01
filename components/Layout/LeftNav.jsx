import {
  HomeOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  BookOutlined,
  NotificationOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

const LeftNav = () => {
  const router = useRouter();

  return (
    <div style={{ marginTop: '20px' }}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[router.pathname]}
        items={[
          {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Home',
            onClick: () => {
              router.push('/');
            },
          },
          {
            key: '/team',
            icon: <TeamOutlined />,
            label: 'TPC Team',
            onClick: () => {
              router.push('/team');
            },
          },
          {
            key: '/notifications',
            icon: <NotificationOutlined />,
            label: 'Notifications',
            onClick: () => {
              router.push('/notifications');
            },
          },
          {
            key: '/docs',
            icon: <BookOutlined />,
            label: 'Docs & Policies',
            onClick: () => {
              router.push('/docs');
            },
          },
          {
            key: 'contactus',
            icon: <MessageOutlined />,
            label: 'Contact Us',
            onClick: () => {
              router.push('/contactus');
            },
          },
          {
            key: '/faqs',
            icon: <InfoCircleOutlined />,
            label: 'FAQs',
            onClick: () => {
              router.push('/faqs');
            },
          },
        ]}
      />
    </div>
  );
};

export { LeftNav };
