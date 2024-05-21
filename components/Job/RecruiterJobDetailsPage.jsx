import { Typography } from '@mui/material';
import { Button, Divider, Flex } from 'antd';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import withLayout from '../../hoc/withLayout';
import { useLoading } from '../../store/loading-context';
import { getJobTypeDisplayText } from '../../util/job';
import { RecruiterLayout } from '../Layout/RecruiterLayout';
import { Loading } from '../Loading';

const RecruiterJobDetails = (props) => {
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const { job, userApplications, session } = props;

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
              color: 'gray',
              backgroundColor: 'white',
              borderColor: 'gray',
            }}
            onClick={() => {}}
          >
            Edit
          </Button>
          <Button danger onClick={() => {}}>
            Delete
          </Button>
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

      <Divider />

      <Flex
        vertical
        style={{
          width: '80%',
        }}
        justify="center"
        align="center"
      >
        {/* Applications */}
      </Flex>
    </Flex>
  );
};

export default withLayout(RecruiterJobDetails, RecruiterLayout);
