import { DefaultUnprotectedLayout } from '@/components/Layout/Layout';
import withLayout from '@/hoc/withLayout';
import React from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What is Lorem Ipsum?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Why do we use it?',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    // Add more FAQs here
  ];

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default withLayout(FAQPage, DefaultUnprotectedLayout);
