import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import withLayout from '../hoc/withLayout';

const DocsPage = () => {
  // Fetch documents and policies data from an API or define it here

  return (
    <Flex vertical align="center" gap={16}>
      <Typography
        variant="overline"
        color="textSecondary"
        gutterBottom
        style={{ height: '48px', fontSize: '30px' }}
      >
        Documents & Policies
      </Typography>
      <Divider style={{ margin: '10px 0' }} />

      <Typography
        variant="caption"
        color="textSecondary"
        gutterBottom
        fontSize={18}
      >
        Documents will be availabe soon...
      </Typography>
    </Flex>
  );
};

export default withLayout(DocsPage, DefaultUnprotectedLayout);
