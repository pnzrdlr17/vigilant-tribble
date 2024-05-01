import { Button } from 'antd';

function HeroButton(props) {
  const { label, fontColor, bgColor, onClick } = props;
  return (
    <Button
      size="large"
      style={{
        backgroundColor: bgColor,
        borderColor: bgColor,
        color: fontColor,
        borderRadius: '24px',
        padding: '0 18px 9px 18px',
        fontSize: '1.5rem',
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export { HeroButton };
