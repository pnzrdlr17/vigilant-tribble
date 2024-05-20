import { Button, Flex, Layout, Typography } from 'antd';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter
      style={{ height: '50px', padding: '8px 50px', lineHeight: '32px' }}
    >
      <Flex justify="space-between">
        <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
          © 2024 Vigilant Tribble. All rights reserved.
        </Typography.Text>
        <Button
          type="link"
          onClick={() => {
            router.push('/feedback');
          }}
          style={{ color: 'gray' }}
        >
          <u>Leave us a feedback</u>
        </Button>
      </Flex>
    </AntdFooter>
  );
};

export { Footer };
