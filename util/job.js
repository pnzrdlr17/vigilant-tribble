export const createJob = async (job) => {
  const response = await fetch('/api/job/new-job', {
    method: 'POST',
    body: JSON.stringify(job),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, 'Something went wrong, failed creating job!');
  }

  return data;
};

export const getAllJobs = async () => {
  // return [
  //   {
  //     id: '1',
  //     title: 'Software Developer',
  //     company: 'Google',
  //     description: 'Software Developer at Google',
  //     location: 'Mountain View, CA',
  //     requirements: 'React, Node.js, MongoDB',
  //     domain: 'Software Development',
  //     jobOwner: '',
  //     applications: [],
  //     status: 'active',
  //     timestamp: new Date().toISOString(),
  //   },
  // ];

  console.log('Fetching all jobs');
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/job/all-jobs`);

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message,
      'Something went wrong, failed fetching jobs!'
    );
  }

  if (responseBody && responseBody.data) {
    return responseBody.data;
  }

  return [];
};
