import withLayout from '../../hoc/withLayout';
import { StudentLayout } from '../Layout/StudentLayout';
import { InboxPage } from './InboxPage';

const StudentInbox = (props) => {
  return <InboxPage {...props} />;
};

export default withLayout(StudentInbox, StudentLayout);
