import { GridCard } from '@/components/GridCard';
import { DefaultUnprotectedLayout } from '@/components/Layout/Layout';
import { Loading } from '@/components/Loading';
import withLayout from '@/hoc/withLayout';
import { useLoading } from '@/store/loading-context';
import { HomeOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Breadcrumb, Flex } from 'antd';
import { useRouter } from 'next/router';

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
                        await router.push('/students');
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
                { label: 'Overall Brochure', onClick: () => {} },
                { label: 'Brochures Pages', onClick: () => {} },
              ]}
            />
            <GridCard
              title="Portals"
              description="Provides a streamlined interface to connect with talented students, post job opportunities, and efficiently manage the placement and internship process."
              buttons={[
                { label: 'Placement', onClick: () => {} },
                { label: 'Internship', onClick: () => {} },
              ]}
            />
            <GridCard
              title="Placement Reports"
              description="Comprehensive documents encompassing placement season summaries, departmental breakdowns, profile-specific analyses, and additional valuable information."
              buttons={[
                { label: '2022-23', onClick: () => {} },
                { label: 'All Reports', onClick: () => {} },
              ]}
            />
            <GridCard
              title="Policies and Documents"
              description="Policies for the placement and intern recruitment season, Job Application Form (JAF) and more."
              buttons={[
                { label: 'Placement Policies', onClick: () => {} },
                { label: 'Forms Page', onClick: () => {} },
              ]}
            />
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default withLayout(RecruiterPublicPage, DefaultUnprotectedLayout);
