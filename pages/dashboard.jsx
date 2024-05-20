import { getSession } from 'next-auth/react';
import Error from 'next/error';
import RecruiterDashboard from '../components/Dashboard/RecruiterDashboard';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import { Loading } from '../components/Loading';
import { useLoading } from '../store/loading-context';
import { getAllApplications } from '../util/applications';
import { getAllJobs } from '../util/job';
import { getUserData } from '../util/user';

const Dashboard = (props) => {
  const { loading } = useLoading();
  const { session, jobs, userInfo, applications } = props;

  if (loading) {
    return <Loading />;
  }

  if (session?.user?.role === 'student') {
    return (
      <StudentDashboard
        jobs={jobs}
        applications={applications}
        userInfo={userInfo}
      />
    );
  }

  if (session?.user?.role === 'recruiter') {
    return <RecruiterDashboard jobs={jobs} />;
  }

  if (session?.user?.role === 'admin') {
    return <RecruiterDashboard jobs={jobs} />;
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

  const jobs = await getAllJobs();
  const userInfo = await getUserData(session.user.email);
  const applications = await getAllApplications();

  return {
    props: {
      session,
      jobs,
      userInfo,
      applications,
    },
  };
}

export default Dashboard;
