import { Button, Flex, Form, Input, Radio } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useLoading } from '../../store/loading-context';
import { createUser } from '../../util/auth';
import styles from './index.module.css';

const SignupForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const [signUpMode, setSignUpMode] = useState(
    router?.query?.from === '/recruiters' ? 'recruiter' : 'student'
  );

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const { name, signUpMode: role, organization, email, password } = values;

      const newUser = await createUser({
        name,
        role,
        organization,
        email,
        password,
      });

      enqueueSnackbar('User Registered Successfully', {
        variant: 'success',
      });

      console.log('User created', newUser);

      // signing in
      const userLoggedIn = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });
      enqueueSnackbar(`You are Logged In`, { variant: 'success' });

      if (!userLoggedIn.error) {
        enqueueSnackbar(`Login Failed`, { variant: 'error' });
        await router.replace('/dashboard');
      }
    } catch (error) {
      enqueueSnackbar(`Sign Up Failed`, { variant: 'error' });
      console.error('Error signing up!:', error);
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  const radioButtonStyle = (type) => {
    const bgColor = signUpMode === type ? '#9C6FE4' : '#ffffff';
    const fontColor = signUpMode === type ? '#ffffff' : '#9C6FE4';

    return {
      backgroundColor: bgColor,
      color: fontColor,
      borderColor: bgColor,
      outline: 'none',
    };
  };

  return (
    <Flex vertical gap={48}>
      <div className={styles.authFormTitle}>Sign Up</div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ signUpMode: signUpMode }}
      >
        <Flex vertical gap={12}>
          <Form.Item name="signUpMode">
            <Radio.Group value={signUpMode} size="large">
              <Radio.Button
                value="student"
                onClick={() => {
                  setSignUpMode('student');
                }}
                style={radioButtonStyle('student')}
              >
                Student
              </Radio.Button>
              <Radio.Button
                value="recruiter"
                onClick={() => {
                  setSignUpMode('recruiter');
                }}
                style={radioButtonStyle('recruiter')}
              >
                Recruiter
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please enter your name' },
              { type: 'text', message: 'Please enter a valid name' },
            ]}
          >
            <Input
              variant="borderless"
              placeholder="Name"
              className={styles.authFormInput}
            />
          </Form.Item>
          <div className={styles.fadeIn}>
            {signUpMode === 'recruiter' && (
              <Form.Item
                name="organization"
                rules={[
                  {
                    type: 'text',
                    message: 'Please enter a valid Organization',
                  },
                ]}
              >
                <Input
                  variant="borderless"
                  placeholder="Organization"
                  className={styles.authFormInput}
                />
              </Form.Item>
            )}
          </div>
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
            rules={[
              {
                required: true,
                message: 'Please enter your password! Min 6 characters',
                min: 6,
              },
            ]}
          >
            <Input.Password
              variant="borderless"
              placeholder="Password"
              className={styles.authFormInput}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              variant="borderless"
              placeholder="Confirm Password"
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
              Sign Up
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export { SignupForm };
