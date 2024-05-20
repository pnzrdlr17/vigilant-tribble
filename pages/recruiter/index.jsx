import { HomeOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Breadcrumb, Flex } from 'antd';
import { useRouter } from 'next/router';
import { GridCard } from '../../components/Card/GridCard';
import { DefaultUnprotectedLayout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading';
import withLayout from '../../hoc/withLayout';
import { useLoading } from '../../store/loading-context';

const RecruiterPublicPage = () => {
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  if (loading) {
    return <Loading />;
  }

  return (
    <Flex vertical>
      <Breadcrumb
        items={[
          {
            title: (
              <HomeOutlined
                onClick={async () => {
                  setLoading(true);
                  await router.push('/');
                  setLoading(false);
                }}
              />
            ),
          },
          {
            title: 'For Recruiters',
            menu: {
              items: [
                {
                  title: (
                    <span
                      onClick={async () => {
                        setLoading(true);
                        await router.push('/student');
                        setLoading(false);
                      }}
                    >
                      For Students
                    </span>
                  ),
                },
              ],
            },
          },
        ]}
        separator=">"
      />
      <Flex vertical align="center">
        <div>
          <Typography
            variant="overline"
            align="center"
            color="textSecondary"
            gutterBottom
            fontSize={24}
            height={28}
          >
            For Recruiters
          </Typography>
        </div>

        <div style={{ overflowY: 'scroll', maxHeight: '560px' }}>
          <Flex
            gap={24}
            justify="space-around"
            wrap="wrap"
            style={{ maxWidth: '840px', padding: '8px' }}
          >
            <GridCard
              title="Placement Brochures"
              description="Overall brochure containing the steps for registration in placement season, department-wise brochures, profile-wise brochures and more."
              buttons={[
                {
                  label: 'Brochure',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/docs');
                    setLoading(false);
                  },
                },
              ]}
            />
            <GridCard
              title="Portals"
              description="Provides a streamlined interface to connect with talented students, post job opportunities, and efficiently manage the placement and internship process."
              buttons={[
                {
                  label: 'Placement',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/dashboard');
                    setLoading(false);
                  },
                },
                {
                  label: 'Internship',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/dashboard');
                    setLoading(false);
                  },
                },
              ]}
            />
            <GridCard
              title="Placement Reports"
              description="Comprehensive documents encompassing placement season summaries, departmental breakdowns, profile-specific analyses, and additional valuable information."
              buttons={[
                {
                  label: '2022-23',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/docs');
                    setLoading(false);
                  },
                },
                {
                  label: 'All Reports',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/docs');
                    setLoading(false);
                  },
                },
              ]}
            />
            <GridCard
              title="Policies and Documents"
              description="Policies for the placement and intern recruitment season, Job Application Form (JAF) and more."
              buttons={[
                {
                  label: 'Placement Policies',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/docs');
                    setLoading(false);
                  },
                },
                {
                  label: 'Forms Page',
                  onClick: async () => {
                    setLoading(true);
                    await router.push('/docs');
                    setLoading(false);
                  },
                },
              ]}
            />
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default withLayout(RecruiterPublicPage, DefaultUnprotectedLayout);
