export const getAllApplications = async () => {
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
  const response = await fetch(`${baseUrl}/api/applications`);

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
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
  const response = await fetch(`${baseUrl}/api/applications/send-message`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      responseBody.message,
      'Something went wrong, failed sending message!'
    );
  }

  return responseBody || {};
};
