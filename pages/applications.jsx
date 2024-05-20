import { getSession } from 'next-auth/react';
import Error from 'next/error';
import { useMemo } from 'react';
import { ApplicationsPage } from '../components/Applications/ApplicationsPage';
import { StudentLayout } from '../components/Layout/StudentLayout';
import { Loading } from '../components/Loading';
import withLayout from '../hoc/withLayout';
import { useLoading } from '../store/loading-context';
import { getAllApplications } from '../util/applications';
import { getAllJobs } from '../util/job';

const Applications = (props) => {
  const { session, applications, jobs } = props;
  const { loading } = useLoading();

  if (loading) {
    return <Loading />;
  }

  if (session?.user?.role === 'student') {
    const userApplications = useMemo(
      () =>
        applications.filter((app) => {
          return app.studentEmail === session?.user?.email;
        }),
      [applications]
    );

    const applicationsWithJobDetails = userApplications.map((app) => {
      const job = jobs.find((job) => job._id === app.jobId);
      return { ...app, job };
    });

    return (
      <ApplicationsPage
        applicationsWithJobDetails={applicationsWithJobDetails}
        session={session}
      />
    );
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

  if (session.user.role !== 'student') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  const applications = await getAllApplications();
  const jobs = await getAllJobs();

  return {
    props: {
      session,
      applications,
      jobs,
    },
  };
}

export default withLayout(Applications, StudentLayout);
