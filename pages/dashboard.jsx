import { getSession } from 'next-auth/react';
import RecruiterDashboard from '../components/Dashboard/RecruiterDashboard';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import { Loading } from '../components/Loading';
import { useLoading } from '../store/loading-context';

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
    return <RecruiterDashboard />;
  }

  if (session?.user?.role === 'admin') {
    return <RecruiterDashboard />;
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

export default Dashboard;
