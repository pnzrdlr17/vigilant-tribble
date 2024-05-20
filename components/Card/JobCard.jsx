import { Typography } from '@mui/material';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useLoading } from '../../store/loading-context';
import { applyJob, getJobTypeDisplayText } from '../../util/job';
import { notificationToUser } from '../../util/notifications';

const JobCard = (props) => {
  const router = useRouter();
  const { job, jobStatus: jobApplicationStatus, userInfo, session } = props;
  const { title, company, _id: jobId, jobType, status, jobOwner } = job;
  const { name: studentName, email: studentEmail } = userInfo;
  const { setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const handleApply = async () => {
    try {
      setLoading(true);
      await applyJob({
        jobId,
        studentId: userInfo._id,
        studentName,
        studentEmail,
      });

      // send notification to company
      await notificationToUser(
        {
          type: 'new-application',
          title: `New Application: ${title}`,
          text: `${studentName} has applied for the job ${title}`,
          link: `/job/${jobId}`,
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
          link: `/job/${jobId}`,
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

  return (
    <Flex
      style={{
        width: '420px',
        height: '180px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '24px',
        borderRadius: '6px',
        margin: '6px',
      }}
      vertical
      justify="space-between"
    >
      <Flex align="center" gap={20}>
        <img
          src={`https://ui-avatars.com/api/?name=${company}&background=random&color=fff&rounded=true`}
          width={60}
          alt={company[0]?.toUpperCase() || ''}
        />
        <Flex vertical justify="space-evenly" style={{ maxHeight: '100px' }}>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            style={{
              lineHeight: '20.8px',
            }}
            fontWeight="bold"
          >
            {company}
          </Typography>
          <Typography
            variant="overline"
            style={{
              lineHeight: '20.8px',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            color="GrayText"
            display="block"
            gutterBottom
          >
            {getJobTypeDisplayText(jobType)}
          </Typography>
        </Flex>
      </Flex>
      <Flex justify="center" gap={10}>
        <Button
          style={{
            fontSize: '12px',
            lineHeight: '15.6px',
            width: '40%',
          }}
          onClick={() => {
            router.push(`/job/${_id}`);
          }}
        >
          View
        </Button>

        {status === 'active' ? (
          jobApplicationStatus === 'Applied' ? (
            <Button
              type="primary"
              style={{
                fontSize: '12px',
                lineHeight: '15.6px',
                width: '40%',
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
            <Button
              type="primary"
              style={{
                fontSize: '12px',
                lineHeight: '15.6px',
                width: '40%',
              }}
              onClick={handleApply}
            >
              Apply
            </Button>
          )
        ) : (
          <Button
            style={{
              fontSize: '12px',
              lineHeight: '15.6px',
              width: '40%',
            }}
            disabled
          >
            Closed
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export { JobCard };
