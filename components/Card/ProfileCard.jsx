import { Typography } from '@mui/material';
import { Button, Flex } from 'antd';

const ProfileCard = (props) => {
  const { title, description, buttons, height, width } = props;

  return (
    <Flex
      style={{
        width: width,
        height: height,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '28px 16px',
        borderRadius: '6px',
      }}
      vertical
      justify="space-between"
    >
      <Flex vertical gap={16}>
        <Typography variant="h5" align="left" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </Flex>
      <Flex gap={16}>
        {buttons.map((button, index) => {
          return (
            <Button
              size="large"
              type={index === 0 ? 'primary' : 'default'}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

export { ProfileCard };
