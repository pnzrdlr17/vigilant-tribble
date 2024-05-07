import { getSession } from 'next-auth/react';
import AuthForm from '../components/Auth/AuthContainer';
import { Loading } from '../components/Loading';
import { useLoading } from '../store/loading-context';

function AuthPage() {
  const { loading } = useLoading();

  return loading ? <Loading /> : <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AuthPage;
