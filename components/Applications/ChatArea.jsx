import { SendOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Flex, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import TimeAgo from 'timeago-react';
import { sendApplicationChatMessage } from '../../util/applications';
import { notificationToUser } from '../../util/notifications';

const ChatArea = (props) => {
  const { application, session } = props;
  const [inputMessage, setInputMessage] = useState('');
  const [messageList, setMessageList] = useState(application.chat);
  const dummyDiv = useRef();

  useEffect(() => {
    dummyDiv.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [messageList]);

  const sendMessage = async () => {
    try {
      if (!inputMessage) {
        return;
      }

      setMessageList([
        ...messageList,
        {
          sender: 'Applicant',
          message: inputMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setInputMessage('');

      await sendApplicationChatMessage({
        applicationId: application._id,
        message: inputMessage,
        timestamp: new Date().toISOString(),
        session,
      });

      await notificationToUser(
        {
          type: 'new-message',
          title: `New Message: ${application.job.title}`,
          text: `${session.user.name} has sent you a message`,
          link: `/applications`,
          isSystemGenerated: false,
          session,
        },
        application.job.jobOwner
      );

      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message!', error);
    } finally {
      // await router.replace(router.asPath);
    }
  };

  return (
    <Flex
      vertical
      style={{
        padding: '16px',
        marginLeft: '12px',
        maxHeight: '520px',
        overflowY: 'scroll',
        border: '1px solid #f0f0f0',
      }}
      gap={8}
    >
      <Flex
        vertical
        style={{ padding: '20px', maxHeight: '220px', overflowY: 'scroll' }}
        onScroll={(event) => event.stopPropagation()}
      >
        {messageList.map((message, index) => {
          return message.sender === 'Applicant' ? (
            <Flex key={index} justify="flex-end">
              <div
                style={{
                  marginBottom: '8px',
                  textAlign: 'right',
                }}
              >
                {index > 0 &&
                  messageList[index - 1].sender !== message.sender && (
                    <Typography
                      variant="overline"
                      display="block"
                      color="textSecondary"
                      fontSize={10}
                      style={{
                        padding: '6px 0 6px 6px',
                      }}
                      textAlign="right"
                    >
                      You
                    </Typography>
                  )}
                <span
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '6px',
                    borderRadius: '8px',
                  }}
                >
                  {message.message}
                </span>
                <Typography
                  variant="subtitle2"
                  display="block"
                  color="textSecondary"
                  fontSize={10}
                  style={{
                    padding: '6px 6px 6px 6px',
                  }}
                >
                  <TimeAgo datetime={message.timestamp} />
                </Typography>
              </div>
            </Flex>
          ) : (
            <Flex key={index} justify="flex-start">
              <div
                style={{
                  padding: '4px 8px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
              >
                <Typography
                  variant="overline"
                  display="block"
                  color="textSecondary"
                  fontSize={10}
                  style={{
                    padding: '0 0 6px 6px',
                  }}
                >
                  {message.sender}
                </Typography>
                <span
                  style={{
                    backgroundColor: '#e6f7ff',
                    padding: '6px',
                    borderRadius: '8px',
                  }}
                >
                  {message.message}
                </span>
                <Typography
                  variant="subtitle2"
                  display="block"
                  color="textSecondary"
                  fontSize={10}
                  style={{
                    padding: '6px 6px 0 6px',
                  }}
                >
                  <TimeAgo datetime={message.timestamp} />
                </Typography>
              </div>
            </Flex>
          );
        })}
        <div ref={dummyDiv}></div>
      </Flex>
      <Input
        placeholder="Type a message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onPressEnter={sendMessage}
        suffix={<SendOutlined onClick={() => {}} />}
      />
    </Flex>
  );
};

export { ChatArea };
