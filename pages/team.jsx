import { Typography } from '@mui/material';
import { Divider, Flex } from 'antd';
import Image from 'next/image';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import withLayout from '../hoc/withLayout';
import { teamMembers } from '../util/team';

const TeamPage = () => {
  const { head, faculty, student } = teamMembers;

  return (
    <Flex vertical align="center">
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Typography
          variant="overline"
          color="textSecondary"
          gutterBottom
          align="left"
          style={{ fontSize: '32px', height: '40px' }}
        >
          Career Connect Team
        </Typography>

        <Flex
          align="center"
          gap={20}
          style={{
            cursor: 'pointer',
            padding: '4px 24px',
            marginRight: '24px',
          }}
          onClick={() => {}}
        >
          <div>
            <Typography variant="h5">{head.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {head.role}
            </Typography>
          </div>
          <Image
            src={head.avatar}
            alt={head.name}
            style={{ borderRadius: '50%' }}
            width={200}
          />
        </Flex>
      </Flex>
      <Divider />
      <Flex
        style={{
          width: '100%',
          height: '400px',
          padding: '6px',
        }}
      >
        <Flex
          gap={24}
          justify="space-around"
          wrap="wrap"
          align="center"
          style={{
            width: '50%',
            overflowY: 'scroll',
          }}
        >
          {faculty.map((member, index) => (
            <Flex
              align="center"
              gap={12}
              style={{
                height: '120px',
                width: '290px',
                cursor: 'pointer',
              }}
              onClick={() => {}}
              key={index}
            >
              <Image
                src={member.avatar}
                alt={member.name}
                style={{ borderRadius: '50%' }}
                width={110}
              />
              <div>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {member.role}
                </Typography>
              </div>
            </Flex>
          ))}
        </Flex>

        <Flex
          gap={24}
          justify="space-around"
          wrap="wrap"
          style={{
            width: '50%',
            overflowY: 'scroll',
          }}
        >
          {student.map((member, index) => (
            <Flex
              align="center"
              gap={16}
              style={{
                height: '110px',
                width: '280px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
              onClick={() => {}}
              key={index}
            >
              <Image
                src={member.avatar}
                alt={member.name}
                style={{ borderRadius: '50%' }}
                width={75}
              />
              <div>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {member.role}
                </Typography>
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withLayout(TeamPage, DefaultUnprotectedLayout);
