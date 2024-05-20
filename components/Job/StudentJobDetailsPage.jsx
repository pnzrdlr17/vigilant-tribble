import { Typography } from '@mui/material';
import { Button, Divider, Flex } from 'antd';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import withLayout from '../../hoc/withLayout';
import { useLoading } from '../../store/loading-context';
import { applyJob, getJobTypeDisplayText, toggleSaveJob } from '../../util/job';
import { notificationToUser } from '../../util/notifications';
import { StudentLayout } from '../Layout/StudentLayout';
import { Loading } from '../Loading';

const StudentJobDetails = (props) => {
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const { job, userInfo, userApplications, session } = props;

  const {
    savedJobs,
    email: studentEmail,
    name: studentName,
    _id: studentId,
  } = userInfo;

  const {
    title,
    company,
    location,
    description,
    requirements,
    jobType,
    status,
    jobOwner,
  } = job;

  const handleApply = async () => {
    try {
      setLoading(true);
      await applyJob({
        jobId: job._id,
        studentId,
        studentName,
        studentEmail,
      });

      // send notification to company
      await notificationToUser(
        {
          type: 'new-application',
          title: `New Application: ${title}`,
          text: `${studentName} has applied for the job ${title}`,
          link: `/job/${job._id}`,
          isSystemGenerated: true,
          session,
        },
        jobOwner
      );

      // send notification to student
      await notificationToUser(
        {
          type: 'new-application',
          title: `New Application: ${title}`,
          text: `You have applied for the job ${title}`,
          link: `/job/${job._id}`,
          isSystemGenerated: true,
          session,
        },
        session.user.email
      );
      enqueueSnackbar('Applied for job successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to apply for job', { variant: 'error' });
      console.error('Error applying for job!', error);
    } finally {
      await router.replace(router.asPath);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex vertical>
      <Flex justify="space-between" style={{ padding: '0 16px' }}>
        <Flex gap={36}>
          <img
            src={`https://ui-avatars.com/api/?name=${company}&background=random&color=fff&rounded=true`}
            width={80}
            alt={company[0]?.toUpperCase() || ''}
          />
          <Flex vertical gap={10}>
            <Typography
              variant="button"
              display="block"
              style={{
                fontSize: '18px',
                lineHeight: '38px',
              }}
            >
              {title}, <b>{company}</b>
            </Typography>
            <Typography
              variant="caption"
              display="block"
              style={{
                fontSize: '16px',
                lineHeight: '30px',
              }}
            >
              Location: {location}
            </Typography>
            <Typography
              variant="overline"
              color="GrayText"
              display="block"
              gutterBottom
              securitytyle={{
                fontSize: '14px',
                lineHeight: '24px',
              }}
            >
              Job Type: {getJobTypeDisplayText(jobType)}
            </Typography>
          </Flex>
        </Flex>
        <Flex vertical gap={12} justify="flex-end" style={{ width: '180px' }}>
          <Button
            style={{
              color: savedJobs?.includes(job._id) ? 'gray' : 'blue',
              backgroundColor: 'white',
              borderColor: savedJobs?.includes(job._id) ? 'gray' : 'blue',
            }}
            onClick={async () => {
              setLoading(true);
              await toggleSaveJob({
                jobId: job._id,
                studentId,
              });
              await router.replace(router.asPath);
              setLoading(false);
            }}
          >
            {savedJobs?.includes(job._id) ? 'Remove from Saved' : 'Save'}
          </Button>

          {status === 'active' ? (
            userApplications?.some((app) => app.jobId == job._id) ? (
              <Button
                type="primary"
                style={{
                  color: 'green',
                  backgroundColor: 'white',
                  borderColor: 'green',
                }}
                onClick={() => {
                  router.push('/applications');
                }}
              >
                Applied
              </Button>
            ) : (
              <Button type="primary" onClick={handleApply}>
                Apply
              </Button>
            )
          ) : (
            <Button disabled>Closed</Button>
          )}
        </Flex>
      </Flex>

      <Divider />

      <Flex justify="space-evenly">
        <Flex vertical style={{ width: '40%' }}>
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </Flex>
        <Flex vertical style={{ width: '40%' }}>
          <Typography variant="h6" gutterBottom>
            Requirements:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {requirements}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withLayout(StudentJobDetails, StudentLayout);
