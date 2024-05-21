export const getAllApplications = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/applications`);

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message,
      'Something went wrong, failed fetching applications!'
    );
  }

  return responseBody?.data || [];
};

export const sendApplicationChatMessage = async (data) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/applications/send-message`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      responseBody.message,
      'Something went wrong, failed sending message!'
    );
  }

  return responseBody || {};
};
