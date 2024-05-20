import { Typography } from '@mui/material';
import { Collapse, Divider, Flex, Input, Segmented } from 'antd';
import { useState } from 'react';
import { useLoading } from '../../store/loading-context';
import { ChatArea } from '../Applications/ChatArea';
import { ApplicationCard } from '../Card/ApplicationCard';
import { Loading } from '../Loading';

const ApplicationsPage = (props) => {
  const { applicationsWithJobDetails, session } = props;
  const { loading } = useLoading();
  const [jobType, setJobType] = useState('All');
  const [jobStatus, setJobStatus] = useState('All');
  const [searchText, setSearchText] = useState('');

  const matchesJobStatus = (job) => {
    switch (jobStatus) {
      case 'Active':
        return job.status === 'active';
      case 'Closed':
        return job.status === 'closed';
      default:
        return true;
    }
  };

  const filteredApplications = applicationsWithJobDetails.filter(
    (application) => {
      const { job } = application;
      if (searchText) {
        const search = searchText.toLowerCase();
        if (
          !job.title.toLowerCase().includes(search) &&
          !job.company.toLowerCase().includes(search) &&
          !job.location.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      if (!matchesJobStatus(job)) {
        console.log('job status not matched', job);
        return false;
      }

      switch (jobType) {
        case 'Full Time':
          return job.jobType === 'full-time';
        case 'Internship':
          return job.jobType === 'internship';
        default:
          return true;
      }
    }
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex vertical gap={10}>
      <Typography
        variant="overline"
        color="textSecondary"
        display="block"
        style={{ fontSize: '30px', height: '36px' }}
      >
        Your Applications
      </Typography>
      <Divider />
      <Flex gap={48} justify="space-between" style={{ padding: '0 24px' }}>
        <Flex gap={48} align="baseline">
          <div>
            <span>Job Type: </span>
            <Segmented
              options={['All', 'Full Time', 'Internship']}
              onChange={(value) => {
                setJobType(value);
              }}
              default="All"
            />
          </div>
          <div>
            <span>Job Status: </span>
            <Segmented
              options={['All', 'Active', 'Closed']}
              onChange={(value) => {
                setJobStatus(value);
              }}
              label="Status"
              default="All"
            />
          </div>
        </Flex>
        <Input.Search
          placeholder="Search..."
          allowClear
          onSearch={(value) => {
            setSearchText(value);
          }}
          style={{
            width: '400px',
            alignSelf: 'flex-end',
          }}
        />
      </Flex>
      {filteredApplications && filteredApplications.length > 0 ? (
        <Flex
          vertical
          style={{ padding: '24px', maxHeight: '520px', overflowY: 'scroll' }}
        >
          {filteredApplications.map((application) => {
            return (
              <Collapse
                collapsible="header"
                ghost
                accordion
                items={[
                  {
                    key: '1',
                    label: (
                      <ApplicationCard
                        key={application._id}
                        application={application}
                      />
                    ),
                    children: (
                      <ChatArea application={application} session={session} />
                    ),
                    showArrow: false,
                    style: { padding: '0' },
                  },
                ]}
              />
            );
          })}
        </Flex>
      ) : (
        <Flex
          vertical
          gap={24}
          justify="center"
          style={{ maxHeight: '100%', height: '300px', padding: '24px' }}
        >
          <Typography align="center" variant="button">
            No applications found!
          </Typography>
        </Flex>
      )}
    </Flex>
  );
};
export { ApplicationsPage };
