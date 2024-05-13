const BodyWrapper = ({ children }) => {
  return <div style={{ color: 'grey', fontSize: '15px' }}>{children}</div>;
};

export const recruiterFaqItems = [
  {
    key: '1',
    label:
      'What are the different ways a company can hire students from the campus?',
    children: (
      <BodyWrapper>
        The different ways of recruiting students are:
        <br />
        - Campus Recruitment Program in which final year students participate.
        <br />
        - Summer Internship Program for pre final year students which can be
        converted into a pre placement offer.
        <br />
      </BodyWrapper>
    ),
  },
  {
    key: '2',
    label:
      'How can a company register itself for the Campus Recruitment Program?',
    children: (
      <BodyWrapper>
        To participate in the Campus Recruitment Program, a company must first
        contact Career Connect or register on the portal. The company is then
        sent the login details which would let them login enabling them to post
        job opportunities & see the profiles of students interested in their job
        opening.
      </BodyWrapper>
    ),
  },
  {
    key: '3',
    label: 'When does the Recruitment Process start?',
    children: (
      <BodyWrapper>
        The recruitment season is held in December every year and the PPT's can
        be held anytime between mid-September to mid-November.
      </BodyWrapper>
    ),
  },
  {
    key: '4',
    label: 'What is the process of the Campus Recruitment Program?',
    children: (
      <BodyWrapper>
        The process of the Campus Recruitment Program is as follows:
        <br />
        - The company visits the campus and gives a Pre Placement Talk (PPT) to
        the students.
        <br />
        - The company then conducts a written test, group discussion and
        personal interview.
        <br />- The company then announces the results and selects the students.
      </BodyWrapper>
    ),
  },
  {
    key: '5',
    label: 'What is the process of the Summer Internship Program?',
    children: (
      <BodyWrapper>
        The process of the Summer Internship Program is as follows:
        <br />
        - The company visits the campus and gives a Pre Placement Talk (PPT) to
        the students.
        <br />
        - The company then conducts a written test, group discussion and
        personal interview.
        <br />- The company then announces the results and selects the students.
      </BodyWrapper>
    ),
  },
  {
    key: '6',
    label: 'On what basis are the slots allotted to the companies?',
    children: (
      <BodyWrapper>
        Slotting is done subject to the following parameters:
        <br />
        - Student Preferences
        <br />
        - Work profile
        <br />
        - Compensation package
        <br />
        - Career Prospects
        <br />
        - Student Intake
        <br />
        - Past relationship with the institute
        <br />
      </BodyWrapper>
    ),
  },
  {
    key: '7',
    label: 'Where will the company officials be accommodated?',
    children: (
      <BodyWrapper>
        Subject to availability of rooms in the institute guest house,
        accommodation could be arranged at a nominal rate for delegates from a
        company if they do intimate their requirements to us well in advance.
      </BodyWrapper>
    ),
  },
  {
    key: '8',
    label:
      'Can a company interview the students already placed in other company?',
    children: (
      <BodyWrapper>
        No, once a job is registered against the student, he/she is not entitled
        to sit for any other company.
      </BodyWrapper>
    ),
  },
  {
    key: '9',
    label:
      'Are there multiple companies recruiting in the same slot? How is the case of multiple offers resolved?',
    children: (
      <BodyWrapper>
        Yes, there are multiple companies recruiting in the same slot. The
        results of all the companies are announced at the end of the slot and if
        a student gets multiple offers then he is allowed to choose between one
        of them and inform the office of his decision before the beginning of
        the next slot.
      </BodyWrapper>
    ),
  },
];

export const studentFaqItems = [
  {
    key: '1',
    label: 'How can I apply for a job?',
    children: (
      <BodyWrapper>
        To apply for a job, you need to first register on the portal. Once you
        have registered, you can view the job openings and apply to the ones
        that interest you.
      </BodyWrapper>
    ),
  },
  {
    key: '2',
    label: 'What is the process of applying for a job?',
    children: (
      <BodyWrapper>
        The process of applying for a job is as follows:
        <br />
        - Register on the portal
        <br />
        - View the job openings
        <br />- Apply to the job that interests you
      </BodyWrapper>
    ),
  },
  {
    key: '3',
    label: 'How can I update my profile information?',
    children: (
      <BodyWrapper>
        To update your profile information, log in to the portal and navigate to
        your profile page. From there, you can edit your personal details,
        educational qualifications, and any other relevant information.
      </BodyWrapper>
    ),
  },
  {
    key: '4',
    label: 'How can I track the status of my job applications?',
    children: (
      <BodyWrapper>
        You can track the status of your job applications by logging in to the
        portal and visiting the "My Applications" section. There, you will find
        a list of all the jobs you have applied for along with their current
        status.
      </BodyWrapper>
    ),
  },
  {
    key: '5',
    label: 'What should I do if I forgot my password?',
    children: (
      <BodyWrapper>
        If you forgot your password, you can click on the "Forgot Password" link
        on the login page. Follow the instructions provided to reset your
        password and regain access to your account.
      </BodyWrapper>
    ),
  },
  {
    key: '6',
    label: 'Can I apply for multiple jobs at the same time?',
    children: (
      <BodyWrapper>
        Yes, you can apply for multiple jobs at the same time. However, make
        sure to carefully review the job requirements and only apply to the
        positions that align with your skills and interests.
      </BodyWrapper>
    ),
  },
  {
    key: '7',
    label: 'How can I improve my chances of getting selected for a job?',
    children: (
      <BodyWrapper>
        To improve your chances of getting selected for a job, you can:
        <br />
        - Tailor your resume and cover letter to highlight relevant skills and
        experiences.
        <br />
        - Prepare for interviews by researching the company and practicing
        common interview questions.
        <br />
        - Network with professionals in your desired field to gain insights and
        potential referrals.
        <br />- Continuously update your skills and knowledge through relevant
        courses and certifications.
      </BodyWrapper>
    ),
  },
];
