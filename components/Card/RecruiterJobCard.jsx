import { Typography } from '@mui/material';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/router';
import { getJobTypeDisplayText } from '../../util/job';

const RecruiterJobCard = (props) => {
  const router = useRouter();
  const { job } = props;
  const { title, company, _id: jobId, jobType, status } = job;

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
            router.push(`/job/${jobId}`);
          }}
        >
          View
        </Button>

        {status === 'active' ? (
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
              router.push(`/job/${jobId}`);
            }}
          >
            Active
          </Button>
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

export { RecruiterJobCard };
