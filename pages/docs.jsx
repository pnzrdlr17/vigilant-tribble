import { DefaultUnprotectedLayout } from '../components/Layout/Layout';
import withLayout from '../hoc/withLayout';

const DocsPage = () => {
  // Fetch documents and policies data from an API or define it here
  const documents = [
    {
      id: 1,
      title: 'Document 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Document 2',
      content:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Add more documents as needed
  ];

  return (
    <div>
      <h1>Documents and Policies</h1>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <h2>{document.title}</h2>
            <p>{document.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withLayout(DocsPage, DefaultUnprotectedLayout);
