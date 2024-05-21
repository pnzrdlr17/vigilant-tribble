import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';
import { useState } from 'react';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import withLayout from '../hoc/withLayout';

const Announcements = () => {
  const [notifications, setNotifications] = useState([]);

  return (
    <Flex vertical align="center" gap={16}>
      <Typography
        variant="overline"
        color="textSecondary"
        gutterBottom
        style={{ height: '48px', fontSize: '30px' }}
      >
        Announcements
      </Typography>
      <Divider style={{ margin: '10px 0' }} />
      {notifications.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom>
          No new Announcements!
        </Typography>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </Flex>
  );
};

export default withLayout(Announcements, DefaultUnprotectedLayout);
