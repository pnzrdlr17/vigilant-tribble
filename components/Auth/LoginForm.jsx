import { Button, Flex, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useLoading } from '../../store/loading-context';
import styles from './index.module.css';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { setLoading } = useLoading();
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      //   enqueueSnackbar(`You are Logged In`, { variant: 'success' });
      if (!result.error) {
        await router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in!', error);
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  return (
    <Flex vertical gap={48}>
      <div className={styles.authFormTitle}>Login</div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Flex vertical gap={12}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              variant="borderless"
              placeholder="Email ID"
              className={styles.authFormInput}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              variant="borderless"
              placeholder="Password"
              className={styles.authFormInput}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                width: '100%',
                backgroundColor: '#9C6FE4',
                borderColor: '#9C6FE4',
                color: '#ffffff',
                fontSize: '16px',
                height: '42px',
                borderRadius: '12px',
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export { LoginForm };
