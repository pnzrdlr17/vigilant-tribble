import { useEffect, useState } from 'react';
import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import withLayout from '../hoc/withLayout';

const Announcements = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch the latest public notifications from the training and placement cell API
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    //content available on /page for reference
    <div>
      <h1>Latest Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default withLayout(Announcements, DefaultUnprotectedLayout);
