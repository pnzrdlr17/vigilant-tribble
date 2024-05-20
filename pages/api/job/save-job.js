import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const { jobId, studentId } = req.body;

  if (!jobId || !studentId) {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }
  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');
  const mongoStudentId = new ObjectId(studentId);
  const user = await usersCollection.findOne({ _id: mongoStudentId });
  if (!user) {
    res.status(402).json({ message: 'Not allowed' });
    client.close();
    return;
  }

  if (user.savedJobs.includes(jobId)) {
    console.log('Removing job from saved');
    const result = await usersCollection.updateOne(
      { _id: mongoStudentId },
      { $pull: { savedJobs: jobId } }
    );

    const updatedUser = await usersCollection.findOne({ _id: user._id });

    res
      .status(201)
      .json({
        message: 'Job removed from saved successfully!',
        data: updatedUser,
      });
    client.close();
    return;
  }

  console.log('Adding job to saved');

  const result = await usersCollection.updateOne(
    { _id: mongoStudentId },
    { $push: { savedJobs: jobId } }
  );

  const updatedUser = await usersCollection.findOne({ _id: user._id });

  res
    .status(201)
    .json({ message: 'Job saved successfully!', data: updatedUser });
  client.close();
}

export default handler;
