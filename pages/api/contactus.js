import { connectToDatabase } from '../../util/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { name, email, mobile, message } = req.body;

  const client = await connectToDatabase();

  const contactUsCollection = client.db().collection('contactus');

  const result = await contactUsCollection.insertOne({
    name,
    email,
    mobile,
    message,
    timestamp: new Date().toISOString(),
  });

  res.status(201).json({ message: 'Message sent successfully!', data: result });
  client.close();
}

export default handler;
