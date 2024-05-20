import { getSession } from 'next-auth/react';
import { Loading } from '../../components/Loading';
import RecruiterViewProfilePage from '../../components/Profile/RecruiterView';
import StudentViewProfilePage from '../../components/Profile/StudentView';
import { useLoading } from '../../store/loading-context';
import { getUserDataById } from '../../util/user';

const Profile = (props) => {
  const { session, userInfo } = props;
  const { loading } = useLoading();

  if (loading) {
    return <Loading />;
  }

  if (session.user.role === 'student') {
    return <StudentViewProfilePage userInfo={userInfo} session={session} />;
  }

  if (session.user.role === 'recruiter') {
    return <RecruiterViewProfilePage userInfo={userInfo} session={session} />;
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

  const userInfo = await getUserDataById(context.query.userId);

  return {
    props: {
      session,
      userInfo,
    },
  };
}

export default Profile;
