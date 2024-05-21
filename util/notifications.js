export const notificationToAllStudents = async (notification) => {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';

    const response = await fetch(`${baseUrl}/api/notifications/all-students`, {
      method: 'POST',
      body: JSON.stringify(notification),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message,
        'Something went wrong, failed sending notification!'
      );
    }

    return data || {};
  } catch (error) {
    console.error('Error sending notifications to all students', error);
    return {};
  }
};

export const notificationToUser = async (notification, receiverEmail) => {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';

    const response = await fetch(
      `${baseUrl}/api/notifications/${receiverEmail}`,
      {
        method: 'POST',
        body: JSON.stringify(notification),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message,
        'Something went wrong, failed sending notification!'
      );
    }

    return data || {};
  } catch (error) {
    console.error('Error sending notifications to user', error);
    return {};
  }
};
