import { Typography } from '@mui/material';
import { Flex } from 'antd';
import { useSession } from 'next-auth/react';
import withLayout from '../../hoc/withLayout';
import { RecruiterLayout } from '../Layout/RecruiterLayout';

const RecruiterDashboard = () => {
  const { data: session } = useSession();
  return (
    <Flex vertical align="center" gap={16}>
      <Typography
        variant="overline"
        color="textSecondary"
        gutterBottom
        style={{ height: '48px', fontSize: '30px' }}
      >
        Welcome Back, {session?.user?.name}
      </Typography>

      <Typography variant="h1">Recruiter Dashboard</Typography>

      {/* <NewJobSection /> */}
      {/* <InProgressApplication /> */}

      {/* in profile
      <Applied />
      <Saved /> */}
    </Flex>
  );
};

export default withLayout(RecruiterDashboard, RecruiterLayout);
