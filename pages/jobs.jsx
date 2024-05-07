import { getSession } from 'next-auth/react';
import { StudentJobPage } from '../components/Job/StudentJobPage';
import { StudentLayout } from '../components/Layout/StudentLayout';
import { Loading } from '../components/Loading';
import withLayout from '../hoc/withLayout';
import { useLoading } from '../store/loading-context';
import { getAllJobs } from '../util/job';

const JobsPage = (props) => {
  const { loading } = useLoading();
  const { session, jobs } = props;

  if (loading) {
    return <Loading />;
  }

  if (session?.user?.role === 'student') {
    return <StudentJobPage jobs={jobs} />;
  }

  if (session?.user?.role === 'recruiter') {
    // return <RecruiterJobPage />;
    return <StudentJobPage jobs={jobs} />;
  }

  if (session?.user?.role === 'admin') {
    // return <AdminJobPage />;
    return <StudentJobPage jobs={jobs} />;
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

  return {
    props: {
      session,
      jobs,
    },
  };
}

export default withLayout(JobsPage, StudentLayout);
