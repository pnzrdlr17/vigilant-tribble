import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Collapse, Flex } from 'antd';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import withLayout from '../hoc/withLayout';
import { recruiterFaqItems } from '../util/faqs';

const FAQPage = () => {
  return (
    <Flex vertical align="center">
      <div>
        <Typography
          variant="overline"
          color="textSecondary"
          gutterBottom
          style={{ fontSize: '28px', height: '36px' }}
        >
          Frequently Asked Questions
        </Typography>
      </div>
      <Collapse
        accordion
        collapsible="header"
        items={recruiterFaqItems}
        style={{
          width: '75%',
          marginTop: '20px',
          overflowY: 'scroll',
          maxHeight: '480px',
        }}
        expandIconPosition="end"
        expandIcon={(panelProps) =>
          panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        size="large"
      />
    </Flex>
  );
};

export default withLayout(FAQPage, DefaultUnprotectedLayout);
