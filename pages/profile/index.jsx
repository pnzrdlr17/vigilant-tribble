// redirect to current user
import { getSession } from 'next-auth/react';
import { Loading } from '../../components/Loading';
import { useLoading } from '../../store/loading-context';
import { getUserData } from '../../util/user';

const Profile = () => {
  const { loading } = useLoading();

  if (loading) {
    return <Loading />;
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

  const userInfo = await getUserData(session.user.email);

  return {
    redirect: {
      destination: `/profile/${userInfo._id}`,
      permanent: false,
    },
  };
}

export default Profile;
