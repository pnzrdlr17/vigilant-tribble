export const getUserData = async (userEmail) => {
  const response = await fetch(`${process.env.BASE_URL}/api/user/${userEmail}`);
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
  const response = await fetch(`${process.env.BASE_URL}/api/user/id/${userId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message,
      'Something went wrong, failed fetching user data!'
    );
  }

  return data || {};
};
