import { StudentDashboard } from '@/components/Dashboard/StudentDashboard';
import { DefaultUnprotectedLayout } from '@/components/Layout/Layout';
import { Loading } from '@/components/Loading';
import withLayout from '@/hoc/withLayout';
import { useLoading } from '@/store/loading-context';
import { getSession } from 'next-auth/react';

const Dashboard = (props) => {
  const { loading } = useLoading();
  const { session } = props;

  if (loading) {
    return <Loading />;
  }

  if (session?.user?.role === 'student') {
    return <StudentDashboard />;
  }

  if (session?.user?.role === 'recruiter') {
    // return <RecruiterDashboard />;
    return <StudentDashboard />;
  }

  if (session?.user?.role === 'admin') {
    // return <AdminDashboard />;
    return <StudentDashboard />;
  }

  return <Error statusCode={404} />;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default withLayout(Dashboard, DefaultUnprotectedLayout);
