import withLayout from '../../hoc/withLayout';
import { RecruiterLayout } from '../Layout/RecruiterLayout';
import { InboxPage } from './InboxPage';

const RecruiterInbox = () => {
  return <InboxPage {...props} />;
};

export default withLayout(RecruiterInbox, RecruiterLayout);
