import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import withLayout from '../../hoc/withLayout';
import { StudentJobPage } from '../Job/StudentJobPage';
import { StudentLayout } from '../Layout/StudentLayout';

const StudentDashboard = (props) => {
  const { data: session } = useSession();
  const { jobs, applications, userInfo } = props;
  const userApplications = useMemo(
    () =>
      applications.filter((app) => {
        return app.studentEmail === session?.user?.email;
      }),
    [applications]
  );

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
      <StudentJobPage
        jobs={jobs}
        userInfo={userInfo}
        userApplications={userApplications}
        session={session}
      />
    </Flex>
  );
};

export default withLayout(StudentDashboard, StudentLayout);
