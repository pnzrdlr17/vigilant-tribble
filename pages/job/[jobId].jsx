import { getSession } from 'next-auth/react';
import Error from 'next/error';
import { useMemo } from 'react';
import StudentJobDetails from '../../components/Job/StudentJobDetailsPage';
import { Loading } from '../../components/Loading';
import { useLoading } from '../../store/loading-context';
import { getAllApplications } from '../../util/applications';
import { getJobById } from '../../util/job';
import { getUserData } from '../../util/user';

const JobDetailsPage = (props) => {
  const { session, job, userInfo, applications } = props;
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

    return (
      <StudentJobDetails
        job={job}
        userInfo={userInfo}
        userApplications={userApplications}
        session={session}
      />
    );
  }

  if (session?.user?.role === 'recruiter') {
    return <RecruiterJobDetails jobs={job} />;
  }

  if (session?.user?.role === 'admin') {
    return <RecruiterJobDetails jobs={job} />;
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

  const job = await getJobById(context.query.jobId);
  const userInfo = await getUserData(session.user.email);
  const applications = await getAllApplications();

  return {
    props: {
      session,
      userInfo,
      job,
      applications,
    },
  };
}

export default JobDetailsPage;
