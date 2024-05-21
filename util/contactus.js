export const logMessage = async (data) => {
  const response = await fetch(`${process.env.BASE_URL}/api/contactus`, {
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

export const logFeedback = async (message) => {
  if (!message) {
    throw new Error('Invalid input');
  }
  const response = await fetch(`${process.env.BASE_URL}/api/feedback`, {
    method: 'POST',
    body: JSON.stringify({
      message,
    }),
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
