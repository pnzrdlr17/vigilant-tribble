import { Typography } from '@mui/material';
import { Flex } from 'antd';
import { StudentLayout } from '../../components/Layout/StudentLayout';
import withLayout from '../../hoc/withLayout';

const ResumeBuilder = () => {
  return (
    <Typography
      variant="overline"
      color="textSecondary"
      gutterBottom
      fontSize={36}
    >
      <Flex vertical align="center">
        Resume Builder
        <br />
        <span style={{ fontSize: '22px' }}>Coming Soon ...</span>
      </Flex>
    </Typography>
  );
};

export default withLayout(ResumeBuilder, StudentLayout);
