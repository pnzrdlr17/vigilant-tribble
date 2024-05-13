import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Collapse, Flex } from 'antd';
import { StudentLayout } from '../../components/Layout/StudentLayout';
import withLayout from '../../hoc/withLayout';
import { studentFaqItems } from '../../util/faqs';

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
      <div>
        <Typography
          variant="overline"
          color="textSecondary"
          gutterBottom
          style={{ fontSize: '20px', height: '26px' }}
        >
          For Students
        </Typography>
      </div>
      <Collapse
        accordion
        bordered={false}
        collapsible="header"
        items={studentFaqItems}
        style={{
          width: '75%',
          marginTop: '20px',
          overflowY: 'scroll',
          maxHeight: '466px',
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

export default withLayout(FAQPage, StudentLayout);
