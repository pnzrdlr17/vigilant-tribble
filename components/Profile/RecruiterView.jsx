import withLayout from '../../hoc/withLayout';
import { RecruiterLayout } from '../Layout/RecruiterLayout';
import { ProfilePage } from './ProfilePage';

const ProfileView = (props) => {
  return <ProfilePage {...props} />;
};

export default withLayout(ProfileView, RecruiterLayout);
