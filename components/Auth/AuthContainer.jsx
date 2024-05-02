import LoginPageIllustration from '@/public/images/LoginPageIllustration.svg';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export default function SignInSide() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <Flex
      justify="space-between"
      style={{
        backgroundColor: '#1C1D21',
      }}
    >
      <Flex
        vertical
        justify="space-between"
        style={{ padding: '16px 12px', flexGrow: 1 }}
      >
        <div style={{ padding: '6px' }}>
          <CloseOutlined
            style={{
              fontSize: '28px',
              color: '#ffffff',
              opacity: '0.4',
            }}
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <div style={{ alignSelf: 'center', minWidth: '360px' }}>
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
        <Flex
          gap={32}
          align="baseline"
          style={{ alignSelf: 'center', marginBottom: '24px', height: '48px' }}
        >
          <div style={{ color: '#ffffff', opacity: 0.5 }}>
            {isLogin ? `Don't have account?` : 'Already have an account?'}
          </div>
          <Button
            onClick={switchAuthModeHandler}
            style={{
              color: '#ffffff',
              backgroundColor: '#333437',
              borderColor: '#333437',
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Flex>
      </Flex>
      <Image src={LoginPageIllustration} alt="Login" />
    </Flex>
  );
}
