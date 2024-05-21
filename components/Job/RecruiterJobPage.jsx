import { Typography } from '@mui/material';
import { Flex } from 'antd';
import { useMemo, useState } from 'react';
import { RecruiterJobCard } from '../Card/RecruiterJobCard';

const RecruiterJobPage = (props) => {
  const jobs = props.jobs || [];
  const userApplications = props.userApplications || [];
  const userSavedJobs = props.userInfo?.savedJobs || [];

  const [jobType, setJobType] = useState('All');
  const [jobStatus, setJobStatus] = useState('All');
  const [searchText, setSearchText] = useState('');

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

      switch (jobType) {
        case 'Full Time':
          return job.jobType === 'full-time';
        case 'Internship':
          return job.jobType === 'internship';
        default:
          return true;
      }
    });
  }, [jobs, jobType, searchText]);

  return (
    <Flex vertical gap={28}>
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
              <RecruiterJobCard
                job={job}
                jobStatus={
                  userApplications.some((app) => app.jobId == job._id)
                    ? 'Applied'
                    : 'Not Applied'
                }
                session={props.session}
              />
            ))}
          </Flex>
        </div>
      )}
    </Flex>
  );
};

export { RecruiterJobPage };
