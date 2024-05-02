import { HeroButton } from '@/components/HeroButton';
import { DefaultUnprotectedLayout } from '@/components/Layout/Layout';
import { Loading } from '@/components/Loading';
import withLayout from '@/hoc/withLayout';
import { useLoading } from '@/store/loading-context';
import Typography from '@mui/material/Typography';
import { Flex } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HeroImg from '../public/images/claudio-testa-iqeG5xA96M4-unsplash.jpg';

const HomePage = () => {
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  if (loading) {
    return <Loading />;
  }

  return (
    <Flex vertical align="center">
      <Typography
        variant="overline"
        color="textSecondary"
        gutterBottom
        fontSize={36}
      >
        Vigilant Tribble
      </Typography>
      <Flex
        vertical
        gap={48}
        style={{
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '16px',
          maxWidth: '913px',
          borderRadius: '6px',
        }}
      >
        <Flex gap={64} justify="center">
          <Flex
            vertical
            justify="space-between"
            style={{ maxWidth: '400px', padding: '8px' }}
          >
            <Typography variant="h5" align="left" color="textPrimary" paragraph>
              Training and Placement Cell
            </Typography>
            <Typography variant="body1">
              Training and Placement Cell (TPC) of the Institute centrally
              handles all aspects of campus placements for the graduating
              students of all Departments. TPC is well equipped with excellent
              infrastructure to support each and every stage of the placement
              processes. TPC staff members assist in arranging Pre-Placement
              Talks, Written Tests, Group Discussions, and Interviews etc. are
              made as per the requirements of the Organizations.
            </Typography>
          </Flex>
          <div style={{ padding: '16px' }}>
            <Image
              src={HeroImg}
              alt="Hero Image"
              width={380}
              style={{ borderRadius: '8px' }}
            />
          </div>
        </Flex>

        <Flex gap={72} justify="center">
          <HeroButton
            label="For Recruiters"
            fontColor="#ffffff"
            bgColor="#1677ff"
            onClick={async () => {
              setLoading(true);
              await router.push('/recruiters');
              setLoading(false);
            }}
          />
          <HeroButton
            label="For Students"
            fontColor="#ffffff"
            bgColor="#002140"
            onClick={async () => {
              setLoading(true);
              router.push('/students');
              setLoading(false);
            }}
          />
          {/* <HeroButton
            label="FAQs"
            fontColor="#ffffff"
            bgColor="#3f51b5"
            onClick={async () => {
              setLoading(true);
              router.push('/faqs');
              setLoading(false);
            }}
          /> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withLayout(HomePage, DefaultUnprotectedLayout);
