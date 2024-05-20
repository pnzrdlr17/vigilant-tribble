import { Typography } from '@mui/material';
import { Divider, Flex, List, Skeleton } from 'antd';

const InboxPage = (props) => {
  const { inbox } = props;

  const avatarPrompt = (type) => {
    switch (type) {
      case 'new-application':
        return 'Application';
      case 'new-job':
        return 'Job';
      case 'new-message':
        return 'Message';
      case 'application-update':
        return 'Application';
      default:
        return 'Notification';
    }
  };

  return (
    <Flex
      vertical
      style={{
        width: '80%',
        margin: '0 16px 16px 16px',
        padding: '0 16px 16px 16px',
      }}
    >
      <Typography variant="h4">Inbox</Typography>
      <Divider />
      <div>
        <List
          itemLayout="horizontal"
          dataSource={inbox}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a href={item.link}>Link</a>,
                <a key="list-read-unread">
                  {item.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                </a>,
                ,
                <a key="list-delete">Delete</a>,

                // implement mark as read/unread and delete functionality
              ]}
              style={{
                opacity: item.status === 'unread' ? 1 : 0.5,
                borderRadius: '8px',
                margin: '8px',
                padding: '8px',
              }}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <img
                      src={`https://ui-avatars.com/api/?name=${avatarPrompt(
                        item.type
                      )}&background=random&color=fff;&length=1&rounded=true`}
                      width={60}
                      alt={avatarPrompt(item.type)?.toUpperCase() || ''}
                    />
                  }
                  title={item.title}
                  description={item.text}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </Flex>
  );
};

export { InboxPage };
