import { HomeOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Breadcrumb, Flex } from 'antd';
import { useRouter } from 'next/router';
import { GridCard } from '../../components/GridCard';
import { DefaultUnprotectedLayout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading';
import withLayout from '../../hoc/withLayout';
import { useLoading } from '../../store/loading-context';

const StudentPublicPage = () => {
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
            title: 'For Students',
            menu: {
              items: [
                {
                  title: (
                    <span
                      onClick={async () => {
                        setLoading(true);
                        await router.push('/recruiter');
                        setLoading(false);
                      }}
                    >
                      For Recruiters
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
            For Students
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
              title="Policies, Forms & Docs"
              description="Policies for the placement and intern recruitment season,
            internship NOC form, collaborative research declaration form
            and more"
              buttons={[
                { label: 'Eligibility', onClick: () => {} },
                { label: 'Policies', onClick: () => {} },
              ]}
            />
            <GridCard
              title="Portals"
              description="The internship and placement portals for students offer comprehensive platforms to discover, apply, and secure placements and internships"
              buttons={[
                { label: 'Placement', onClick: () => {} },
                { label: 'Internship', onClick: () => {} },
              ]}
            />
            <GridCard
              title="Resume Building"
              description="Convenient and user-friendly platforms like Overleaf, Figma and Nitish.io for creating resumes adhering to the IITG CV format."
              buttons={[
                {
                  label: 'LaTeX',
                  onClick: () => {
                    router.push('/student/resume-builder');
                  },
                },
                {
                  label: 'Figma',
                  onClick: () => {
                    router.push('/student/resume-builder');
                  },
                },
                {
                  label: 'Web',
                  onClick: () => {
                    router.push('/student/resume-builder');
                  },
                },
              ]}
            />
            <GridCard
              title="FAQs"
              description="Compilation for students addressing various queries, including resume-related doubts. If none answer your queries, contact the SPCs."
              buttons={[
                { label: 'FAQ Page', onClick: () => {} },
                { label: 'Contact SPCs', onClick: () => {} },
              ]}
            />
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default withLayout(StudentPublicPage, DefaultUnprotectedLayout);
