import {
  BookOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  NotificationOutlined,
  TeamOutlined,
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
            key: '/announcements',
            icon: <NotificationOutlined />,
            label: 'Announcements',
            onClick: () => {
              router.push('/announcements');
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
