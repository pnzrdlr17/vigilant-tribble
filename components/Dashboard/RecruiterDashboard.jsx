import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import withLayout from '../../hoc/withLayout';
import { RecruiterJobPage } from '../Job/RecruiterJobPage';
import { RecruiterLayout } from '../Layout/RecruiterLayout';

const RecruiterDashboard = (props) => {
  const { data: session } = useSession();
  const { jobs, applications, userInfo } = props;

  const myJobs = useMemo(
    () =>
      jobs.filter((job) => {
        return job.jobOwner === session?.user?.email;
      }),
    [jobs]
  );

  const filteredApplications = useMemo(
    () =>
      applications.filter((app) => {
        return myJobs.some((job) => job._id === app.jobId);
      }),
    [applications, myJobs]
  );

  console.log('myJobs', myJobs);

  return (
    <Flex vertical>
      <Flex justify="space-between" align="flex-start">
        <Typography
          variant="overline"
          color="textSecondary"
          style={{ fontSize: '30px', height: '36px' }}
        >
          Jobs
        </Typography>
        {session?.user?.name && (
          <Typography
            variant="overline"
            color="textSecondary"
            textAlign="right"
            style={{ fontSize: '18px' }}
          >
            Welcome Back, {session?.user?.name}
          </Typography>
        )}
      </Flex>
      <Divider style={{ marginTop: '10px' }} />
      <RecruiterJobPage
        jobs={myJobs}
        applications={filteredApplications}
        userInfo={userInfo}
        session={session}
      />
    </Flex>
  );
};

export default withLayout(RecruiterDashboard, RecruiterLayout);
