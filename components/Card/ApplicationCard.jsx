import { MessageOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from 'antd';
import TimeAgo from 'timeago-react';
import { getJobTypeDisplayText } from '../../util/job';

const ApplicationCard = (props) => {
  const { application } = props;
  const { job, timestamp } = application;
  const { company, title, jobType, status, location } = job;

  return (
    <Flex
      style={{
        width: '100%',
        height: '120px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '24px',
        borderRadius: '6px',
        margin: '6px',
        backgroundColor: job.status === 'active' ? 'beige' : 'lightgray',
      }}
      vertical
      justify="space-between"
    >
      <Flex align="flex-end" justify="space-between">
        <Flex gap={30}>
          <img
            src={`https://ui-avatars.com/api/?name=${company}&background=random&color=fff&rounded=true`}
            width={60}
            alt={company[0]?.toUpperCase() || ''}
          />
          <Flex vertical justify="space-evenly" style={{ maxHeight: '100px' }}>
            <Typography
              variant="button"
              style={{
                fontSize: '16px',
                lineHeight: '20.8px',
              }}
            >
              Job Title: <b>{title}</b>
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              style={{
                fontSize: '15px',
                lineHeight: '20.8px',
              }}
            >
              Organization: <b>{company}</b>, {location}
            </Typography>
            <Typography
              variant="caption"
              color="GrayText"
              display="block"
              gutterBottom
              style={{
                fontSize: '14px',
                lineHeight: '20.8px',
              }}
            >
              Role Type: {getJobTypeDisplayText(jobType)}
            </Typography>
          </Flex>
        </Flex>
        <Flex
          vertical
          justify="space-evenly"
          style={{ maxHeight: '100px', textAlign: 'right' }}
        >
          <span style={{ textAlign: 'right' }}>
            <MessageOutlined />
          </span>
          <Typography
            variant="text"
            style={{
              fontSize: '16px',
              lineHeight: '20.8px',
            }}
          >
            Status: {status === 'closed' ? 'Closed' : application.status}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            color="GrayText"
            style={{
              fontSize: '15px',
              lineHeight: '20.8px',
            }}
          >
            Applied: <TimeAgo datetime={timestamp} />
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { ApplicationCard };
