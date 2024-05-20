export const getUserData = async (userEmail) => {
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

  const response = await fetch(`${baseUrl}/api/user/${userEmail}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message,
      'Something went wrong, failed fetching user data!'
    );
  }

  return data || {};
};

export const getUserDataById = async (userId) => {
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

  const response = await fetch(`${baseUrl}/api/user/id/${userId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message,
      'Something went wrong, failed fetching user data!'
    );
  }

  return data || {};
};
