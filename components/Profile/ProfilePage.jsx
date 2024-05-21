import { Button, Divider, Flex, Typography } from 'antd';
import { signOut } from 'next-auth/react';
import { useLoading } from '../../store/loading-context';

const { Title, Text, Paragraph } = Typography;

const ProfilePage = (props) => {
  const { userInfo, session } = props;
  const hasEditPermission = session?.user?.email === userInfo?.email || false;
  const isStudent = session?.user?.role === 'student';
  const { name, email, about, phone, course, graduatingYear, cgpa, skills } =
    userInfo;
  const { setLoading } = useLoading();

  return (
    <Flex vertical>
      <Flex
        gap={8}
        align="center"
        justify="space-between"
        style={{
          width: '100%',
          padding: '0 16px 16px 16px',
        }}
      >
        <Flex vertical>
          <Title level={1} style={{ margin: 0, fontSize: 24 }}>
            {name}
          </Title>
          <Text style={{ fontSize: 16, color: 'gray' }} copyable>
            Email: {email}
          </Text>
          {phone && (
            <Text
              style={{ fontSize: 16, color: 'gray' }}
              copyable
              editable={hasEditPermission}
            >
              Phone: {phone}
            </Text>
          )}
          {isStudent && (
            <Text
              style={{ fontSize: 16, color: 'gray' }}
              copyable
              editable={hasEditPermission}
            >
              Resume: https://example.com/resume.pdf
            </Text>
          )}
        </Flex>

        <div>
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`}
            width={80}
            alt={name[0]?.toUpperCase() || ''}
          />
        </div>
      </Flex>
      <Divider style={{ marginTop: '10px' }} />

      <Flex justify="space-between">
        <Flex
          vertical
          style={{
            width: '70%',
            padding: '0 16px',
            maxHeight: '460px',
            overflowY: 'scroll',
            border: '1px solid #f0f0f0',
          }}
        >
          {about && (
            <>
              <Title level={5}>About</Title>
              <Paragraph editable={hasEditPermission}>{about}</Paragraph>
              <Divider />
            </>
          )}

          {(course || graduatingYear || cgpa) && (
            <>
              <Title level={5}>Education</Title>
              {course && (
                <Text editable={hasEditPermission}>Course: {course}</Text>
              )}
              {graduatingYear && (
                <Text editable={hasEditPermission}>
                  Graduating Year: {graduatingYear}
                </Text>
              )}
              {cgpa && <Text editable={hasEditPermission}>CGPA: {cgpa}</Text>}
              <Divider />
            </>
          )}

          {isStudent && (
            <>
              <Title level={5}>Experience</Title>
              <Text editable={hasEditPermission}>Intern at XYZ Company</Text>
              <Text editable={hasEditPermission}>
                Software Developer at ABC Company
              </Text>
              <Divider />
            </>
          )}

          {isStudent && (
            <>
              <Title level={5}>Projects</Title>
              <Text editable={hasEditPermission}>Project 1</Text>
              <Text editable={hasEditPermission}>Project 2</Text>
              <Divider />
            </>
          )}

          {skills && (
            <>
              <Title level={5}>Skills</Title>
              <Text editable={hasEditPermission}>{skills}</Text>
              <Divider />
            </>
          )}

          {!isStudent && (
            <>
              <Title level={5}>Company</Title>
              <Text editable={hasEditPermission}>
                Company Name: XYZ Company
              </Text>
              <Text editable={hasEditPermission}>
                Company Address: Pune, Maharashtra, India
              </Text>
              <Divider />
            </>
          )}
        </Flex>

        {hasEditPermission && (
          <Flex
            vertical
            justify="flex-start"
            style={{
              maxWidth: '25%',
              padding: '0 12px 16px 16px',
            }}
            gap={16}
          >
            <Button type="primary" style={{ margin: '0 8px', width: '160px' }}>
              Change Password
            </Button>
            <Button
              style={{ margin: '0 8px', width: '160px' }}
              onClick={async () => {
                setLoading(true);
                await signOut();
                setLoading(false);
              }}
            >
              Logout
            </Button>
            <Button
              type="primary"
              style={{ margin: '0 8px', width: '160px' }}
              danger
              disabled
            >
              Delete Account
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export { ProfilePage };
