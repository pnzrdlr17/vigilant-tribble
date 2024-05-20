import { Button, Flex, Form, Input, Select } from 'antd';
import { useSnackbar } from 'notistack';
import { useLoading } from '../../store/loading-context';
import { createJob } from '../../util/job';
import { notificationToAllStudents } from '../../util/notifications';

const { Option } = Select;

const NewJobForm = (props) => {
  const [form] = Form.useForm();
  const { setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const session = props.session;
      setLoading(true);

      const newJob = await createJob({
        session,
        ...values,
      });

      enqueueSnackbar('Job Created Successfully', {
        variant: 'success',
      });

      console.log('Job created', newJob.data.insertedId);
      await notificationToAllStudents({
        type: 'new-job',
        title: `New Job: ${values.title}`,
        text: `A new job has been posted by ${values.company} in ${values.location}. Apply now!`,
        link: `/job/${newJob.data.insertedId}`,
        isSystemGenerated: true,
        session,
      });
      enqueueSnackbar('Notification sent to all students', { variant: 'info' });
    } catch (error) {
      console.error('Error creating job!', error);
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} form={form} layout="vertical">
      <Flex vertical align="center" gap={24} style={{ paddingTop: '24px' }}>
        <Flex justify="space-around" gap={48}>
          <Flex vertical style={{ width: '360px' }}>
            <Form.Item
              label="Job Title"
              name="title"
              rules={[
                { required: true, message: 'Please enter the job title' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: 'Please select a job type' }]}
            >
              <Select>
                <Option value="full-time">Full Time</Option>
                <Option value="internship">Internship</Option>
                <Option value="part-time">Part Time</Option>
                <Option value="contract">Contract</Option>
                <Option value="freelance">Freelance</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Domain" name="domain">
              <Input />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: 'Please enter the job location' },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Flex vertical style={{ width: '360px' }}>
            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: 'Please enter the company name' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please enter the job description',
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Requirements"
              name="requirements"
              rules={[
                {
                  required: true,
                  message: 'Please enter the job requirements',
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Flex>
        </Flex>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: '240px', height: '48px' }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export { NewJobForm };
