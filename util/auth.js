import { compare, hash } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export const createUser = async (user) => {
  const response = await fetch(`${process.env.BASE_URL}/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message,
      'Something went wrong, failed creating account!'
    );
  }

  return data;
};
