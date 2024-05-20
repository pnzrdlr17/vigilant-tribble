import withLayout from '../../hoc/withLayout';
import { StudentLayout } from '../Layout/StudentLayout';
import { ProfilePage } from './ProfilePage';

const ProfileView = (props) => {
  return <ProfilePage {...props} />;
};

export default withLayout(ProfileView, StudentLayout);
