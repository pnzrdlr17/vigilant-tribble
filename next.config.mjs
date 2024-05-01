/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@antd-design/icons',
    '@ant-design/icons-react',
    '@ant-design/icons-svg',
    '@ant-design/cssinjs',
    '@ant-design/icons',
    'antd',
    'rc-field-form',
    'rc-util',
    'rc-util/lib',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
  ],
  reactStrictMode: true,
};

export default nextConfig;
