import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';
import { getSession } from 'next-auth/react';
import { NewJobForm } from '../../components/Job/NewJobForm';
import { RecruiterLayout } from '../../components/Layout/RecruiterLayout';
import { Loading } from '../../components/Loading';
import withLayout from '../../hoc/withLayout';
import { useLoading } from '../../store/loading-context';

const NewJob = (props) => {
  const { loading } = useLoading();

  return loading ? (
    <Loading />
  ) : (
    <Flex vertical>
      <Typography
        variant="overline"
        color="textSecondary"
        gutterBottom
        style={{ fontSize: '28px', height: '36px' }}
      >
        List a new job
      </Typography>
      <Divider />

      <NewJobForm session={props.session} />
    </Flex>
  );
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

export default withLayout(NewJob, RecruiterLayout);
