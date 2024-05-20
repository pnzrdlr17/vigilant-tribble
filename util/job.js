export const getJobTypeDisplayText = (jobType) => {
  switch (jobType) {
    case 'full-time':
      return 'Full Time';
    case 'internship':
      return 'Internship';
    case 'part-time':
      return 'Part Time';
    case 'contract':
      return 'Contract';
    case 'freelance':
      return 'Freelance';
    default:
      return '';
  }
};

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
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
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

export const applyJob = async (data) => {
  // const { jobId, studentEmail, studentId, studentName } = data;
  console.log('Applying job', data);
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

  const response = await fetch(`${baseUrl}/api/job/apply-job`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(data.message, 'Something went wrong, failed applying job!');
  }

  return responseBody || {};
};

export const getJobById = async (jobId) => {
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
  const response = await fetch(`${baseUrl}/api/job/${jobId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, 'Something went wrong, failed fetching job!');
  }

  return data;
};

export const toggleSaveJob = async (data) => {
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

  const response = await fetch(`${baseUrl}/api/job/save-job`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(data.message, 'Something went wrong, failed saving job!');
  }

  return responseBody?.data || {};
};
