export default function withLayout(Page, Layout) {
  return (props) => (
    <Layout>
      <Page {...props} />
    </Layout>
  );
}
