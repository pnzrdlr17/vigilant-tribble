import { Typography } from '@mui/material';
import { Button, Flex, Form, Input } from 'antd';
import { useSnackbar } from 'notistack';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import { Loading } from '../components/Loading';
import withLayout from '../hoc/withLayout';
import { useLoading } from '../store/loading-context';
import { logMessage } from '../util/contactus';

const ContactUs = () => {
  const [form] = Form.useForm();
  const { loading, setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { name, email, mobile, message } = values;
      await logMessage({
        name,
        email,
        mobile,
        message,
      });
      enqueueSnackbar(`Message sent!`, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Message send failed!`, {
        variant: 'error',
      });
      console.error('Error sending message!', error);
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Flex vertical align="center">
      <div>
        <Typography
          variant="overline"
          color="textSecondary"
          gutterBottom
          // align="center"
          style={{ fontSize: '32px', height: '40px' }}
        >
          Contact Us
        </Typography>
      </div>

      <Form onFinish={handleSubmit} form={form} layout="vertical">
        <Flex
          gap={32}
          style={{
            padding: '24px',
            border: '1px solid #002140',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            marginTop: '24px',
          }}
        >
          <Flex vertical style={{ width: '250px' }}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Please enter a valid mobile number',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '14px', width: '100%' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Flex>
          <div style={{ width: '400px' }}>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <Input.TextArea rows={12} />
            </Form.Item>
          </div>
        </Flex>
      </Form>
    </Flex>
  );
};

export default withLayout(ContactUs, DefaultUnprotectedLayout);
