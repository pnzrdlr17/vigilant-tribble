import { Typography } from '@mui/material';
import { Button, Divider, Flex, Form, Input } from 'antd';
import { useSnackbar } from 'notistack';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import { Loading } from '../components/Loading';
import withLayout from '../hoc/withLayout';
import { useLoading } from '../store/loading-context';
import { logFeedback } from '../util/contactus';

const Feedback = () => {
  const [form] = Form.useForm();
  const { loading, setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await logFeedback(values.message);
      enqueueSnackbar(`Feedback sent!`, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Feedback send failed!`, {
        variant: 'error',
      });
      console.error('Error sending feedback!', error);
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
          Leave us a Feedback
        </Typography>
      </div>

      <Divider />

      <Form onFinish={handleSubmit} form={form} layout="vertical">
        <Flex vertical style={{ width: '600px' }}>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '14px' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default withLayout(Feedback, DefaultUnprotectedLayout);
