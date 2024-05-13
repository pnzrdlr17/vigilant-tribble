export const logMessage = async (data) => {
  const response = await fetch('/api/contactus', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong!');
  }

  return responseData;
};
