import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';

// {/* radio button -- all(cheked), new, saved, applied  ---------- searchbar  */}
//       {/* another checkbox-group for fulltime and internships  */}
//       {/* Display the jobs */}

const StudentJobPage = (props) => {
  const jobs = props.jobs || [];
  return (
    <Flex vertical>
      <Typography
        variant="overline"
        color="textSecondary"
        gutterBottom
        style={{ fontSize: '28px', height: '36px' }}
      >
        Jobs
      </Typography>
      <Divider />

      {jobs.length === 0 ? (
        <Typography variant="subtitle2">No Jobs Found!</Typography>
      ) : (
        <div style={{ overflowY: 'scroll', maxHeight: '560px' }}>
          <Flex vertical align="center" gap={16}>
            {jobs.map((job) => (
              <JobCard job={job} />
            ))}
          </Flex>
        </div>
      )}
    </Flex>
  );
};

export { StudentJobPage };
