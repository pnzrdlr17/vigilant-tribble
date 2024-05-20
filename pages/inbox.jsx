import { getSession } from 'next-auth/react';
import RecruiterInbox from '../components/Inbox.jsx/RecruiterInbox';
import StudentInbox from '../components/Inbox.jsx/StudentInbox';
import { getUserData } from '../util/user';

const Inbox = (props) => {
  const { session, userInfo } = props;
  const inbox =
    userInfo?.inbox?.sort((a, b) =>
      new Date(b.timestamp)
        .toISOString()
        .localeCompare(new Date(a.timestamp).toISOString())
    ) || [];

  if (session?.user?.role === 'student') {
    return <StudentInbox inbox={inbox} session={session} />;
  }

  if (session?.user?.role === 'recruiter') {
    return <RecruiterInbox inbox={inbox} session={session} />;
  }

  if (session?.user?.role === 'admin') {
    return <RecruiterInbox inbox={inbox} session={session} />;
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
    props: {
      session,
      userInfo,
    },
  };
}

export default Inbox;
