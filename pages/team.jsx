import { DefaultUnprotectedLayout } from '@/components/Layout/Layout';
import withLayout from '@/hoc/withLayout';
import React from 'react';

const TeamPage = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Head of Placement Cell' },
    { name: 'Jane Smith', role: 'Placement Coordinator' },
    { name: 'Mike Johnson', role: 'Placement Officer' },
    // Add more team members here
  ];

  return (
    <div>
      <h1>Placement Cell Team</h1>
      <ul>
        {teamMembers.map((member, index) => (
          <li key={index}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withLayout(TeamPage, DefaultUnprotectedLayout);
