import { Typography } from '@mui/material';
import { Flex, Input, Segmented } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { JobCard } from '../Card/JobCard';

const StudentJobPage = (props) => {
  const jobs = props.jobs || [];
  const userApplications = props.userApplications || [];
  const userSavedJobs = props.userInfo?.savedJobs || [];

  const [jobType, setJobType] = useState('All');
  const [jobStatus, setJobStatus] = useState('All');
  const [searchText, setSearchText] = useState('');

  const matchesJobStatus = useCallback(
    (job) => {
      switch (jobStatus) {
        case 'Applied':
          return userApplications.some((app) => app.jobId == job._id);
        case 'Saved':
          return userSavedJobs.includes(job._id);
        default:
          return true;
      }
    },
    [jobStatus, userApplications, userSavedJobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (searchText) {
        const search = searchText.toLowerCase();
        if (
          !job.title.toLowerCase().includes(search) &&
          !job.company.toLowerCase().includes(search) &&
          !job.location.toLowerCase().includes(search) &&
          !job.description.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      if (!matchesJobStatus(job)) {
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
    });
  }, [jobs, jobType, jobStatus, searchText]);

  return (
    <Flex vertical gap={28}>
      <Flex
        gap={48}
        justify="space-between"
        style={{ paddingLeft: '10px', paddingRight: '48px' }}
      >
        <Flex gap={48} align="baseline">
          <div>
            <span>Type: </span>
            <Segmented
              options={['All', 'Full Time', 'Internship']}
              onChange={(value) => {
                setJobType(value);
              }}
              default="All"
            />
          </div>
          <div>
            <span>Status: </span>
            <Segmented
              options={['All', 'Applied', 'Saved']}
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
      {filteredJobs.length === 0 ? (
        <Flex
          align="center"
          vertical
          justify="center"
          style={{ height: '200px' }}
        >
          <Typography variant="button">No Jobs Found!</Typography>
        </Flex>
      ) : (
        <div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
          <Flex wrap="wrap" gap={16} style={{ height: '100%' }}>
            {filteredJobs.map((job) => (
              <JobCard
                job={job}
                jobStatus={
                  userApplications.some((app) => app.jobId == job._id)
                    ? 'Applied'
                    : 'Not Applied'
                }
                userInfo={props.userInfo}
                session={props.session}
              />
            ))}
          </Flex>
        </div>
      )}
    </Flex>
  );
};

export { StudentJobPage };
