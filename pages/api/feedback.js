import { connectToDatabase } from '../../util/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { message } = req.body;

  const client = await connectToDatabase();

  const feedbackCollection = client.db().collection('feedbacks');

  const result = await feedbackCollection.insertOne({
    message,
    timestamp: new Date().toISOString(),
  });

  res
    .status(201)
    .json({ message: 'Feedback sent successfully!', data: result });
  client.close();
}

export default handler;
